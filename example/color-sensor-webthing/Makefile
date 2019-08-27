#_!/bin/make -f
# -*- makefile -*-
# SPDX-License-Identifier: Apache-2.0
#{
# Copyright 2018-present Samsung Electronics France
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#}

default: help
	@echo "log: $@: $^"

runtime?=iotjs
top_dir?=../..
port?=8888
base_url?=http://localhost:${port}

run_args?=

iotjs_modules_dir?=${CURDIR}/iotjs_modules

webthing-iotjs_url?=https://github.com/rzr/webthing-iotjs
webthing-iotjs_revision?=webthing-iotjs-0.12.1-1
webthing-iotjs_dir?=${iotjs_modules_dir}/webthing-iotjs
iotjs_modules_dirs+=${webthing-iotjs_dir}


help:
	@echo "# Usage:"
	@echo "# make runtime=${runtime} start"

node_modules: package.json
	npm install

node/modules: node_modules
	ls $<

modules: ${runtime}/modules
	@echo "# $@: $^"
node/start: node_modules
	npm start

start: ${runtime}/start
	@echo "# $@: $^"

run: start
	@echo "# $@: $^"

test:
	curl ${base_url}
	@echo
	curl ${base_url}/properties

${webthing-iotjs_dir}: Makefile
	git clone --recursive --depth 1 ${webthing-iotjs_url} -b ${webthing-iotjs_revision} $@
	make -C $@ deploy deploy_modules_dir=${iotjs_modules_dir}

iotjs/start: index.js ${iotjs_modules_dirs}
	iotjs $< ${run_args}

iotjs/devel : index.js ${iotjs_modules_dirs}
	IOTJS_EXTRA_MODULES_PATH=${topdir} \
	iotjs $< ${run_args}

iotjs/modules: ${iotjs_modules_dirs}
	ls $<

json_file?=index.html
extra/json: Makefile
	mkdir -p $@/properties/color
	curl ${base_url}/properties/color  | jq -M .  > $@/properties/color/${json_file}
	curl ${base_url}/properties  | jq -M .  > $@/properties/${json_file}
	curl ${base_url}/  | jq -M .  > $@/${json_file}
