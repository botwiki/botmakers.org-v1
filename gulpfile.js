var gulp = require('gulp'),
    less = require('gulp-less'),
    path = require('path'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    nodemon = require('gulp-nodemon'),
    sourcemaps = require('gulp-sourcemaps');

var BROWSER_SYNC_RELOAD_DELAY = 5000;

gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({
    script: 'server.js',
    watch: ['server.js']
  })
    .on('start', function onStart() {
      if (!called) { cb(); }
      called = true;
    })
    .on('restart', function onRestart() {
      setTimeout(function reload() {
        browserSync.reload({
          stream: false
        });
      }, BROWSER_SYNC_RELOAD_DELAY);
    });
});

gulp.task('browser-sync', ['nodemon'], function () {
   var files = [
      '*.html',
      'views/*.*',
      'views/*.*',
      'views/layouts/*.*',
      'public/css/*.css',
      'public/images/**/*',
      'public/js/*.js'
   ];

   browserSync.init(files, {
      proxy: "localhost:3011",
      port: 4000
   });
});

gulp.task('styles', function() {
  return gulp.src('src/styles/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('public/css'))
    .pipe(autoprefixer('last 3 version', 'android >= 3', { cascade: true }))
    .pipe(gulp.dest('public/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('public/css'))
    .pipe(notify({ message: 'Styles task complete' }))
    .pipe(reload({stream:true}));
});

gulp.task('scripts', function() {
  return gulp.src('src/scripts/**/*.js')
    .pipe(jshint('tests/.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(gulp.dest('public/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('clean', function() {
  return gulp.src(['public/css', 'public/js'], {read: false})
    .pipe(clean());
});

gulp.task('watch', function() {
  gulp.watch('src/styles/*.less', ['styles']);
  gulp.watch('src/scripts/*.js', ['scripts']);
});

gulp.task('default', ['clean', 'browser-sync'], function() {
    gulp.start('styles', 'scripts', 'watch');
});