'use strict';
/**
 * @fileOverview this module registers a grunt task to generate jsdoc from sources and uploading them to gh-pages
 * branch in github.
 * @module tasks/document
 * @requires {@link external:path}
 * @requires {@link external:grunt-jsdoc}
 * @requires {@link external:grunt-gh-pages}
 */
var path = require('path');
/**
 * this function registers a grunt task to generate jsdoc from sources and uploading them to gh-pages branch in github.
 * The below tasks are created
 *
 *  -  `gh-pages` for pushing generated documentation to github gh-pages
 *  -  `jsdoc:lib` to generate jsdoc documentation
 *  -  `document` which is an alias to `jsdoc:lib`
 *
 * @param {*} grunt - the grunt object
 * @param {string} gruntModuleDirectory - the directory where the grunt modules are located
 */
module.exports = function (grunt, gruntModuleDirectory) {
    var documentationFiles = [
        '<%= pkg.directories.lib %>/**/*.js',
        '<%= pkg.directories.lib %>/**/*.json',
        './README.md'
    ];
    var jsDocConfig = grunt.file.readJSON(path.join('node_modules', gruntModuleDirectory, '../conf/jsdoc.json'));
    jsDocConfig.templates.component = grunt.config('pkg.name');
    grunt.file.write(
        path.join('node_modules', gruntModuleDirectory, '../conf/__jsdoc__.json'),
        JSON.stringify(jsDocConfig)
    );
    // load the required npm tasks for generating jsdoc documentation
    grunt.loadNpmTasks(path.join(gruntModuleDirectory, 'grunt-jsdoc'));
    // load the required npm tasks for generating github website
    grunt.loadNpmTasks(path.join(gruntModuleDirectory, 'grunt-gh-pages'));
    // jsdoc configuration
    grunt.config(
        'jsdoc', {
            lib: {
                src: documentationFiles,
                dest: '<%= pkg.directories.out %>/documentation',
                options: {
                    configure: path.join('node_modules', gruntModuleDirectory, '../conf/__jsdoc__.json'),
                    template: path.join('node_modules', gruntModuleDirectory, '../conf/jsdoc-theme')
                },
                jsdoc: path.join('node_modules', gruntModuleDirectory, './grunt-jsdoc/node_modules/jsdoc/jsdoc')
            }
        }
    );
    // pushing to github pages
    grunt.config(
        'gh-pages', {
            options: {
                base: '<%= pkg.directories.out %>/documentation',
                repo: 'https://' + process.env.GH_TOKEN + '@github.com/zest/<%= pkg.name %>.git',
                clone: '<%= pkg.directories.out %>/gh_pages',
                message: 'auto commit <%= pkg.name %> on <%= grunt.template.today("yyyy-mm-dd") %>',
                silent: true,
                user: {
                    name: 'travis-ci',
                    email: 'travis-ci@zest.com'
                }
            },
            src: [
                '**'
            ]
        }
    );
    // scripts exposed from package.json
    // document script
    grunt.registerTask(
        'document',
        [
            'jsdoc:lib'
        ]
    );
};