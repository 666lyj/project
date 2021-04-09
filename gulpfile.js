// 获取模块
const gulp =require('gulp');
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
// 发布任务
function fntest(){
    console.log('测试成功');
}
function fnHtml(){
    return gulp.src('./src/pages/*.html')
    .pipe(htmlmin())
    .pipe(gulp.dest('./dist/pages'));
}
function fnCss(){
    return gulp.src('./src/sass/*.scss')
    .pipe(sass({outputStyle:'expanded'}))
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest('./dist/css'));
}
function fnImage(){
    return gulp.src('./src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img'));
}
function fnJs(){
    return gulp.src('./src/js/*.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest('./dist/js'));
}
function fnJson(){
    return gulp.src('./src/json/*.json')
    .pipe(gulp.dest('./dist/json'));
}
function fnCopyIndex(){
    return gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist'));
}
function fnWatch(){
    gulp.watch('./src/json/*.json',fnJson)
    gulp.watch('./src/pages/*.html',fnHtml);
    gulp.watch('./src/index.html',fnCopyIndex);
    gulp.watch('./src/js/*.js',fnJs);
    gulp.watch('./src/index.html',fnCopyIndex);
    gulp.watch('./src/sass/*.scss',fnCss);
    gulp.watch('./src/img/*',fnImage)
}
// 导出模板
exports.test = fntest;
exports.html = fnHtml;
exports.css= fnCss;
exports.img = fnImage;
exports.js = fnJs;
exports.json = fnJson;
exports.copyindex = fnCopyIndex;
exports.default = fnWatch;
