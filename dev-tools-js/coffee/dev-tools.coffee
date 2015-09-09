renameHref = (str) ->
	str = str.replace /\\/gim, '/'
	return '/' + str.substring str.indexOf('dist')+5

renameStr = (str) ->
	return str.substring str.indexOf('dist')+5

parsePath = (path)->
	folder = path
		.replace /(.+?\/)/gim, '<b>$1</b>'
		.replace /(\.[0-9a-z]+$)/gim, '<i>$1</i>'

bind = (element, handler)->
	document.getElementById element
		.addEventListener 'click', handler

showAllCategories = ->
	document.querySelector('.adk-otherfilelist').classList.remove 'disabled'
	document.querySelector('.adk-cssfilelist').classList.remove 'disabled'
	document.querySelector('.adk-jsfilelist').classList.remove 'disabled'

# --------------------------------------------------------
# FILES WATCHER
# --------------------------------------------------------

# el.classList = 
# {
# length: number, 
# add: function() {},
# contains: function() {},
# item: function() {},
# remove: function() {},
# toggle: function() {}
# }

files =
#=require '../../list.json'

config = "
#=require '../../../scss/_config.scss'
"
jsFiles = []
cssFiles = []
otherFiles = []

for file in files
	str = renameStr file
	if str.match /js\//gim
		jsFiles.push str.replace /js\//gim, ''
	else if str.match /css\//gim
		cssFiles.push str.replace /css\//gim, ''
	else otherFiles.push str

filelistWrapper = document.createElement 'div'
filelistWrapper.setAttribute 'class', 'adk-fileslist-wrapper'

filelist = document.createElement 'div'
filelist.setAttribute 'class', 'adk-fileslist'

createList = (arr, nameClass, name, path)->
	returned = "<ul class='adk-filelist-ul #{nameClass}'><li>#{name}</li>"
	for f in arr
		returned += "<li><a href='#{path}#{f}' target='_blank'>#{parsePath f}</a></li>"
	returned += "</ul>"
	returned


res = "<div class='filelist-header'>
	Filelist
	<span>
		<i class='icon icon-cog'></i>
		<a href='#' id='showAll'><i class='icon icon-folder'></i>all</a>
		<hr>
		<a href='#' id='showJs'><i class='icon icon-js'></i>javascript</a>
		<a href='#' id='showCss'><i class='icon icon-css'></i>css</a>
		<a href='#' id='showRoot'><i class='icon icon-html'></i>root</a>
	</span>
	</div>"

res += createList jsFiles, 'adk-jsfilelist', 'Javascript', 'js/'
res += createList cssFiles, 'adk-cssfilelist', 'CSS', 'css/'
res += createList otherFiles, 'adk-otherfilelist', 'Root', '/'

filelist.innerHTML = res
filelistWrapper.appendChild filelist
document.body.appendChild filelistWrapper

bind 'showRoot', (e)->
	e = event || window.event; e.preventDefault()
	do showAllCategories
	document.querySelector('.adk-jsfilelist').classList.add 'disabled'
	document.querySelector('.adk-cssfilelist').classList.add 'disabled'

bind 'showJs', (e)->
	e = event || window.event; e.preventDefault()
	do showAllCategories
	document.querySelector('.adk-otherfilelist').classList.add 'disabled'
	document.querySelector('.adk-cssfilelist').classList.add 'disabled'

bind 'showCss', (e)->
	e = event || window.event; e.preventDefault()
	do showAllCategories
	document.querySelector('.adk-jsfilelist').classList.add 'disabled'
	document.querySelector('.adk-otherfilelist').classList.add 'disabled'

bind 'showAll', (e)->
	e = event || window.event; e.preventDefault()
	do showAllCategories






















document.onkeydown = (event) ->
	if event.keyCode is 49
		document.body.style.overflow = 'hidden'
		document.getElementsByClassName('adk-fileslist-wrapper')[0]
			.classList.add 'active'
	# if event.keyCode is 50
	# 	grid = select '#dev-grid-block'
	# 	grid.style.display = 'block'
	# 	gridV = select '#dev-grid-block-vertical'
	# 	gridV.style.display = 'block'
	# if event.keyCode is 51
	# 	grid = select '#dev-pixel-perfect'
	# 	grid.style.display = 'block'
	# 	select '#dev-tools-pixel-input'
	# 		.focus()
	return

document.onkeyup = ->
	document.body.style.overflow = ''
	document.getElementsByClassName('adk-fileslist-wrapper')[0]
		.classList.remove 'active'