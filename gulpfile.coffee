# ===============================================================
# 							GULPFILE.COFFEE BY INKOR | 11.12.2014
# EN===========================================================EN
#
# 														STRUCTURE
#
# - PATH 			: The variable of PAHT contains path to all files
# 							and folders. Current - the folder, wich conains
# 							[gulpfile.coffee]
#
# - OPTIONS 	: The OPTIONS object contains settings for this
# 							file.
#
# - MODULES 	: This block for including gulp modules for you
# 							work. All modules must be installed.
#
# - TASKS 		: This block contains all tasks for you project.
#
# - WATCH 		: This task watching changes of files and gives
# 							commands to compillators to compile you files.
#
# - MAIN TASK : This task contains all tasks.
#
# RU===========================================================RU
#
# 														СТРУКТУРА
#
# - PATH 			: Переменная PAHT содержит относительный путь
# 							к корневой папке. Корень проектка - папка с
# 							[gulpfile.coffee]
#
# - OPTIONS 	: Объект, содержит в себе настройки для этого
# 							файла.
#
# - MODULES 	: Блок подключения модулей. Здесь происходит
# 							подключение необходимых для работы модулей.
#
# - TASKS 		: Блок с "тасками". Функци обработки задач.
#
# - WATCH 		: Задача этого таска - отслеживание ищменений в
# 							указаных директориях. И выполнять действия,
# 							которые указаны в случае изменения файла.
#
# - MAIN TASK : Главный таск. Он выполняет роль дерижера, и
# 							указывает каждому таску, что ему нужно делать.
#
# ===============================================================

# ---------------------------------------------------------------
# PATH
# -------------------------------------------------------------EN
# path for current project
# by default - ''
# can be '../../' or 'myfolder/'
# -------------------------------------------------------------RU
# Корневая папка с проектом.
# По умолчанию текущая папка, - ''
# Это может быть '../../' или 'myfolder/'
PATH 			= ''

# ---------------------------------------------------------------
# OPTIONS
# -------------------------------------------------------------EN
# .serverHost					hostname, adress of your project
#	.serverPort					server port
#	.serverLivereload		page live reloading
#	.coffeeWraping 			wrapping each file into anonymous function
# 										by default: 
#											+----------------------------------------+
# 										1	(function(){
#											2		your code here
#											3	});
#											+----------------------------------------+
# 										if it's off: 
#											+----------------------------------------+
#											1		your code here
#											+----------------------------------------+
#
# -------------------------------------------------------------RU
# .serverHost					имя хоста
#	.serverPort					порт
#	.serverLivereload		автоматическое обновление страницы
#	.coffeeWraping 			обертывание в анонимную функцию при
#											компиляции
# 										поумолчанию: 
#											+----------------------------------------+
# 										1	(function(){
#											2		код здесь
#											3	});
#											+----------------------------------------+
# 										если выключено: 
#											+----------------------------------------+
#											1	код здесь
#											+----------------------------------------+
OPTIONS 	=
	serverHost: 				'localhost'
	serverPort: 				1111
	serverLivereload: 	on
	coffeeWraping: 			false

# -------------------------------------------------------------
# MODULES
# -------------------------------------------------------------

# --- EN
# Filesystem manipulations. Reading, changing, creating
# files list in list.json (./dev-tools/list.json)
# --- RU
# Манипуляции с файловой системой. Чтение, запись, создание
# списка файлов в list.json (./dev-tools/list.json)
# * https://nodejs.org/api/fs.html *
fs 					= require 'fs'

# Gulp.js
# * https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md *
gulp 				= require 'gulp'

# --- EN
# Server module
# --- RU
# Модуль сервера
# * https://www.npmjs.com/package/gulp-connect *
connect 		= require 'gulp-connect'

# --- EN
# Coffeescript compilation
# --- RU
# Компиляция Coffeescript
# * https://www.npmjs.com/package/gulp-coffee *
coffee 			= require 'gulp-coffee'

# --- EN
# Cleaning temp files
# --- RU
# Очистка ненужных файлов
# * https://www.npmjs.com/package/gulp-clean *
clean 			= require 'gulp-clean'

# --- EN
# SASS compilation
# --- RU
# Компиляция SASS
# * https://www.npmjs.com/package/gulp-sass *
sass 				= require 'gulp-sass'

# --- EN
# Colors module
# --- RU
# Модуль цветов
# * https://github.com/marak/colors.js/ *
colors 			= require 'colors'

# --- EN
# Files includes
# --- RU
# Вставка файлов
# * https://www.npmjs.com/package/gulp-include *
fileinclude = require 'gulp-include'

# --- EN
# CSS minification
# --- RU
# Минификация CSS
# * https://www.npmjs.com/package/gulp-cssmin *
cssmin 			= require 'gulp-cssmin'

