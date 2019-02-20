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

runtime?=node
top_dir?=../..
base_url?=http://localhost:8888
webthing_url?=https://github.com/rzr/webthing-iotjs
run_args?=


help:
	@echo "# Usage:"
	@echo "# make runtime=${runtime} run"

node_modules: package.json
	npm install

node/run: node_modules
	npm start

run: ${runtime}/run
	@echo "# $@: $^"
test:
	curl ${base_url}
	@echo
	curl ${base_url}/properties

iotjs_modules/webthing:
	git clone --recursive --depth 1 ${webthing_url} $@

iotjs/run: index.js iotjs_modules/webthing
	IOTJS_EXTRA_MODULES_PATH=../..  iotjs $< ${run_args}
