# Makefile

## Add binaries in node_modules to PATH
export PATH := $(PATH):node_modules/.bin

all: test public/bundle.js


## --------------------------------------------------------
##  File targets
## --------------------------------------------------------

node_modules: package.json
	npm install
	@touch node_modules

public/bundle.js: webpack.config.js node_modules $(wildcard src/*)
	WEBPACK_ENV=production webpack --progress


## --------------------------------------------------------
##  Phony targets
## --------------------------------------------------------

serve: node_modules
	webpack-dev-server

test: node_modules
	mocha --recursive test

clean:
	@rm -f public/bundle.js

distclean: clean
	@rm -rf node_modules
	@rm -f npm-debug.log
