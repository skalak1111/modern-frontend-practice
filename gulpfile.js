var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var minifyCss = require('gulp-minify-css');
var sourceMaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var imageMin = require('gulp-imagemin');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
/** related to browserify starts **/
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
/** related to browserify ends **/
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var a11y = require('gulp-a11y');

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
    return gulp.src(['src/img/**/*'])
        .pipe(imageMin())
        .pipe(gulp.dest('dist/img'))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function(){
    var b = browserify({
        entries: 'src/scripts/main.js',
        debug: true
    });

    return b.bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(sourceMaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('dist/scripts'))
        .pipe(browserSync.stream());

    /* gulp.src(['src/scripts/main.js'])
        .pipe(sourceMaps.init())
        .pipe(uglify())
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('dist/scripts'))
        .pipe(browserSync.stream());
        */
});

gulp.task('styles', function(){
    return gulp.src(['src/styles/main.less'])
        .pipe(sourceMaps.init())
        .pipe(less())
        .pipe(autoprefixer()) //post css prefixer i.e. webkit overriding will be seen in browser elements
        .pipe(minifyCss())
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('dist/styles'))
        .pipe(browserSync.stream());
});

gulp.task('lint', function() {
    return gulp.src('src/scripts/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('unit-test', function() {
    return gulp.src('test/*.js')
        .pipe(mocha());
});

gulp.task('accessibility', function() {
    return gulp.src('index.html')
        .pipe(a11y())
        .pipe(a11y.reporter());
});

gulp.task('test', gulp.series('lint', 'unit-test', 'accessibility'));

//gulp.series(gulp.parallel('styles','scripts','images','templates', 'test')
gulp.task('default', gulp.series('styles','scripts','images','templates', 'test'), function(done){
    browserSync.init({
        server: {
            baseDir: './',
            injectChanges: true
        }
    });
    //gulp.watch('src/**/*', browserSync.reload);
    gulp.watch('src/styles/**/*.less', gulp.series('styles', 'accessibility'));
    gulp.watch('src/scripts/**/*.js', gulp.series('scripts', 'lint', 'unit-test'));
    gulp.watch('src/img/**/*', gulp.series('images'));
    gulp.watch('src/templates/**/*.hbs', gulp.series('templates', 'accessibility'));
    gulp.watch('*.html',browserSync.reload);
    //console.log("Your first task has run.")
    done();
});

