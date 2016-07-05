var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var exec = require('gulp-exec');
var nodemon = require('gulp-nodemon');

var filesToWatch = ['public/views/*.jade', 'gulpfile.js',
    'package.json'
];

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("public/styles/scss/main.scss")
        .pipe(sass())
        .pipe(gulp.dest("public/styles/css"))
        .pipe(browserSync.stream());
});

gulp.task('nodemon', function(cb) {
    var called = false;
    return nodemon({
        script: 'server.js'
    }).once('start', function() {
        if (!called) {
            cb();
            called = true;
        }
    });
});

gulp.task('browser-sync', ['nodemon'], function() {
    browserSync.init({
        proxy: "http://localhost:8080"
    });
});

gulp.task('default', ['sass', 'browser-sync'], function() {
    gulp.watch('public/styles/scss/**/*.scss', ['sass']);
    gulp.watch(filesToWatch, [browserSync.reload]);
});
