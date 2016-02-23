const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const jshint = require('gulp-jshint');
const mocha = require('gulp-mocha');

gulp.task('lint', function() {
  return gulp.src('./src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('test', function() {
  return gulp.src('./test/*.js', {read: false})
    .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('default', ['lint', 'test'], function () {
  nodemon({
    script: 'src/index.js',
    ext: 'js',
    env: { 'NODE_ENV': 'development' },
    tasks: ['lint', 'test'],
  });
});
