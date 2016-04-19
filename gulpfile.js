var gulp = require('gulp');
var exec = require('child_process').exec;

gulp.task('default', function () {
  // Serve the app with Nodemon
  exec('nodemon ./bin/www');

  // Run Browser-Sync
  exec('browser-sync start --config=bs-config.js');
});
