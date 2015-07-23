var gulp = require('gulp'),
  nodemon = require('gulp-nodemon');

gulp.task('develop', function () {
  nodemon({
    script: 'index.js'
  });
});

gulp.task('default', [
  'develop',
]);
