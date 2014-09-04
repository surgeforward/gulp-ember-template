var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
var handlebars = require('gulp-handlebars');
var uglify = require('gulp-uglify');
var webserver = require('gulp-webserver');
var concat = require('gulp-concat');
var declare = require('gulp-declare');
var wrap = require('gulp-wrap');
var url = require('url');

gulp.task('webserver', function() {
  gulp.src('dist')
    .pipe(webserver({
      livereload: true,
      port: 8080,
      // proxies: [{source: '/api', target: 'http://localhost:3000'}]
    }));
});

gulp.task('fonts',function(){
  return gulp.src('vendor/fonts/*.*')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('images', function(){
  return gulp.src('app/img/*.*')
    .pipe(gulp.dest('dist/img'));
});

gulp.task('html',function(){
  return gulp.src('app/**/*.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('styles', function() {
  return gulp.src('app/styles/*.scss')
    .pipe(sass({ sass: 'scss' }))
    .pipe(concat('app.css'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('vendor:styles', function() {
  return gulp.src('vendor/css/*.css')
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('templates', function(){
  gulp.src('app/templates/**/*.hb')
    .pipe(handlebars({
      handlebars: require('ember-handlebars')
    }))
    .pipe(wrap('Ember.Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'Ember.TEMPLATES',
      noRedeclare: true, // Avoid duplicate declarations
      processName: function(filePath) {
        var path = require('path');
        filePath = filePath.replace(/\\/g, '/'); //change windows slashes
        var n = path.extname(filePath).length;
        var nameNoExt = n === 0 ? filePath : filePath.slice(0, -n); // remove extension
        var name = nameNoExt.split('app/templates/')[1];
        return name;
      }       
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('vendor:scripts', function() {
  var scriptSrc = [
    'vendor/js/jquery-1*.js',
    'vendor/js/handlebars-1*.js',
    'vendor/js/ember-1*.js',
    'vendor/js/*.js'
  ];
 
  return gulp.src(scriptSrc)
    .pipe(uglify({ mangle: false }))
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('dist/js'));
});


gulp.task('scripts', function() {
  return gulp.src([
    'app/app.js',
    'app/router.js',
    'app/**/*.js'
  ])
  .pipe(sourcemaps.init())
  .pipe(concat('app.js'))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function() {
  gulp.watch('app/styles/*.scss'    , ['styles']);
  gulp.watch('vendor/css/*.css'     , ['vendor:styles']);
  gulp.watch('app/templates/**/*.hb', ['templates']);
  gulp.watch(['app/**/*.js']        , ['scripts']);
  gulp.watch(['vendor/js/**/*.js']  , ['vendor:scripts']);
  gulp.watch('app/*.html'           , ['html']);
}); 


gulp.task('default',  ['styles', 
  'vendor:styles', 
  'templates', 
  'vendor:scripts',
  'scripts', 
  'html' ,
  'webserver', 
  'watch', 
  'fonts', 
  'images', 
  ]);