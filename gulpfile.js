var gulp = require('gulp');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var order = require('gulp-order');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var sass = require('gulp-sass');
var gutil = require('gulp-util');

gulp.task('concat', function(){
	return gulp.src(['src/js/*.js', '!src/js/frontendEditor.concat.js', 'src/js/*/*.js'])
	.pipe(order([
		"editor/editor_edit_btn.js",
		"editor/editor.js",
        "dom/text.js",
		"main.js"
	]))
	.pipe(concat('frontendEditor.concat.js'))
	.pipe(gulp.dest('src/js'));
});

gulp.task('uglify', ['concat'], function(){
	return gulp.src('src/js/frontendEditor.concat.js')
	.pipe(rename('frontendEditor.min.js'))
	.pipe(uglify().on('error', gutil.log))
	.pipe(gulp.dest('dist'));
})

gulp.task('sass', function(){
	return gulp.src('src/sass/*.sass')
	.pipe(sass())
	.pipe(gulp.dest('src/css/'));
});

gulp.task('css', ['sass'], function(){
	return gulp.src(['src/css/*.css'])
	.pipe(cssmin())
	.pipe(rename('frontendEditor.min.css'))
	.pipe(gulp.dest('dist'));
});

gulp.task('default', function(){
    gulp.watch(['src/js/*.js', '!src/js/frontendEditor.concat.js', 'src/js/*/*.js'], ['uglify']);
	gulp.watch(['src/sass/*.sass'], ['css']);
});