const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const jshint = require('gulp-jshint');

gulp.task('lint', function() {
  return gulp.src('./src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('default', ['lint'], function () {
  nodemon({
    script: 'src/index.js',
    ext: 'js',
    env: { 'NODE_ENV': 'development' },
    tasks: ['lint'],
  });
});
