#!/bin/make -f
# -*- makefile -*-
# SPDX-License-Identifier: Apache-2.0
#{
# Copyright 2019-present Samsung Electronics France SAS, and other contributors
#}

default: all

tmp_dir ?= tmp
runtime ?= iotjs
export runtime
eslint ?= node_modules/eslint/bin/eslint.js
srcs_dir ?= lib example
srcs ?= $(wildcard *.js lib/*.js | sort | uniq)

controller ?= simulator
test_src ?= lib/${controller}.js
main_src ?= example/index.js
NODE_PATH := .:${NODE_PATH}
export NODE_PATH


help:
	@echo "## Usage: "
	@echo "# make retranspile"

all: build

setup/%:
	${@F}

node_modules: package.json
	npm install

package-lock.json: package.json
	rm -fv "$@"
	npm install
	ls "$@"

setup/node: node_modules
	@echo "NODE_PATH=$${NODE_PATH}"
	node --version
	npm --version

setup: setup/${runtime}

build/%: setup
	@echo "log: $@: $^"

build/node: setup node_modules eslint

build: build/${runtime}

run/%: ${main_src} build
	${@F} $< ${run_args}

run/npm: ${main_src} setup
	npm start

run: run/${runtime}

clean:
	rm -rf ${tmp_dir}

cleanall: clean
	rm -f *~

distclean: cleanall
	rm -rf node_modules

test/npm: package.json
	npm test

test/${runtime}: ${test_src}
	${@F} $<

test: test/${runtime}
	@echo "log: $@: $^"

start: run

check/%: ${srcs}
	${MAKE} setup
	@echo "log: SHELL=$${SHELL}"
	status=0 ; \
 for src in $^; do \
 echo "log: check: $${src}: ($@)" ; \
 ${@F} $${src} \
 && echo "log: check: $${src}: OK" \
 || status=1 ; \
 done ; \
	exit $${status}

check/npm:
	npm run lint

check: check/${runtime}

git/commit/%:
	-git commit -sam "${runtime}: WIP: About to do something (${@})"

eslint: .eslintrc.js ${eslint}
	@rm -rf tmp/dist
	${eslint} --no-color --fix . ||:
	${eslint} --no-color .
	git diff --exit-code

eslint/setup: node_modules
	ls ${eslint} || npm install eslint-plugin-node eslint
	${eslint} --version

${eslint}:
	ls $@ || make eslint/setup
	touch $@

.eslintrc.js: ${eslint}
	ls $@ || $< --init

lint/%: eslint
	echo "$@: $^"

lint: lint/${runtime}
	echo "$@: $^"

setup/iotjs: ${iotjs_modules_dir}
	@echo "Expected to see IoT.js' help"
	${@F} --help ||:
	ls $<

rule/npm/version/%:
	-git describe --tags
	cd example/color-sensor-webthing && npm version ${@F}
	-git commit -sam "webthing: Update version to ${@F}"
	npm version ${@F}
