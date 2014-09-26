'use strict';
/**
 * @fileOverview this module registers a grunt task to run tests (and optionally documentation) on file changes.
 * @module tasks/observe
 * @requires {@link external:path}
 * @requires {@link external:grunt-contrib-watch}
 */
var path = require('path');
/**
 * this function registers a grunt task to run tests (and optionally documentation) on file changes. The below tasks
 * are created
 *
 *  -  `watch:lib` for watching lib file changes and running `lib-queue` when files change
 *  -  `watch:test` for watching test file changes and running `test-queue` when files change. This task is only
 *      available if test files exist.
 *  -  `watch:build` for watching build file changes and running `build-queue` when files change
 *  -  `lib-queue` which runs the jshint and test scripts for lib files
 *  -  `test-queue` which runs the jshint script for lib files and test scripts
 *  -  `build-queue` which runs the jshint and test scripts for build files
 *  -  `watch`
 *  -  `observe`
 *  -  `deafault`
 *
 * @param {*} grunt - the grunt object
 * @param {string} gruntModuleDirectory - the directory where the grunt modules are located
 */
module.exports = function (grunt, gruntModuleDirectory) {
    var isTest = grunt.config('pkg.directories.test');
    var onlyDocs = grunt.option('docs');
    // global variables are defined here
    var files = {
        lib: [
            '<%= pkg.directories.lib %>/**/*.js',
            '<%= pkg.directories.lib %>/**/*.json'
        ],
        test: [
            '<%= pkg.directories.test %>/**/*.js',
            '<%= pkg.directories.test %>/**/*.json',
            '!**/node_modules/**'
        ],
        build: [
            'Gruntfile.js',
            'package.json'
        ]
    };
    // load the required npm tasks for watching for file changes
    grunt.loadNpmTasks(path.join(gruntModuleDirectory, 'grunt-contrib-watch'));
    // Project watch configuration
    // watch for javascript changes
    grunt.config(
        [
            'watch',
            'lib'
        ], {
            files: files.lib,
            tasks: [
                'lib-queue'
            ]
        }
    );
    // watch for specification changes
    if (isTest) {
        grunt.config(
            [
                'watch',
                'test'
            ], {
                files: files.test,
                tasks: [
                    'test-queue'
                ]
            }
        );
    }
    grunt.config(
        [
            'watch',
            'build'
        ], {
            files: files.build,
            tasks: [
                'build-queue'
            ]
        }
    );
    // observe scripts
    if (isTest) {
        // tasks to run when files change
        grunt.registerTask(
            'lib-queue',
            onlyDocs ? [
                'document'
            ] : [
                'jshint:lib',
                'mochacov:test',
                'mochacov:coverage'
            ]
        );
        grunt.registerTask(
            'test-queue',
            [
                'jshint:test',
                'mochacov:test',
                'mochacov:coverage'
            ]
        );
        grunt.registerTask(
            'build-queue',
            [
                'jshint:build'
            ]
        );
    } else {
        // tasks to run when files change
        grunt.registerTask(
            'lib-queue',
            onlyDocs ? [
                'document'
            ] : [
                'jshint:lib'
            ]
        );
        grunt.registerTask(
            'build-queue',
            [
                'jshint:build'
            ]
        );
    }
    grunt.registerTask(
        'observe',
        onlyDocs ? [
            'document',
            'watch:lib',
            'watch:build'
        ] : [
            'test',
            'watch'
        ]
    );
    // observe is the default task
    grunt.registerTask(
        'default',
        [
            'observe'
        ]
    );
};