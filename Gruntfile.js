'use strict';

module.exports = function(grunt){
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner:'/*! <%= pkg.name %> - v<%=pkg.version %> -' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright(c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed MIT */\n',
        clean:{
            files:['dist']
        },
        concat : {
            options: {
                banner : '<%= banner%>',
                stripBanners:true
            },
            dist: {
                srt:['src/<%= pkg.name %>.js'],
                dest:'dist/jquery.<%= pkg.name >.js'
            }
        },
        uglify : {
            options : {
                banner : '<% = banner %>'
            },
            dist : {
                src : '<%= concat.dist.dest %>',
                dest: 'dist/jquery.<%= pkg.name %>.min.js'
            }
        },
        gunit : {
            all: {
                options :{
                    urls : ['http://localhost:9000/test/<%=  pkg.name %>.html']
                }
            }
        },
        jshint : {
            options : {
                reporter : require('jshint-stylish')
            },
            gruntfile : {
                options : {
                    jshintrc : '.jshintrc'
                },
                src : 'Gruntfile.js'
            },
            src : {
                options : {
                    jshintrc : 'src/.jshintrc'
                },
                src : ['src/**/*.js']
            },
            test : {
                options : {
                    jshintrc : 'test/.jshintrc'
                },
                src : ['test/**/*.js']
            }
        },
        watch : {
            gruntfile : {
                files: '<%= jshint.gruntfile.src %>',
                tasks : ['jshint:gruntfile']
            },
            src : {
                files: '<%= jshint.src.src%>',
                tasks : ['jshint.src', 'gunit']
            },
            test : {
                files : '<%= jshint.test.src%>',
                tasks : ['jshint:test', 'gunit']
            }
        },
        connect : {
            server : {
                options : {
                    hostname : '*',
                    port : 9000
                }
            }
        }
    });
    grunt.registerTask('default', ['jshint', 'connect', 'gunit', 'clean', 'concat', 'uglify']);
    grunt.registerTask('server', function(){
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve']);
    });
    grunt.registerTask('serve', ['connect', 'watch']);
    grunt.registerTask('test', ['jshint', 'connect', 'qunit']);

};