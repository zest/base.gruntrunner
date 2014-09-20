'use strict';
var path = require('path');
module.exports = function (grunt, gruntModuleDirectory) {
    var documentationFiles = [
        '<%= pkg.directories.lib %>/**/*.js',
        '<%= pkg.directories.lib %>/**/*.json',
        './README.md'
    ];
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
                    configure: path.join('node_modules', gruntModuleDirectory, '../lib/conf/jsdoc.json'),
                    template: path.join('node_modules', gruntModuleDirectory, '../lib/conf/jsdoc-theme')
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