module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 8080
                }
            }
        },
        uglify: {
            dist: {
                src: ['js/libs/*.js', 'js/src/script.js'],
                dest: 'js/dist/script.min.js'
            }
        },
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'css/dist/unprefixed.css': 'css/src/main.sass'
                }
            }
        },
        jade: {
            debug: {
                files: {
                    'index.html': 'index.jade'
                }
            }
        },
        autoprefixer: {
            options: {
              browsers: ['last 2 versions', 'ie 9'],
              map: true
            },
            dist: {
                files: {
                    'css/dist/main.css': 'css/dist/unprefixed.css'
                }
            }
        },
        svgstore: {
            options: {
                prefix : 'icon-',
                svg: {
                    viewBox : '0 0 100 100',
                    xmlns: 'http://www.w3.org/2000/svg',
                    style: 'display: none;'
                }
            },
            dist: {
                files: {
                    'img/bundle.svg': ['svg/*.svg']
                }
            },
        },
        watch: {
            html: {
                files: ['index.jade'],
                tasks: ['jade'],
                options: {
                    livereload: true
                }
            },
            css: {
                files: ['css/libs/*.css', 'css/src/**/*.sass'],
                tasks: ['sass', 'autoprefixer'],
                options: {
                    livereload: true
                }
            },
            javascript: {
                files: ['js/src/*.js', 'js/libs/*.js'],
                tasks: ['uglify'],
                options: {
                    livereload: true
                }
            },
            images: {
                files: ['img/**/*'],
                options: {
                    livereload: true
                }
            },
            svg: {
                files: ['svg/*.svg'],
                tasks: ['svgstore', 'jade'],
                options: {
                    livereload: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-svgstore');

    grunt.registerTask('default', ['uglify', 'sass', 'jade', 'autoprefixer', 'svgstore']);
    grunt.registerTask('serve', ['connect:server', 'watch']);
};