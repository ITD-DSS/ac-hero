var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var gcmq = require('gulp-group-css-media-queries');
var csscomb = require('gulp-csscomb');

// Watch Tasks

gulp.task('sass', function() {
  return gulp.src('scss/**/*.scss')
  .pipe(sass({outputStyle: 'expanded'}))
  .pipe(gcmq())
  .pipe(postcss([
    autoprefixer({browsers: ['last 2 versions', 'IE 9']})
  ]))
  .pipe(csscomb())
  .pipe(gulp.dest('css'))
  .pipe(browserSync.reload({
    stream: true
  }));
});

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: './'
    },
  });
});

gulp.task('watch', ['browserSync', 'sass'], function(){
  gulp.watch('scss/**/*.scss', ['sass']);
  gulp.watch('css/**/*.css', browserSync.reload);  
  gulp.watch('*.html', browserSync.reload); 
  gulp.watch('js/**/*.js', browserSync.reload);
});

gulp.task('default', function (callback) {
  runSequence(['sass', 'browserSync', 'watch'],
    callback
  );
});
