'use strict'

let gulp = require("gulp");
let babel = require("gulp-babel");
let watch = require('gulp-watch');
let changed = require('gulp-changed');
let nodemon = require('gulp-nodemon');
let plumber = require('gulp-plumber');
let mocha = require('gulp-mocha');
let path = require('path');
let demon;


gulp.task("default", ['es6']);


gulp.task("es6-js", function() {
  return gulp.src(["src/**/*.js", "test/**/*.js"])
    .pipe(changed("build"))
    .pipe(plumber({
      errorHandler: function(e) {
        console.log('error', e);
      }
    }))
    // .pipe(babel())
    .pipe(gulp.dest("build"))
    .on('end', function() {
      console.log('end build');
    });
});

gulp.task("json", function() {
  return gulp.src(["src/**/*.json"])
    .pipe(gulp.dest("build"));
});

gulp.task('es6', ['es6-js', 'json']);



gulp.task('test', ['start-test'], function() {});

gulp.task('serve', ['start-serve'], function() {
  gulp.watch(["src/**/*.js", "test/**/*.js"], ['es6']);
});

gulp.task('start-test', function() {
  demon = nodemon({
    script: 'test/run.js',
    watch: ['src/'],
    execMap: {
      "js": "node  --harmony --harmony_proxies"
    },
    env: {
      'NODE_ENV': 'development'
    }
  });
});

gulp.task('start-serve', function() {
  demon = nodemon({
    script: 'src/index.sample.js',
    watch: ['src/'],
    execMap: {
      "js": "node  --harmony --harmony_proxies"
    },
    env: {
      'NODE_ENV': 'development'
    }
  });
});
