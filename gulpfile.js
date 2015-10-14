'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var pngquant = require('imagemin-pngquant');



// Lint JavaScript
gulp.task('jshint', function () {
    return gulp.src('app/scripts/*.js')
        .pipe(reload({stream: true, once: true}))
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

// Minify and copy all JavaScript (except vendor scripts)
gulp.task('scripts', function() {
  gulp.src(['app/scripts/**/*.js', '!app/scripts/vendor/**'])
    .pipe($.uglify({
        preserveComments: 'some',
        mangle: false,
        compress: true,
        beautify: true
    }))
    .pipe($.rename('main.min.js'))
    .pipe(gulp.dest('dist/scripts'));

  // Copy vendor files
  gulp.src('app/scripts/vendor/**')
    .pipe(gulp.dest('dist/scripts/vendor'));
});


// Copy all static assets
gulp.task('copy', function() {

    //Css
    gulp.src('app/styles/**/*')
        .pipe(gulp.dest('dist/styles'))
        .pipe($.size({title: 'css'}));

    //Images   
    gulp.src('app/images/**/*')
        .pipe($.imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/images'))
        .pipe($.size({title: 'images'}));

    //Fonts
    gulp.src(['app/fonts/**'])
        .pipe(gulp.dest('dist/fonts'))
        .pipe($.size({title: 'fonts'}));
});
//Clean up Html and Minify
gulp.task('html',function(){
    var assets = $.useref.assets({searchPath: '{.tmp,app}'});
    return gulp.src('app/**/*.html')
    .pipe(assets)
        .pipe($.if('*.css', $.uncss({
            html: [
                'app/index.html',
                'app/contact.html'
            ]
        })))
        .pipe($.if('*.css', $.csso()))
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe($.if('*.html', $.minifyHtml()))
        .pipe(gulp.dest('dist'))
        .pipe($.size({title: 'html'}));
});

// Clean output directory
gulp.task('clean', del.bind(null, ['.tmp', 'dist/*', '!dist/.git'], {dot: true}));

// Deploy to gh-pages
gulp.task('deploy', function() {
    return gulp.src('./dist/**/*')
        .pipe(ghPages());
});

gulp.task('serve', function () {
  browserSync({
    notify: false,
    logPrefix: 'WSK',
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: ['.tmp', 'app']
  });

  gulp.watch(['app/**/*.html'], reload);
  gulp.watch(['app/styles/**/*.css'], reload);
  gulp.watch(['app/scripts/**/*.js'], ['jshint']);
  gulp.watch(['app/images/**/*'], reload);
  gulp.watch(['app/fonts/**/*'], reload);
});

// Build and serve the output from the dist build
gulp.task('serve:dist', ['default'], function () {
    browserSync({
        notify: false,
        logPrefix: 'WSK',
        // Run as an https by uncommenting 'https: true'
        // Note: this uses an unsigned certificate which on first access
        //       will present a certificate warning in the browser.
        // https: true,
        server: 'dist'
    });
});

// Build production files, the default task
gulp.task('default', ['clean'], function (cb) {
    runSequence('jshint', ['scripts','html','copy'], cb);
});
// Build production files, the default task
gulp.task('gh-pages', ['clean'], function (cb) {
    runSequence('jshint', ['scripts','html','copy'], cb);
});