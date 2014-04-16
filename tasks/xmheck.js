/*
 * grunt-xmheck
 * https://github.com/tristan/grunt-xmheck
 *
 * Copyright (c) 2014 Tristan Kenney
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var xmheck = require('xmheck').parser(),
      path   = require('path');

  grunt.registerMultiTask('xmheck', 'Grunt task for xmheck', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      prefix: undefined,
      includes: undefined
    });

    if (options.prefix !== undefined) {
      xmheck.setPrefix(options.prefix);
    }

    if (options.prefix !== undefined) {
      xmheck.setIncludes(options.includes);
    }

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(f) {
        return path.resolve(f);
      });

      if (src.length === 0) {
        grunt.log.warn( 'Destination (' + f.dest + ') not written because src files were empty.' );
        return;
      } else {
        src.forEach(function(src) {
          grunt.file.write(f.dest, xmheck.parse(src));
          grunt.log.writeln('File "' + f.dest + '" created.');
        });
      }
    });
  });

};
