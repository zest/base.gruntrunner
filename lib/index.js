/**
 * @fileOverview this module returns a grunt script that configures clean, test, document, coverage and observe tasks
 * for the dependent module.
 * @module base-gruntrunner
 * @requires tasks/clean
 * @requires tasks/test
 * @requires tasks/document
 * @requires tasks/observe
 * @requires {@link external:merge}
 * @requires {@link external:path}
 */
'use strict';
var merge = require('merge');
var path = require('path');
/**
 * Here, we resolve the module path for the npm tasks and read package.json for the project. `package.json` object is
 * stored in the `pkg` config. Once this is done, the {@link module:tasks/clean|clean},
 * {@link module:tasks/document|document}, {@link module:tasks/test|test} and {@link module:tasks/observe|observe}
 * modules are invoked for registering tasks.
 * @param [*] grunt - the grunt object
 */
module.exports = function (grunt) {
    var modulePath = path.relative(
        path.join(process.cwd() + '/node_modules'),
        path.join(__dirname, '../node_modules')
    );
    // if lib or out directory is not set, we set it to 'lib' and '.out'
    var pkg = merge.recursive(
        {
            directories: {
                lib: 'lib',
                out: '.out'
            }
        },
        grunt.file.readJSON('package.json')
    );
    // store the package.json for use
    grunt.config('pkg', pkg);
    require('./tasks/clean')(grunt, modulePath);
    require('./tasks/document')(grunt, modulePath);
    require('./tasks/test')(grunt, modulePath);
    require('./tasks/observe')(grunt, modulePath);
};