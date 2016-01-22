# Makefile

## Add binaries in node_modules to PATH
export PATH := $(PATH):node_modules/.bin

.DEFAULT_GOAL := default
.PHONY: default clean distclean


## --------------------------------------------------------
##  File targets
## --------------------------------------------------------

node_modules: package.json
	npm install
	@touch node_modules


## --------------------------------------------------------
##  Phony targets
## --------------------------------------------------------

default: public/bundle.js

public/bundle.js: webpack.config.js node_modules $(wildcard src/*)
	WEBPACK_ENV=production webpack --progress

serve: node_modules
	webpack-dev-server

test: node_modules
	mocha --recursive test

clean:

distclean: clean
	@rm -rf node_modules
	@rm -f npm-debug.log
