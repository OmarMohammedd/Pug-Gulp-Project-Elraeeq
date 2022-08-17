const livereload = require("gulp-livereload");
const gulp = require("gulp");
// gulp plugin to minify HTML.
const htmlmin = require("gulp-htmlmin");
const { parallel } = require('gulp');
// gulp plugin to minify CSS, using clean-css
const cleanCSS = require('gulp-clean-css');
//  to cancat files
var concat = require('gulp-concat');
// Enabling you to compile your Pug templates into HTML
const pug = require('gulp-pug');
// To show file name in chrome
var sourcemaps = require('gulp-sourcemaps');
//بتعمل ريلود لملف واحد مش لكل الصفحات
var cache = require('gulp-cached');






function pugtoHTML() {
  return gulp
    .src(["src/**/*.pug", "!src/0-mywork/comp/*.pug"])
    .pipe( pug({ pretty: true}))
    .pipe(cache('linting')) 
    // .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"))
    .pipe(livereload());
}



function movecss() {
  return gulp
    .src(["src/0-mywork/css-files/*.css"])
    .pipe(sourcemaps.init())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(concat('all.css'))
    .pipe(sourcemaps.write())
    .pipe(cache('linting'))
    .pipe(gulp.dest("build"))
    .pipe(livereload());
}






exports.default = function () {
  require("./server.js");
  livereload.listen();

  gulp.watch( ["src/**/*.pug", "src/**/*.css"]  ,  parallel(pugtoHTML, movecss) );
};
