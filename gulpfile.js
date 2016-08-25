var gulp = require('gulp');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var order = require('gulp-order');
var uglify = require('gulp-uglify')

gulp.task('js', function(){
	return gulp.src(['src/*.js', '!src/frontendEditor.concat.js'])
	.pipe(order([
        "text.js",
		"main.js"
	]))
	.pipe(concat('frontendEditor.concat.js'))
	.pipe(gulp.dest('src'))
	.pipe(rename('frontendEditor.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist'));
});

gulp.task('default', function(){
    gulp.watch(['src/*.js', '!src/frontendEditor.concat.js'], ['js']);
});