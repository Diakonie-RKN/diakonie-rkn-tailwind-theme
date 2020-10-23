'use strict';

const gulp = require('gulp');
const postcss = require('gulp-postcss');
const minifyCSS = require('gulp-csso');
const rename = require('gulp-rename');
const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const fractal = require('@frctl/fractal').create();

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
        'node_modules/alpinejs/dist/alpine.js',
        'node_modules/alpinejs/dist/alpine-ie11.js',
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
        'node_modules/heroicons/outline/chevron-down.svg',
        'node_modules/heroicons/outline/chevron-left.svg',
        'node_modules/heroicons/outline/chevron-right.svg',
        'node_modules/heroicons/outline/chevron-up.svg',
        // Brands
        'node_modules/simple-icons/icons/facebook.svg',
        'node_modules/simple-icons/icons/whatsapp.svg',
        'node_modules/simple-icons/icons/twitter.svg',
        // Misc
        'node_modules/heroicons/solid/camera.svg',
        'node_modules/heroicons/solid/download.svg',
        'node_modules/heroicons/solid/mail.svg',
        'node_modules/heroicons/solid/home.svg',
        'node_modules/heroicons/solid/external-link.svg',
        'node_modules/heroicons/solid/newspaper.svg',
    ])
        .pipe(svgSprite(config))
        .pipe(gulp.dest('dist/img'));
})

gulp.task('default', gulp.series('css', 'copy-js-tools', 'logos', 'icons', 'svg'));



/* ========================================================================================
 Fractal Stuff
*/
const twigAdapter = require('@frctl/twig')({
    importContext: true
});

fractal.set('project.title', 'Diakonie Rhein-Kreis Neuss Component Library'); // title for the project
fractal.set('project.version', 'v1.0');
fractal.set('project.author', 'Jens Kuesters');
fractal.web.set('builder.dest', 'docs-build'); // destination for the static export
fractal.web.set('static.path', `${__dirname}/dist`);
fractal.docs.set('path', `${__dirname}/docs`); // location of the documentation directory.
fractal.components.set('path', `${__dirname}/components`); // location of the component directory.
fractal.components.engine(twigAdapter);
fractal.components.set('ext', '.twig');

const mandelbrot = require('@frctl/mandelbrot');

// create a new instance with custom config options
const myCustomisedTheme = mandelbrot({
    skin: 'white',
    // any other theme configuration values here
});

// tell Fractal to use the configured theme by default
fractal.web.theme(myCustomisedTheme);

// any other configuration or customisation here

const logger = fractal.cli.console; // keep a reference to the fractal CLI console utility

/*
 * Start the Fractal server
 *
 * In this example we are passing the option 'sync: true' which means that it will
 * use BrowserSync to watch for changes to the filesystem and refresh the browser automatically.
 * Obviously this is completely optional!
 *
 * This task will also log any errors to the console.
 */

gulp.task('fractal:start', function(){
    const server = fractal.web.server({
        sync: true
    });
    server.on('error', err => logger.error(err.message));
    return server.start().then(() => {
        logger.success(`Fractal server is now running at ${server.url}`);
    });
});

/*
 * Run a static export of the project web UI.
 *
 * This task will report on progress using the 'progress' event emitted by the
 * builder instance, and log any errors to the terminal.
 *
 * The build destination will be the directory specified in the 'builder.dest'
 * configuration option set above.
 */

gulp.task('fractal:build', function(){
    const builder = fractal.web.builder();
    builder.on('progress', (completed, total) => logger.update(`Exported ${completed} of ${total} items`, 'info'));
    builder.on('error', err => logger.error(err.message));
    return builder.build().then(() => {
        logger.success('Fractal build completed!');
    });
});