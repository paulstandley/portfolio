var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var pump = require('pump');
var babel = require('gulp-babel');

gulp.task('imgmin', function(cb) {
	gulp.src('src/img/*.png')
		.pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
    cb();
});
 
gulp.task('bab', () =>
    gulp.src('src/js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('dist/js'))
);

gulp.task('compress', function (cb) {
  pump([
        gulp.src('src/js/*.js'),
        uglify(),
        gulp.dest('dist/js')
    ],
    cb
  );
});

gulp.task('minify', function(cb) {
  gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
  cb();
});

gulp.task('copyHTML', function(cb) {
  gulp.src('src/*.html')
      .pipe(gulp.dest('dist'));
      cb();
});

gulp.task('sass', function(cb) {
  gulp.src('src/sass/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('dist/css'));
  cb();
});

gulp.task('concat', function(cb) {
  gulp.src('src/js/*.js')
  .pipe(concat('app.js'))
  .pipe(uglify())
  .pipe(gulp.dest('dist/js'));
  cb();
});

