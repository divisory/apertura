var PATH = '',
		OPTIONS = {
			serverHost: 'localhost',
			serverPort: 1111,
			serverLivereload: true,
			coffeeWraping: true,
			notices: true
		};

var gulp = require('gulp'),
		connect = require('gulp-connect'),
		coffee = require('gulp-coffee'),
		clean = require('gulp-clean'),
		sass = require('gulp-sass'),
		colors = require('colors'),
		fileinclude = require('gulp-include'),
		cssmin = require('gulp-cssmin'),
		rename = require('gulp-rename'),
		filelist = require('gulp-filelist'),
		using = require('gulp-using'),
		map = require('map-stream'),
		plumber = require('gulp-plumber'),
		autoprefixer = require('gulp-autoprefixer'),

		exec = require("child_process").exec;

var execute = function(command, callback){
	exec(command, function(error, stdout, stderr){
		callback(stdout);
	});
};

gulp.task('connect', function(){
	connect.server({
		host: OPTIONS.serverHost,
		port: OPTIONS.serverPort,
		livereload: OPTIONS.serverLivereload,
		root: [PATH+'dist',PATH+'dev-tools',PATH+'scss']
	});
});

gulp.task(' coffee', function(){
	var src = gulp.src(PATH+'coffee/*coffee')
		.pipe(plumber())
		.pipe(fileinclude());
	if (OPTIONS.coffeeWraping === true){
		src
			.pipe(plumber())
			.pipe(coffee({bare: true}))
			.pipe(gulp.dest(PATH+'dist/js'));
	} else {
		src
			.pipe(plumber({
				errorHandler: function(err){

				}
			}))
			.pipe(coffee())
			.pipe(gulp.dest(PATH+'dist/js'));
	}
	src.pipe(connect.reload());
});

gulp.task('   sass', function(){
	var src = gulp.src(PATH+'scss/*.scss');
	src
		.pipe(plumber())
		.pipe(sass())
		.pipe(autoprefixer({
			cascade: false,
			browsers: [
				'Chrome > 30', 'Firefox > 20', 'iOS > 5', 'Opera > 12',
				'Explorer > 8', 'Edge > 10']
		}))
		.pipe(gulp.dest(PATH+'dist/css/full'))
		.pipe(cssmin())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest(PATH+'dist/css'))
		.pipe(connect.reload());
});

gulp.task('IncHTML', function(){
	var src = gulp.src(PATH+'html/*.html');
	src
		.pipe(plumber())
		.pipe(fileinclude())
		.pipe(gulp.dest(PATH+'dist/'))
		.pipe(connect.reload());
});

gulp.task('    css', function(){
	src = gulp.src(PATH+'dist/css/*.css');
	src.pipe(connect.reload());
});

// gulp.task('   HTML', function(){
// 	src = gulp.src(PATH+'dist/*.html');
// 	src
// 		.pipe(plumber())
// 		.pipe(connect.reload());
// });

gulp.task('     Js', function(){
	src = gulp.src(PATH+'dist/js/*.js');
	src.pipe(connect.reload());
});

gulp.task('  watch', function(){
	gulp.watch(PATH+'coffee/*coffee', 				[' coffee']);
	gulp.watch(PATH+'coffee/*/*coffee',				[' coffee']);
	// gulp.watch(PATH+'dev-tools/*/*/*coffee',	[' coffee']);
	gulp.watch(PATH+'scss/*.scss', 						['   sass']);
	gulp.watch(PATH+'scss/*/*scss', 					['   sass']);
	// gulp.watch(PATH+'dev-tools/*/*/*scss', 		['   sass']);
	// gulp.watch(PATH+'dist/*html', 						['   HTML']);
	gulp.watch(PATH+'html/*html', 						['IncHTML']);
	gulp.watch(PATH+'html/includes/*html', 		['IncHTML']);
	// gulp.watch(PATH+'dist/css/*css', 					['    css']);
	// gulp.watch(PATH+'dist/js/*/*js', 					['     Js']);
	// gulp.watch(PATH+'dist/js/*js', 						['     Js']);
});

gulp.task('default', [
	' coffee',
	'  watch',
	'   sass',
	// '   HTML',
	'IncHTML',
	// '    css',
	// '     Js',
	'connect'
]);