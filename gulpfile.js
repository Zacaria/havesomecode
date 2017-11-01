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

gulp.task('nodemon', function () {
  var called = false;
  return nodemon({
    script: 'server.js',
    ext: 'jade js json',
    ignore: [
      'gulpfile.js',
      'node_modules/'
    ]
  })
    .on('restart', function () {
      console.log('pouet');
      return browserSync.reload()
    })
    // .once('start', function () {
    //   if (!called) {
    //     called = true;
    //     cb();
    //   }
    // });
});

gulp.task('browser-sync', ['nodemon'], function () {
  browserSync.init(null, {
    proxy: "http://localhost:8080",
    notify: true
  });
});

gulp.task('default', ['sass', 'browser-sync'], function () {
  gulp.watch('public/styles/scss/**/*.scss', ['sass']);
  browserSync.reload({stream: false});
  // gulp.watch(filesToWatch, [browserSync.reload]);
});
