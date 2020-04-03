const gulp = require("gulp"),
  concat = require("gulp-concat"),
  uglify = require("gulp-uglify"),
  sass = require("gulp-sass"),
  postcss = require("gulp-postcss"),
  autoprefixer = require("autoprefixer"),
  cssnano = require("cssnano"),
  sourcemaps = require("gulp-sourcemaps"),
  // watch = require('gulp-watch'),
  connect = require("gulp-connect"),
  browserSync = require("browser-sync").create();

const paths = {
  styles: {
    src: "app/scss/*.scss",
    dest: "app/css"
  }
};

gulp.task("minify", function() {
  return gulp
    .src("app/js/*.js")
    .pipe(concat("all.js"))
    .pipe(
      uglify({
        compress: {
          drop_console: true
        }
      })
    )
    .pipe(gulp.dest("build/js/"));
});

gulp.task("watch-js", function() {
  gulp.watch("app/js/*.js", ["minify"], function() {});
});

function style() {
  return (
    gulp
      .src(paths.styles.src)
      // Initialize sourcemaps before compilation starts
      .pipe(sourcemaps.init())
      .pipe(sass())
      .on("error", sass.logError)
      // Use postcss with autoprefixer and compress the compiled file using cssnano
      .pipe(postcss([autoprefixer(), cssnano()]))
      // Now add/write the sourcemaps
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(paths.styles.dest))
      // Add browsersync stream pipe after compilation
      .pipe(browserSync.stream())
  );
}

function reload() {
  browserSync.reload();
}

// Add browsersync initialization at the start of the watch task
function watch() {
  browserSync.init({
    // You can tell browserSync to use this directory and serve it as a mini-server

    server: {
      baseDir: "./"
    }
  });
  // gulp.watch(paths.styles.src, style);
  gulp.watch("app/scss/*.scss");

  gulp.watch("*.html", reload);
}

exports.watch = watch;

exports.style = style;
var build = gulp.parallel(style, watch);

gulp.task("build", build);
gulp.task("default", build);
