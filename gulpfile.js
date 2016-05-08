var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

gulp.task('copy', function() {
    gulp.src('client/*.html').pipe(gulp.dest('server/build'));
    gulp.src('client/images/**/*.*').pipe(gulp.dest('server/build/images'));
    
    gulp.src('client/stylesheets/**/*.*').pipe(gulp.dest('server/build/stylesheets'));
});

gulp.task('app-js', function() {
    return gulp.src('client/javascripts/**/*.js')
      .pipe(concat('app.js'))
      //.pipe(uglify())
      .pipe(gulp.dest('server/build/javascripts'));
});

gulp.task('watch', function() {
    gulp.watch(['client/*.html','client/javascripts/**/*.js'], ['default']);
});
//タスクの複数指定
gulp.task('build', ['copy', 'app-js']);
gulp.task('default', ['copy', 'app-js']);