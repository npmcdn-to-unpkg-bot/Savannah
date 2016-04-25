var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();
var exec = require('child_process').exec;

gulp.task('serve', ['sass', 'sass:watch'], function () {
  // Serve the app with Nodemon
  nodemon();

  // Run Browser-Sync
  browserSync.init([
    "views/***",
    "public/stylesheets/***"
  ], {
    proxy: 'localhost:9001',
    injectChanges: true,
    open: true,
    browser: "Google Chrome Canary"
  });
});

gulp.task('sass', function() {
  return gulp.src("public/sass/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("public/stylesheets/"))
    .pipe(browserSync.stream());
});

gulp.task('sass:watch', function () {
  gulp.watch('public/sass/*.scss', ['sass']);
});

gulp.task('default', ['serve']);
