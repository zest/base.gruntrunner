'use strict';
var path = require('path');
module.exports = function (grunt, gruntModuleDirectory) {
    // load the required npm tasks for cleaning the output directories
    grunt.loadNpmTasks(path.join(gruntModuleDirectory, 'grunt-contrib-clean'));
    // clean configuration
    grunt.config(
        'clean', {
            out: [
                '<%= pkg.directories.out %>'
            ]
        }
    );
};