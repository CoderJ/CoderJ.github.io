module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      main: {
          files: [
              {expand: true, flatten: true, cwd: 'script_lib/', src: [
                  'bootstrap/dist/css/bootstrap.min.css',
              ], dest: 'stylesheets/lib'},
              {expand: true, flatten: true, cwd: 'script_lib/', src: [
                  'bootstrap/dist/js/bootstrap.min.js',
                  'jquery/dist/jquery.min.js',
                  'jquery/dist/jquery.min.map',
                  'd3/d3.min.js',
                  'marked/marked.min.js',
                  'jquery-qrcode/jquery.qrcode.min.js'
              ], dest: 'javascripts/lib'}
          ]
      }
    }
  });

  // 加载包含 "uglify" 任务的插件。
  grunt.loadNpmTasks('grunt-contrib-copy');

  // 默认被执行的任务列表。
  grunt.registerTask('default', ['copy']);

};