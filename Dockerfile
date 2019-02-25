#!/bin/echo docker build . -f
# -*- coding: utf-8 -*-
# SPDX-License-Identifier: Apache-2.0
# Copyright: 2019-present Samsung Electronics France SAS, and other contributors

FROM debian:9
MAINTAINER Philippe Coval (p.coval@samsung.com)

ENV DEBIAN_FRONTEND noninteractive
ENV LC_ALL en_US.UTF-8
ENV LANG ${LC_ALL}

RUN echo "#log: Configuring locales" \
  && set -x \
  && apt-get update -y \
  && apt-get install -y locales \
  && echo "${LC_ALL} UTF-8" | tee /etc/locale.gen \
  && locale-gen ${LC_ALL} \
  && dpkg-reconfigure locales \
  && sync

RUN echo "#log: Setup system" \
  && set -x \
  && apt-get update -y \
  && apt-get install -y \
  apt-transport-https \
  curl \
  make \
  sudo \
  && apt-get clean \
  && sync

RUN echo "#log: Install iotjs" \
  && set -x \
  && sudo apt-get update -y \
  && apt-cache show iotjs || echo "TODO: iotjs is in debian:testing !"\
  && dpkg-architecture || :\
  && . /etc/os-release \
  && distro="${ID}_${VERSION_ID}" \
  && [ "debian" != "${ID}" ] || distro="${distro}.0" \
  && distro=$(echo "${distro}" | sed 's/.*/\u&/') \
  && [ "ubuntu" != "${ID}" ] || distro="x${distro}" \
  && url="http://download.opensuse.org/repositories/home:/rzrfreefr:/snapshot/$distro" \
  && file="/etc/apt/sources.list.d/org_opensuse_home_rzrfreefr_snapshot.list" \
  && echo "deb [allow-insecure=yes] $url /" | sudo tee "$file" \
  && sudo apt-get update -y \
  && apt-cache search --full iotjs \
  && version=$(apt-cache show "iotjs-snapshot" \
| grep 'Version:' | cut -d' ' -f2 | sort -n | head -n1 || echo 0) \
  && sudo apt-get install -y --allow-unauthenticated \
iotjs-snapshot="$version" iotjs="$version" \
  && which iotjs \
  && iotjs -h || echo "log: iotjs's usage expected to be printed before" \
  && sync

ENV project color-sensor-js
ADD . /usr/local/${project}/${project}
WORKDIR /usr/local/${project}/${project}
RUN echo "#log: ${project}: Preparing sources" \
  && make \
  && make test \
  && sync

EXPOSE 8888
WORKDIR /usr/local/${project}/${project}
ENTRYPOINT [ "/usr/bin/env", "make" ]
CMD [ "start" ]
