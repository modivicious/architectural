const { src, dest, watch, parallel, series } = require("gulp");

const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require('gulp-clean-css');
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const webpConvert = require("gulp-webp");
const webpDelete = require("del");
const del = require("del");
const { notify } = require("browser-sync");
const browserSync = require("browser-sync").create();

function browsersync() {
  browserSync.init({
    server: {
      baseDir: "app/",
    },
    notify: false,
  });
}

function styles() {
  return src("app/css/style.css")
    .pipe(concat("style.min.css"))
    .pipe(cleanCSS())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 10 versions"],
        grid: true,
      })
    )
    .pipe(dest("app/css"))
    .pipe(browserSync.stream()),

    src("app/css/media.css")
      .pipe(concat("media.min.css"))
      .pipe(cleanCSS())
      .pipe(
        autoprefixer({
          overrideBrowserslist: ["last 10 versions"],
          grid: true,
        })
      )
      .pipe(dest("app/css"))
      .pipe(browserSync.stream());
}

function scripts() {
  return src([
    "node_modules/jquery/dist/jquery.js",
    "node_modules/slick-carousel/slick/slick.js",
    "app/js/main.js"])
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(dest("app/js"))
    .pipe(browserSync.stream());
}

function images() {
  return src("app/images/**/*.*")
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 80, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(dest("dist/images"));
}

function webp() {
  return src(["app/images/**/*.jpg", "app/images/**/*.png", "!app/images/favicon/**/*.*"])
    .pipe(webpConvert({ quality: 80 }))
    .pipe(dest("app/images"));
}

function webpDel() {
  return webpDelete("app/images/**/*.webp");
}

function build() {
  return src(["app/**/*.html", "app/**/manifest.json", "app/css/style.min.css", "app/css/media.min.css", "app/css/color-schemes/**/*", "app/js/main.min.js"], {
    base: "app",
  }).pipe(dest("dist"));
}

function cleanDist() {
  return del("dist");
}

function watching() {
  watch(["app/css/**/*.css", "!app/css/style.min.css", "!app/css/media.min.css"], styles);
  watch(["app/js/**/*.js", "!app/js/main.min.js"], scripts);
  watch(["app/**/*.html"]).on("change", browserSync.reload);
}

exports.styles = styles;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.watching = watching;
exports.images = images;
exports.webp = webp;
exports.webpDel = webpDel;
exports.cleanDist = cleanDist;
exports.build = series(cleanDist, images, build);

exports.default = parallel(styles, scripts, browsersync, watching);
