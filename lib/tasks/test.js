'use strict';
var path = require('path');
var merge = require('merge');
module.exports = function (grunt, gruntModuleDirectory) {
    var isTest = grunt.config('pkg.directories.test');
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
    var mochaGlobals = [
        'describe',
        'it',
        'beforeEach',
        'afterEach',
        'before',
        'after'
    ];
    var jshintOptions = {
        nonew: true,
        plusplus: true,
        curly: true,
        latedef: true,
        maxdepth: 6,
        unused: true,
        noarg: true,
        trailing: true,
        indent: 4,
        forin: true,
        noempty: true,
        quotmark: true,
        maxparams: 6,
        node: true,
        maxstatements: 30,
        eqeqeq: true,
        strict: true,
        undef: true,
        bitwise: true,
        newcap: true,
        immed: true,
        camelcase: true,
        maxcomplexity: 7,
        maxlen: 120,
        nonbsp: true,
        freeze: true
    };
    // load the required npm tasks for code quality
    grunt.loadNpmTasks(path.join(gruntModuleDirectory, 'grunt-contrib-jshint'));
    // load the required npm tasks for running node mocha tests and code coverage reports
    if (isTest) {
        grunt.loadNpmTasks(path.join(gruntModuleDirectory, 'grunt-mocha-cov'));
        // mocha configuration
        grunt.config(
            'mochacov', {
                options: {
                    // set test-case timeout in milliseconds [2000]
                    timeout: 50000,
                    // check for global variable leaks.
                    'check-leaks': true,
                    // specify user-interface (bdd|tdd|exports).
                    ui: 'bdd',
                    // "slow" test threshold in milliseconds [75].
                    slow: 10,
                    files: [
                        '<%= pkg.directories.test %>/**/*.js',
                        '!**/node_modules/**'
                    ]
                },
                // default test option
                test: {
                    options: {
                        reporter: 'spec'
                    }
                },
                coverage: {
                    options: {
                        reporter: 'mocha-term-cov-reporter',
                        coverage: true
                    }
                },
                // for sending coverage report to coveralls
                coveralls: {
                    options: {
                        coveralls: true
                    }
                }
            }
        );
    }
    // js-hint configuration
    grunt.config(
        [
            'jshint',
            'lib'
        ], {
            // validation for all server javascript files
            src: files.lib,
            options: jshintOptions
        }
    );
    // validation for all server javascript specifications
    if (isTest) {
        grunt.config(
            [
                'jshint',
                'test'
            ], {
                src: files.test,
                options: merge(
                    {
                        predef: mochaGlobals
                    },
                    jshintOptions
                )
            }
        );
    }
    // validation for all server javascript specifications
    grunt.config(
        [
            'jshint',
            'build'
        ], {
            src: files.build,
            options: jshintOptions
        }
    );
    // for faster builds we make sure that only the changed files are validated
    (function () {
        // save the watch timeouts to keep track of the ongoing watches
        var watchTimeouts = {};
        grunt.event.on(
            'watch', function (action, filepath, target) {
                if (action !== 'deleted' && /\.(js(on)?)$/i.test(filepath)) {
                    var config = [],
                        jshintSrc = 'jshint.' + target + '.src';
                    if (watchTimeouts[target]) {
                        // if there is an ongoing watch event, append the new files
                        // in the file list
                        clearTimeout(watchTimeouts[target]);
                        config = grunt.config(jshintSrc);
                    } else {
                        // in case of a new watch, create a new file list
                        grunt.config(jshintSrc, config);
                    }
                    // pass the file for jshint validation only if it is a javascript or a json file
                    config.push(filepath);
                    grunt.config(jshintSrc, config);
                    watchTimeouts[target] = setTimeout(
                        function () {
                            watchTimeouts[target] = undefined;
                        }, 1000
                    );
                }
            }
        );
    }());
    if (isTest) {
        // coverage script
        grunt.registerTask(
            'coveralls',
            [
                'mochacov:coveralls'
            ]
        );
        // test script
        grunt.registerTask(
            'test',
            [
                'jshint:lib',
                'jshint:test',
                'jshint:build',
                'mochacov:test',
                'mochacov:coverage'
            ]
        );
    } else {
        // coverage script
        grunt.registerTask(
            'coveralls',
            []
        );
        // test script
        grunt.registerTask(
            'test',
            [
                'jshint:lib',
                'jshint:build'
            ]
        );
    }
};