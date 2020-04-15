var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var minifyCss = require('gulp-minify-css');
var sourceMaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var imageMin = require('gulp-imagemin');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var less = require('gulp-less');

var menu = require('./menu.json');

gulp.task('templates', function(){
    var data = {
        year: new Date().getFullYear(),
        menu: menu.menuItems
    };

    var options = {
        batch: ['src/templates/partials']
    }

    return gulp.src(['src/templates/**/*.hbs', '!src/templates/partials/**/*.hbs'])
        .pipe(handlebars(data, options))
        .pipe(rename(function (path){
            path.extname = '.html'
        }))
        .pipe(gulp.dest('./'));
})

gulp.task('images', function(){
    gulp.src(['src/img/**/*'])
        .pipe(imageMin())
        .pipe(gulp.dest('dist/img'))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function(){
    gulp.src(['src/scripts/main.js'])
        .pipe(sourceMaps.init())
        .pipe(uglify())
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('dist/scripts'))
        .pipe(browserSync.stream());
});

gulp.task('styles', function(){
    gulp.src(['src/styles/main.less'])
        .pipe(sourceMaps.init())
        .pipe(less())
        .pipe(minifyCss())
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('dist/styles'))
        .pipe(browserSync.stream());
});

gulp.task('default', function(){
    browserSync.init({
        server: './'
    });
    //gulp.watch('src/**/*', browserSync.reload);
    gulp.watch('src/styles/**/*.less', gulp.series('styles'));
    gulp.watch('src/scripts/**/*.js', gulp.series('scripts'));
    gulp.watch('src/img/**/*', gulp.series('images'));
    gulp.watch('src/templates/**/*.hbs', gulp.series('templates'));
    gulp.watch('*.html',browserSync.reload);
    //console.log("Your first task has run.")
    //done();
});

