"use strict";

/*
* Node -> 6.9.1
* Gulp -> 3.9.1
* Compass -> 1.0.3 (Polaris)
* */

var gulp = require('gulp'),
    p = require('gulp-load-plugins')(),
    del = require('del');

var production = !!p.util.env.production;


// Styles
gulp.task('sass', function() {
    return gulp.src('src/sass/app.scss', { style: 'expanded' })
        .pipe(p.autoprefixer('last 2 version'))
        /*.pipe(p.sourcemaps.init())
        .pipe(p.sourcemaps.write())*/
        .pipe(p.compass({
            css: 'dist/css',
            sass: 'src/sass',
            source: !production,
            environment: production ? "production" : "development"
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(p.if(!production, p.rename({suffix: '.min'})))
        .pipe(p.if(!production, p.cleanCss({compatibility: 'ie9'})))
        .pipe(p.if(!production, gulp.dest('dist/css')))
        .pipe(p.notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('scripts', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(p.jshint('.jshintrc'))
        .pipe(p.jshint.reporter('default'))
        .pipe(p.concat('main.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(p.rename({suffix: '.min'}))
        .pipe(p.uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(p.notify({ message: 'Scripts task complete' }));
});

// Images
gulp.task('media', function() {
    return gulp.src('src/media/**/*')
        .pipe(p.cache(p.imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
        .pipe(gulp.dest('dist/media'))
});

// Font
gulp.task('fonts', function() {
    return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
});

// Clean
gulp.task('clean', function() {
    return del(['dist/*']);
});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('sass', 'scripts', 'media', 'fonts');
});

// Watch
gulp.task('watch', ['sass', 'scripts', 'media', 'fonts'], function() {

    // Watch .scss files
    gulp.watch('src/sass/**/*.scss', ['sass']);

    // Watch .js files
    gulp.watch('src/js/**/*.js', ['scripts']);

    // Watch image files
    gulp.watch('src/media/**/*', ['media']);

    // Watch fonts files
    gulp.watch('src/fonts/**/*', ['fonts']);

    // Create LiveReload server
    p.livereload.listen();

    // Watch any files in dist/, reload on change
    gulp.watch(['dist/**']).on('change', p.livereload.changed);
});