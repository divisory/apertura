# =============================================================================
# 				GULPFILE.COFFEE BY IGOR VOLODIN | 11.12.2014
# =============================================================================
# 								STRUCTURE:
# - PATH 		: The variable of PAHT contains path to all files
# 							and folders. Current - the folder, wich conains
# 							[gulpfile.coffee]
# - REQUIRES 	: This block for including gulp modules for you
# 							work. All modules must be installed.
# - TASKS 		: This block contains all tasks for you project.
# - WATCH 		: This task watching changes of files and gives
# 							commands to compillators to compile you files.
# - MAIN TASK : This task contains all tasks.
# =============================================================================

# -----------------------------------------------------------------------------
# PATH
# -----------------------------------------------------------------------------
# path for current project
# by default - ''

PATH 		= ''
OPTIONS 	=
	# server
	serverHost: 				'localhost'
	serverPort: 				1111
	serverLivereload: 	on
	# coffee
	coffeeWraping: 			false

# -----------------------------------------------------------------------------
# MODULES
# -----------------------------------------------------------------------------

# include fs
fs 					= require 'fs'
# include gulp
gulp 				= require 'gulp'
# include module for local server
connect 		= require 'gulp-connect'
# *.coffee compilling
coffee 			= require 'gulp-coffee'
# *.coffee compilling
clean 			= require 'gulp-clean'
# clearing
uglify 			= require 'gulp-uglify'
# SASS compilator
sass 				= require 'gulp-sass'
# colors
colors 			= require 'colors'
# files
fileinclude = require 'gulp-include'
# cssmin
cssmin 			= require 'gulp-cssmin'
# rename
rename 			= require 'gulp-rename'
# filelist
filelist 		= require 'gulp-filelist'
# using
using 			= require 'gulp-using'
# map
map 				= require 'map-stream'
# plumber
plumber 		= require 'gulp-plumber'

# -----------------------------------------------------------------------------
# CONSOLE
# -----------------------------------------------------------------------------

consol = (str, str2, str3) ->
	console.log "
		#{str}
		#{colors.green(str2)} 
		#{colors.grey(str3)}
	"

_CoffeeConsole = (err)->
	console.log "
		#{colors.red('ERROR')}::#{colors.green('CoffeeScript')} #{colors.blue(err.message)}\r\n
		#{colors.gray(err.stack)}
	"

_SASSConsole = (err)->
	console.log "
		#{colors.red('ERROR')}::#{colors.green('SASS')} #{colors.blue(err.message)}\r\n
		#{colors.grey('File:')} #{colors.grey(err.fileName)} #{colors.grey(', line')} #{colors.grey(err.lineNumber)}
	"

_includedHTMLConsole = (err)->
	console.log err

# -----------------------------------------------------------------------------
# TASKS
# -----------------------------------------------------------------------------