# --- EN
# Rename files
# --- RU
# Переименование файлов
# * https://www.npmjs.com/package/gulp-rename *
rename 			= require 'gulp-rename'

# --- EN
# Files list in list.json
# --- RU
# Список файлов в list.json
# * https://www.npmjs.com/package/gulp-filelist *
filelist 		= require 'gulp-filelist'

# --- EN
# Logging in project_log.txt
# --- RU
# Логирование в project_log.txt
# * https://www.npmjs.com/package/gulp-using *
using 			= require 'gulp-using'

# --- EN
# Checking files in current task
# --- RU
# Вывод список файлов в текущем таске
# * https://www.npmjs.com/package/map-stream *
map 				= require 'map-stream'

# --- EN
# Gulp.js crashes preventing
# --- RU
# Предотвращение крашей Gulp.js при возникновении ошибки
# * https://www.npmjs.com/package/gulp-plumber *
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


writeLog = (element, type, str) ->
	using.write = (options) ->
		g = global.process
		date = new Date()
		getDate = (_d) ->
			return "
			#{if date.getDay() < 10 then '0'+date.getDay() else date.getDay()}.#{if date.getMonth() < 10 then '0'+(date.getMonth()+1) else date.getMonth()+1}.#{date.getFullYear()}
		"
		getTime = (_d) ->
			return "
			#{if date.getHours() < 10 then '0'+date.getHours() else date.getHours()}:#{if date.getMinutes() < 10 then '0'+date.getMinutes() else date.getMinutes()}:#{if date.getSeconds() < 10 then '0'+date.getSeconds() else date.getSeconds()}
		"
		if type is 'file'
			d = "
				[#{getTime date}]
			"
			i = 0
			map (file, cb) ->
				f = file.path.replace(file.cwd, '.')
				if i is 0
					d += " #{f}"
				else
					d += "\r\n           #{f}"
				fs.appendFile 'project_log.txt', "#{d}\r\n"
				# console.log i
				i++
		else
			d = "
			\r\n\r\n#################################################################
			\r\nGulp.js started at #{getDate date} :: #{getTime date}
			\r\n-----------------------------------------------------------------
			\r\nUSER       #{if g.env.USERNAME is undefined then g.env.USER else g.env.USERNAME}
			\r\nOS         #{if g.env.OS is undefined then g.env.DESKTOP_SESSION else g.env.OS}
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

# -----------------------------------------------------------------------------
# TASKS
# -----------------------------------------------------------------------------

# create localhost:1111
gulp.task 'connect', ->
	connect.server
		host: 			OPTIONS.serverHost
		port: 			OPTIONS.serverPort
		livereload: OPTIONS.serverLivereload
		root: 			[PATH+'dist',PATH+'dev-tools',PATH+'scss']

# TASK:: coffeescript
gulp.task ' coffee', ->
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
gulp.task '   sass', ->
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
gulp.task 'IncHTML', ->
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
gulp.task '    css', ->
	log = gulp.src PATH+'dist/css/*.css'
	writeLog log, 'file'
	log.pipe do connect.reload

# autosave *.html
gulp.task '   HTML', ->
	log = gulp.src PATH+'dist/*.html'
	writeLog log, 'file'
	log
		.pipe do plumber
		.pipe do connect.reload

# autosave *.js
gulp.task '     Js', ->
	log = gulp.src PATH+'dist/js/*.js'
	writeLog log, 'file'
	log.pipe do connect.reload

# filelist
gulp.task '   list', ->
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
gulp.task '  watch', ->
	gulp.watch PATH+'coffee/*coffee', 				[' coffee']
	gulp.watch PATH+'coffee/*/*coffee',				[' coffee']
	gulp.watch PATH+'dev-tools/*/*/*coffee',	[' coffee']
	gulp.watch PATH+'scss/*.scss', 						['   sass']
	gulp.watch PATH+'scss/*/*scss', 					['   sass']
	gulp.watch PATH+'dev-tools/*/*/*scss', 		['   sass']
	gulp.watch PATH+'dist/*html', 						['   HTML']
	gulp.watch PATH+'html/*html', 						['IncHTML']
	gulp.watch PATH+'html/includes/*html', 		['IncHTML']
	gulp.watch PATH+'dist/css/*css', 					['    css']
	gulp.watch PATH+'dist/js/*js', 						['     Js']
	gulp.watch PATH+'dist/**/*', 							['   list']

#  ----------------------------------------------------------------------------
# MAIN TASK
# -----------------------------------------------------------------------------

# main task
gulp.task 'default', [
	' coffee'
	'  watch'
	'connect'
	'   sass'
	'   HTML'
	'IncHTML'
	'    css'
	'     Js'
	'   list'
]