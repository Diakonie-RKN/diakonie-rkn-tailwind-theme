'use strict';

const gulp = require('gulp');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');

gulp.task('css', function () {
    return gulp
        .src('./css/dw-tailwind.css')
        .pipe(postcss([
            require('postcss-import'),
            require('tailwindcss'),
            require('postcss-nested'),
            require('autoprefixer'),
        ]))
        .pipe(rename('app.css'))
        .pipe(gulp.dest('./dist'))
});

gulp.task('copy-js-tools', function () {
    return gulp.src([
        'node_modules/lazysizes/lazysizes.min.js',
        'node_modules/lazysizes/plugins/print/ls.print.min.js',
        'node_modules/alpinejs/dist/cdn.min.js',
        'node_modules/@glidejs/glide/dist/glide.min.js',
        'node_modules/@glidejs/glide/dist/css/glide.core.min.css',
        'node_modules/mapbox-gl/dist/mapbox-gl.js',
        'node_modules/mapbox-gl/dist/mapbox-gl.css',
        'node_modules/@turf/turf/turf.min.js',
        'node_modules/@sidsbrmnn/scrollspy/dist/scrollspy.min.js',
        'node_modules/hc-sticky/dist/hc-sticky.js',
        'node_modules/simplelightbox/dist/simple-lightbox.min.js',
        'node_modules/simplelightbox/dist/simple-lightbox.min.css',
    ])
        .pipe(gulp.dest('./dist'));
});

gulp.task('logos', function () {
    const config = {
        mode: {
            symbol: {
                dest: '.',
                sprite: 'logos.svg'
            }
        },
        svg: {
            namespaceClassnames: false,
        },
    };

    return gulp.src([
        'img/logo-diakonie-rkn.svg',
        'img/logo-diakonie-kronenkreuz.svg',
    ])
        .pipe(svgSprite(config))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('svg', function () {
    return gulp.src([
        'img/map-marker.svg',
        'img/undraw_server_down_s4lk.svg',
        'img/undraw_warning_cyit.svg',
        'img/search-by-algolia-light-background.svg'
    ])
        .pipe(svgmin())
        .pipe(gulp.dest('./dist/img'));
});

gulp.task('icons', function() {
    const config = {
        mode: {
            symbol: {
                dest: '.',
                sprite: 'icons.svg'
            }
        }
    };

    return gulp.src([
        // Navigation
        'node_modules/heroicons/outline/menu.svg',
        'node_modules/heroicons/outline/search.svg',
        'node_modules/heroicons/outline/x.svg',
        // Alerts
        'node_modules/heroicons/outline/check-circle.svg',
        'node_modules/heroicons/outline/exclamation-circle.svg',
        'node_modules/heroicons/outline/information-circle.svg',
        'node_modules/heroicons/outline/question-mark-circle.svg',
        // Directions
        'node_modules/heroicons/solid/arrow-circle-right.svg',
        'node_modules/heroicons/outline/arrow-right.svg',
        'node_modules/heroicons/outline/chevron-down.svg',
        'node_modules/heroicons/outline/chevron-left.svg',
        'node_modules/heroicons/outline/chevron-right.svg',
        'node_modules/heroicons/outline/chevron-up.svg',
        // Brands
        'node_modules/simple-icons/icons/facebook.svg',
        'img/firstbird.svg',
        'node_modules/simple-icons/icons/instagram.svg',
        'img/kununu.svg',
        'node_modules/simple-icons/icons/whatsapp.svg',
        'node_modules/simple-icons/icons/twitter.svg',
        'node_modules/simple-icons/icons/xing.svg',
        // Misc
        'node_modules/heroicons/solid/camera.svg',
        'node_modules/heroicons/solid/download.svg',
        'node_modules/heroicons/solid/mail.svg',
        'node_modules/heroicons/solid/music-note.svg',
        'node_modules/heroicons/solid/home.svg',
        'node_modules/heroicons/solid/external-link.svg',
        'node_modules/heroicons/solid/newspaper.svg',
    ])
        .pipe(svgSprite(config))
        .pipe(gulp.dest('dist/img'));
})

gulp.task('default', gulp.series('css', 'copy-js-tools', 'logos', 'icons', 'svg'));