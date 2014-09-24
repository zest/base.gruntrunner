'use strict';
var path = require('path');
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
            'watch:lib'
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