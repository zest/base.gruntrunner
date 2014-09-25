[![Dependencies][dependencies-image]][dependencies-link]
[![Dev Dependencies][dev-dependencies-image]][dev-dependencies-link]
[![Peer Dependencies][peer-dependencies-image]][peer-dependencies-link]

[![Quality][quality-image]][quality-link]
[![Build Status][build-status-image]][build-status-link]
[![License][license-image]][license-link]


# zest / base.gruntrunner

> base.gruntrunner is a convenience module for adding grunt tasks to zest components.

## general tasks

The grunt runner defines the following general tasks into the grunt file.

  - `clean`
    
    The clean task cleans up the output directory and restores the project to its original state


  - `test`
  
    The test task runs mocha tests and generates coverage report on the console
    
    
  - `document`
  
    The document task generates jsdoc documentation for the module sources
    
    
  - `observe`
  
    The observe task is used mainly for development. It is also the default grunt task. This task will watch for file 
    changes and run jshint validations and test cases everytime any relevant file changes. `observe` has two variants:
    
      - `grunt observe` or `grunt` will observe file changes for code quality and tests
      - `grunt observe --docs` or `grunt --docs` will observe file changes for jsdoc documentation
  
  - `coveralls`
    The coveralls task is used to submit coverage report to coveralls. This task will only run successfully from 
    **travis-ci**.
  
  - `gh-pages`
    The gh-pages task pushes the module documentation into the projects github site.
    

## assumptions

The gruntrunner assumes the following

 -  the test scripts are written using mocha.
 -  the code is documented in JSDoc syntax.
 -  the source files are present in the folder specified in `directories.lib` property in `package.json`
 -  if `directories.lib` property in `package.json` is not found, the source directory is assumed to be `./lib`
 -  the test files are present in the folder specified in `directories.test` property in `package.json`
 -  if `directories.test` property in `package.json` is not found, no test cases will run and no coverage will be 
    generated
 -  coverage reports are generated using [blanket](http://blanketjs.org/). So, if the test directory is present,
    coverage config must be present in `package.json`. Below is an example configuration.
    
    ``` json
    "config": {
        "blanket": {
            "pattern": "//^(?!.*/node_modules/).*/lib/" 
        } 
    }
    ```

## usage

For the most simple usage where the default behavior is enough, one line in `GruntFile.js` will be enough.

``` js
    module.exports = require('./lib');
```

However, if you want to add other tasks and (maybe) fiddle with the gruntrunner tasks, you can use it as shown below.


``` js
    module.exports = function(grunt) {
        ...
        require('./lib')(grunt);
        ...
    }
```


[dependencies-image]: http://img.shields.io/david/zest/base.gruntrunner.svg?style=flat-square
[dependencies-link]: https://david-dm.org/zest/base.gruntrunner#info=dependencies&view=list
[dev-dependencies-image]: http://img.shields.io/david/dev/zest/base.gruntrunner.svg?style=flat-square
[dev-dependencies-link]: https://david-dm.org/zest/base.gruntrunner#info=devDependencies&view=list
[peer-dependencies-image]: http://img.shields.io/david/peer/zest/base.gruntrunner.svg?style=flat-square
[peer-dependencies-link]: https://david-dm.org/zest/base.gruntrunner#info=peerDependencies&view=list
[license-image]: http://img.shields.io/badge/license-UNLICENSE-brightgreen.svg?style=flat-square
[license-link]: http://unlicense.org
[quality-image]: http://img.shields.io/codeclimate/github/zest/base.gruntrunner.svg?style=flat-square
[quality-link]: https://codeclimate.com/github/zest/base.gruntrunner
[build-status-image]: http://img.shields.io/travis/zest/base.gruntrunner.svg?style=flat-square
[build-status-link]: https://travis-ci.org/zest/base.gruntrunner