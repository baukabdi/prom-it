const gulp = require('gulp'),
		sass = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		browserSync = require('browser-sync'),
		//uglify = require('gulp-uglify'),
		terser = require('gulp-terser'),
		stripCssComments = require('gulp-strip-css-comments'),
		concat = require('gulp-concat'),
		cssnano = require('gulp-cssnano'),
		rename = require('gulp-rename'),
		del = require('del'),
		imagemin = require('gulp-imagemin'),
		pngquant = require('imagemin-pngquant');

// Static Server + watching scss/html files
gulp.task('serve', function() {

	browserSync({
		server: {
			baseDir: './app'
		},
		notify: false,
		open: true,
		tunnel: false,
	});

	gulp.watch("app/sass/*.sass", gulp.series('sass'));
	gulp.watch("app/sass/libs.sass", gulp.series('css-libs'));
	gulp.watch("app/*.html", gulp.series('code'));
	gulp.watch("app/js/*.js", gulp.series('codeJS'));
	//gulp.watch("app/js/**/*.js", gulp.series('scripts'));

});

// HTML Live Reload
gulp.task('code', function() {
	return gulp.src('app/*.html')
	.pipe(browserSync.reload({ stream: true }))
});
// HTML Live Reload end

// JS Live Reload
gulp.task('codeJS', function() {
	return gulp.src('app/js/*.js')
	.pipe(browserSync.reload({ stream: true }))
});
// JS Live Reload END

// JS Task START
gulp.task('scripts', () => {
	return gulp.src([
		'app/js/partials/jquery.min.js', 
		'app/js/partials/wow.min.js',
		'app/js/partials/particles.min.js',
		'app/js/partials/bootstrap.min.js',
		'app/js/partials/jquery.magnific-popup.min.js',
		'app/js/partials/mmenu.js',
		])

	.pipe(concat('libs.min.js'))
	.pipe(terser())
	//.pipe(uglify().on('error', console.error))
	.pipe(gulp.dest('app/js'));
})
// JS Task END

// CSS Task START
gulp.task('css-libs', function() {
	return gulp.src('app/css/libs.css')

	.pipe(cssnano())
	.pipe(stripCssComments())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('app/css'))
})
// CSS Task END

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
	return gulp.src("app/sass/*.sass")
	.pipe(sass())
	.pipe(gulp.dest("app/css"))
	.pipe(autoprefixer({browsers: ['last 15 versions', '> 1%', 'ie 8', 'ie 7'], cascade: true }))
	.pipe(browserSync.stream());
});
// Compile sass into CSS & auto-inject into browsers END


// Clean START
gulp.task('clean', function(cleaning) {
	cleaning();
	return del.sync('dist');
})
// Clean END

// Imagemin START
gulp.task('img', function() {
	return gulp.src('app/images/**/*')
	.pipe(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	}))
	.pipe(gulp.dest('dist/images'));
})
// Imagemin END

// Build START
gulp.task('build', done => {
	var buildCss = gulp.src([
		'app/css/style.css',
		'app/css/libs.min.css',
	])
	.pipe(gulp.dest('dist/css'));

	var buildFonts = gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'));

	var buildJs = gulp.src([
		'app/js/*.js',
		])
	.pipe(gulp.dest('dist/js'));

	var buildHtml = gulp.src('app/*.html')
	.pipe(gulp.dest('dist'))

	done();
})
// Build END

gulp.task('start', gulp.series('serve'))
gulp.task('done', gulp.series('clean', 'build', 'sass', 'scripts', 'img'))