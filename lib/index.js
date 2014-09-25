/**
 * @fileOverview this module returns a grunt script that configures clean, test, document, coverage and observe tasks
 * for the dependent module.
 * @module base-gruntrunner
 * @requires {@link external:merge}
 * @requires {@link external:path}
 */
'use strict';
var merge = require('merge'),
    path = require('path');
/**
 * This is the grunt export
 *
 *  - hello
 *  - world
 *
 * @param [*] grunt - the grunt object
 */
module.exports = function (grunt) {
    var modulePath = path.relative(
        path.join(process.cwd() + '/node_modules'),
        path.join(__dirname, '../node_modules')
    );
    // create 
    var pkg = merge.recursive(
        {
            directories: {
                lib: 'lib',
                out: '.out'
            }
        },
        grunt.file.readJSON('package.json')
    );
    // read the package.json for use
    grunt.config('pkg', pkg);
    require('./tasks/clean')(grunt, modulePath);
    require('./tasks/document')(grunt, modulePath);
    require('./tasks/test')(grunt, modulePath);
    require('./tasks/observe')(grunt, modulePath);
};