var gulp = require('gulp');

var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');

gulp.task('default', ['build']);

gulp.task('compressjs', function(){
  return gulp.src('pre/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('js'));
});

gulp.task('compresscss', function(){
  return gulp.src('pre/*.css')
    .pipe(cleanCSS({debug: true}, function(details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        }))
        .pipe(gulp.dest('css'));
});

gulp.task('build', ['compresscss', 'compressjs']);
