const Path = require('./gulp/path');
const rollupBundle = require('./gulp/rollup-bundle');
const gulp = require('gulp');
const bundleUglify = require('./gulp/gulp-uglify');
const fs = require('fs');
const gutil = require('gulp-util');
const gulpJsdoc2md = require('gulp-jsdoc-to-markdown');
const rename = require('gulp-rename');
const concat = require('gulp-concat');

gulp.task('build-lib', () => {
    return rollupBundle('./src/index.js', 'element-view.js', 'ElementView', {
        externalHelpers: false
    });
});

gulp.task('dist-lib', ['build-lib'], () => {
    return bundleUglify(Path.bundle('/element-view.js'), Path.bundle());
});

gulp.task('docs', () => {
    return gulp.src('src/**/*.js')
        .pipe(gulpJsdoc2md())
        .on('error', function (err) {
            gutil.log(gutil.colors.red('jsdoc2md failed'), err.message)
        })
        .pipe(rename(function (path) {
            path.extname = '.md'
        }))
        .pipe(gulp.dest('api'))
});

gulp.task('dist', ['dist-lib']);

// Watchers

gulp.task('watch:lib', () => {
    return gulp.watch('./src/**/*.js', ['dist-lib']);
});

gulp.task('watch', ['watch:lib']);
