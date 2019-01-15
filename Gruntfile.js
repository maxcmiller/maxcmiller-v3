module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    hostname: 'localhost',
                    livereload: true,
                    open: true
                }
            }
        },
        uglify: {
            jquery: {
                src: ['js/libs/jquery-2.1.4.min.js'],
                dest: 'js/dist/jquery.min.js'
            },
            dist: {
                src: ['js/libs/lightbox.js', 'js/src/**/*.js'],
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
            options: {
                livereload: true
            },
            html: {
                files: ['index.jade', 'favicons/favicons.jade'],
                tasks: ['jade']
            },
            css: {
                files: ['css/libs/*.css', 'css/src/**/*.sass',
                    'css/src/**/*.scss'],
                tasks: ['sass', 'autoprefixer']
            },
            javascript: {
                files: ['js/src/*.js', 'js/libs/*.js'],
                tasks: ['uglify']
            },
            images: {
                files: ['img/**/*']
            },
            fonts: {
                files: ['fonts/**/*']
            },
            svg: {
                files: ['svg/*.svg'],
                tasks: ['svgstore', 'jade']
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
