/*global module */

module.exports = function (grunt) {
  "use strict";
  grunt.initConfig({
    lint: {
      files: [
        'grunt.js',
        'spec/*.js',
        'scripts/*.js'
      ]
    },    
    concat:{
      dist:{
        src:[
          'scripts/*.js'
        ],
        dest:'cover-three.js'
      }
    },
    file_strip_globals:{
      files: ['cover-three.js']
    },
    min: {
      dist:{
         src:[
          'cover-three.js'
        ],
        dest:'cover-three.min.js'
      }
    },
    uglify: {
      mangle: {toplevel:true}
    },
    watch: {
        files: ['<config:lint.files>'],
        tasks: 'default'
    },
    jshint: {
      options: {
        curly: true,
        plusplus: false,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true
      }
    }
  });

  grunt.registerTask('default', 'lint concat file_strip_globals min');
  grunt.registerTask('default', 'lint concat file_strip_globals min');

  grunt.registerMultiTask('file_strip_globals', 'remove global comment blocks', function() {
    var files = grunt.file.expandFiles(this.file.src);
    var processed = 0;
    files.forEach(function(filepath) {
      // Copying the file to itself allows it to be processed in-place.
      grunt.file.copy(filepath, filepath, {process: function(src) {
        // remove global comment blocks: e.g., /* comment */
        var newSrc = src.replace(new RegExp('\\/\\*[\\s\\S]*?\\*\\/', 'gm'), '');
        // Don't copy file if it didn't change.
        if (newSrc === src) { return false; }
        // Log and copy.
        grunt.log.writeln('File "' + filepath + '" updated.');
        processed++;
        return newSrc;
      }});
    });

    // Fail task if errors were logged.
    if (this.errorCount) { return false; }

    if (processed === 0) {
      grunt.log.writeln('No files updated.');
    }
  });


};