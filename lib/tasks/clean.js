'use strict';
/**
 * @fileOverview this module registers a grunt task to clean the output directory.
 * @module tasks/clean
 * @requires {@link external:path}
 * @requires {@link external:grunt-contrib-clean}
 */
var path = require('path');
/**
 * This function rtegisters a `clean` task to clean output directory
 * @param {*} grunt - the grunt object
 * @param {string} gruntModuleDirectory - the directory where the grunt modules are located
 */
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