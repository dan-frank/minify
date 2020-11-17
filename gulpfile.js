const gulp = require('gulp');
const browserSync = require('browser-sync').create();

const sass = require('gulp-sass');
const postCss = require('gulp-postcss');
const autoPrefixer = require('autoprefixer');
const cssNano = require('cssnano');

const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const jsImport = require('gulp-js-import');

const dist = './dist';

function styles() {
    const processors = [
        autoPrefixer(),
        cssNano({
            discardComments: {removeAll: true}
        })
    ];
    return gulp.src('./styles/main.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(postCss(processors))
        .pipe(gulp.dest(dist))
        .pipe(browserSync.stream());
}

function scripts() {
    return gulp.src('./scripts/main.js')
        .pipe(jsImport({hideConsole: true}))
        .pipe(babel({
            presets: [
                ['@babel/env', {
                    modules: false
                }]
            ]
        }))
        .pipe(uglify())
        .pipe(gulp.dest(dist))
        .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        // proxy: "http://localhost:8887/jake_lindemere"
        server: {
            baseDir: './'
        }
    }); 

    gulp.watch('./styles/**/*.sass', styles);
    gulp.watch('./scripts/**/*.js', scripts);
    gulp.watch('./**/*.html').on('change', browserSync.reload);
}

exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