writeLog = (element, type, str) ->
	using.write = (options) ->
		g = global.process
		date = new Date()
		getDate = (_d) ->
			return "
			#{if date.getDay() < 10 then '0'+date.getDay() else date.getDay()}.
			#{if date.getMonth() < 10 then '0'+(date.getMonth()+1) else date.getMonth()+1}.
			#{date.getFullYear()}
		"
		getTime = (_d) ->
			return "
			#{if date.getHours() < 10 then '0'+date.getHours() else date.getHours()}:
			#{if date.getMinutes() < 10 then '0'+date.getMinutes() else date.getMinutes()}:
			#{if date.getSeconds() < 10 then '0'+date.getSeconds() else date.getSeconds()}
		"
		if type is 'file'
			d = "
				[#{getTime date}]
			"
			map (file, cb) ->
				f = file.path.replace(file.cwd, '.')
				d += " !! #{f}"
				fs.appendFile 'project_log.txt', "#{d}\r\n"
		else
			d = "
			\r\n\r\n#################################################################
			\r\nGulp.js started at #{getDate date} :: #{getTime date}
			\r\n-----------------------------------------------------------------
			\r\nUSER       #{g.env.USERNAME}
			\r\nOS         #{g.env.OS}
			\r\nPLATFORM   #{g.platform}
			\r\nnode -v    #{g.versions.node}
			\r\nv8 -v      #{g.versions.v8}
			\r\n#################################################################
			"
			fs.appendFile 'project_log.txt', "#{d}\r\n"

	if type is 'file'
		element
				.pipe do using.write
	else
		do using.write

writeLog gulp.src(PATH), 'start'

# create localhost:1111
gulp.task '  Connection', ->
	connect.server
		host: 			OPTIONS.serverHost
		port: 			OPTIONS.serverPort
		livereload: OPTIONS.serverLivereload
		root: 			[PATH+'dist',PATH+'dev-tools',PATH+'scss']

# TASK:: coffeescript
gulp.task 'CoffeeScript', ->
	log = gulp.src PATH+'coffee/*coffee'
	writeLog log, 'file'
	log
		.pipe plumber
			errorHandler: (err)->
				_CoffeeConsole err
		.pipe do fileinclude
	if OPTIONS.coffeeWraping is true
		log
			.pipe coffee
				bare: true
			.pipe gulp.dest PATH+'dist/js'
	else
		log
			.pipe do coffee
			.pipe gulp.dest PATH+'dist/js'
	log
		.pipe do connect.reload
	log = gulp.src PATH+'dev-tools/dev-tools-js/coffee/*coffee'
	writeLog log, 'file'
	log
		.pipe do fileinclude
		.pipe coffee
			bare: true
		.pipe gulp.dest PATH+'dev-tools/dev-tools-js/'
		.pipe do connect.reload

# sass
gulp.task '        SASS', ->
	log = gulp.src PATH+'scss/*.scss'
	writeLog log, 'file'
	log
		.pipe plumber
			errorHandler: (err)->
				_SASSConsole err
		.pipe do sass
		.pipe gulp.dest PATH+'dist/css/full'
		.pipe do cssmin
		.pipe rename
			suffix: '.min'
		.pipe gulp.dest PATH+'dist/css'
		.pipe do connect.reload
	log = gulp.src PATH+'dev-tools/dev-tools-css/scss/*.scss'
	writeLog log, 'file'
	log.pipe do sass
		.pipe gulp.dest PATH+'dev-tools/dev-tools-css/'
		.pipe do cssmin
		.pipe do connect.reload

# html-including
gulp.task 'IncludedHTML', ->
	log = gulp.src PATH+'html/*.html'
	writeLog log, 'file'
	log
		.pipe plumber
			errorHandler: (err)->
				# _includedHTMLConsole err
		.pipe do fileinclude
		.pipe gulp.dest PATH+'dist/'
		.pipe do connect.reload

# autosave *.css
gulp.task '         CSS', ->
	log = gulp.src PATH+'dist/css/*.css'
	writeLog log, 'file'
	log.pipe do connect.reload

# autosave *.html
gulp.task '        HTML', ->
	log = gulp.src PATH+'dist/*.html'
	writeLog log, 'file'
	log
		.pipe do plumber
		.pipe do connect.reload

# autosave *.html
gulp.task '  Javascript', ->
	log = gulp.src PATH+'dist/js/*.js'
	writeLog log, 'file'
	log.pipe do connect.reload

# filelist
gulp.task ' ListOfFiles', ->
	log = gulp.src PATH+'list.json'
	writeLog log, 'file'
	log.pipe do clean
	gulp.src [
			PATH+'dist/*html',
			PATH+'dist/*txt',
			PATH+'dist/*json',
			PATH+'dist/css/**/*css',
			PATH+'dist/js/**/*js'
		]
		.pipe filelist 'list.json'
		.pipe gulp.dest PATH+'dev-tools/'

# autoreload localhost
gulp.task ' WatchModule', ->
	gulp.watch PATH+'coffee/*coffee', 			['CoffeeScript']
	gulp.watch PATH+'coffee/*/*coffee',		['CoffeeScript']
	gulp.watch PATH+'dev-tools/*/*/*coffee',	['CoffeeScript']
	gulp.watch PATH+'scss/*.scss', 			['        SASS']
	gulp.watch PATH+'scss/*/*scss', 			['        SASS']
	gulp.watch PATH+'dev-tools/*/*/*scss', 	['        SASS']
	gulp.watch PATH+'dist/*html', 				['        HTML']
	gulp.watch PATH+'html/*html', 				['IncludedHTML']
	gulp.watch PATH+'html/includes/*html', 	['IncludedHTML']
	gulp.watch PATH+'dist/css/*css', 			['         CSS']
	gulp.watch PATH+'dist/js/*js', 			['  Javascript']
	gulp.watch PATH+'dist/**/*', 				[' ListOfFiles']

#  ----------------------------------------------------------------------------
# MAIN TASK
# -----------------------------------------------------------------------------

# main task
gulp.task 'default', [
	'CoffeeScript'
	' WatchModule'
	'  Connection'
	'        SASS'
	'        HTML'
	'IncludedHTML'
	'         CSS'
	'  Javascript'
	' ListOfFiles'
]