[![Dependencies][dependencies-image]][dependencies-link]
[![Dev Dependencies][dev-dependencies-image]][dev-dependencies-link]
[![Peer Dependencies][peer-dependencies-image]][peer-dependencies-link]

[![Quality][quality-image]][quality-link]
[![Build Status][build-status-image]][build-status-link]
[![Coverage Status][coverage-status-image]][coverage-status-link]
[![License][license-image]][license-link]


# zest / base.gruntrunner

> base.gruntrunner is a convenience module for adding grunt tasks to soul components.

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
    

## assumptions

TODO


## usage

TODO


## adding more tasks

TODO



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
[coverage-status-image]: http://img.shields.io/coveralls/zest/base.gruntrunner.svg?style=flat-square
[coverage-status-link]: https://coveralls.io/r/zest/base.gruntrunner