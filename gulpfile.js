const path = require('path')
const gulp = require('gulp')

const del = require('del')
const rename = require('gulp-rename')
const pug = require('gulp-pug')
const htmlmin = require('gulp-htmlmin')
const imagemin = require('gulp-imagemin')
const cache = require('gulp-cache')
const svgstore = require('gulp-svgstore')
const cheerioGulp = require('gulp-cheerio')
const svgmin = require('gulp-svgmin')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const postcss = require('gulp-postcss')
const cssnano = require('cssnano')
const autoprefixer = require('autoprefixer')
const browsersync = require('browser-sync').create()
const deporder = require('gulp-deporder')
const concat = require('gulp-concat')
const stripdebug = require('gulp-strip-debug')
const uglify = require('gulp-uglify')

/* Paths configuration */
const paths = {
  dist: 'site/', // location of fully built static site
  del: ['site/', 'src/img/svg.svg'], // folders/files to delete when cleaning
  html: {
    src: 'src/html/*.pug',
    dest: 'site/',
    watch: 'src/html/**/*.pug' // includes partials
  },
  css: {
    src: 'src/css/**/*.{sass,scss}',
    dest: 'site/'
  },
  js: {
    src: [
      'src/js/jquery/**/*.js',
      'src/js/vendor/**/*.js',
      'src/js/custom/**/*.js'
    ],
    dest: 'site/'
  },
  img: {
    src: 'src/img/*',
    dest: 'site/img/'
  },
  svg: {
    src: 'src/svg/*.svg',
    dest: 'src/img/'
  },
  fonts: {
    src: 'src/fonts/*',
    dest: 'site/fonts/'
  },
  favicons: {
    src: 'src/favicons/*',
    dest: 'site/favicons/'
  }
}

/* BrowserSync server */
function serve(done) {
  browsersync.init({
    port: 8980,
    server: {
      baseDir: paths.dist,
    },
    ui: {
      port: 8981
    }
  })
  done()
}

/* BrowserSync reload */
function reload(done) {
  browsersync.reload()
  done()
}

/* Wipe the static site directory */
function clean() {
  return del(paths.del)
}

function pugDev() {
  return gulp
    .src(paths.html.src)
    .pipe(pug())
    .pipe(gulp.dest(paths.html.dest))
}

function pugBuild() {
  return gulp
    .src(paths.html.src)
    .pipe(pug())
    .pipe(htmlmin())
    .pipe(gulp.dest(paths.html.dest))
}

function cssDev() {
  const plugins = [
    autoprefixer({browsers: ['last 2 versions']})
  ]
  return gulp
    .src(paths.css.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.css.dest))
    .pipe(browsersync.stream())
}

function cssBuild() {
  const plugins = [
    autoprefixer(),
    cssnano()
  ]
  return gulp
    .src(paths.css.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(gulp.dest(paths.css.dest))
}

function jsDev() {
  return gulp
    .src(paths.js.src)
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest(paths.js.dest))
    .pipe(browsersync.stream())
}

function jsBuild() {
  return gulp
    .src(paths.js.src)
    .pipe(concat('bundle.js'))
    .pipe(stripdebug())
    .pipe(uglify())
    .pipe(gulp.dest(paths.js.dest))
}

function imgDev() {
  return gulp
    .src(paths.img.src)
    .pipe(gulp.dest(paths.img.dest))
}

function imgBuild() {
  return gulp
    .src(paths.img.src)
    .pipe(cache(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progrssive: true}),
      imagemin.optipng({optimizationLevel: 5})
    ])))
    .pipe(gulp.dest(paths.img.dest))
}

function svg() {
  return gulp
    .src(paths.svg.src)
    .pipe(rename({prefix: 'icon-'}))
    .pipe(svgmin(function (file) {
      var prefix = path.basename(file.relative, path.extname(file.relative))
      return {
        plugins: [{
          cleanupIDs: {
            prefix: prefix + '-',
            minify: true
          }
        },
        {
          removeViewBox: false
        }]
      }
    }))
    .pipe(svgstore({inlineSvg: true}))
    .pipe(cheerioGulp({
      run: function ($) {
        $('svg').attr('style', 'display:none');
      },
      parserOptions: { xmlMode: true }
    }))
    .pipe(gulp.dest(paths.svg.dest));
}

function fonts() {
  return gulp
    .src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dest))
}

function favicons() {
  return gulp
    .src(paths.favicons.src)
    .pipe(gulp.dest(paths.favicons.dest))
}

function watch() {
  gulp.watch(paths.html.src, gulp.series(pugDev, reload))
  gulp.watch(paths.css.src, gulp.series(cssDev, reload))
  gulp.watch(paths.js.src, gulp.series(jsDev, reload))
  gulp.watch(paths.img.src, gulp.series(imgDev, reload))
  gulp.watch(paths.svg.src, gulp.series(svg, reload))
  gulp.watch(paths.fonts.src, gulp.series(fonts, reload))
  gulp.watch(paths.favicons.src, gulp.series(favicons, reload))
}

const build = gulp.series(clean, gulp.parallel(cssBuild, jsBuild,
  gulp.series(svg, imgBuild, pugBuild), fonts, favicons))
const devBuild = gulp.series(clean, gulp.parallel(cssDev, jsDev,
  gulp.series(svg, imgDev, pugDev), fonts, favicons))
const server = gulp.parallel(watch, serve)

/* Remove all generated/minified assets and clean the site directory */
exports.clean = clean

/* Build the full site for deployment */
exports.build = build

/* Build the full site but use development parameters */
exports.devbuild = devBuild

/* Start up a local server with whatever is currently in the site directory,
which could be nothing (run 'gulp devbuild' beforehand) */
exports.serve = server

/* Default task: running 'gulp' runs a full deployment build */
exports.default = build
