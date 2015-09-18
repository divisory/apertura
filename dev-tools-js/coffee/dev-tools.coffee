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


classNames = (str, type, clas)->
	elements = str.split ','
	for element in elements
		if type is 'add'
			document.querySelector(element).classList.add clas
		else
			document.querySelector(element).classList.remove clas

showAllCategoriesButtons = ->
	classNames '#ADKshowRoot, #ADKshowJs, #ADKshowCss, #ADKshowAll', 'remove', 'active'

showAllCategories = ->
	do showAllCategoriesButtons
	classNames '.adk-otherfilelist, .adk-cssfilelist, .adk-jsfilelist', 'remove', 'disabled'


sortingFunction = (a,b)->
	A = a.match /\//gim
	B = b.match /\//gim
	if A.length > B.length
		return -1
	else if A.length < B.length
		return 1
	else return 0

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
		jsFiles.push str
	else if str.match /css\//gim
		cssFiles.push str
	else otherFiles.push str

jsFiles.sort sortingFunction
cssFiles.sort sortingFunction

filelistWrapper = document.createElement 'div'
filelistWrapper.setAttribute 'class', 'adk-fileslist-wrapper'

filelist = document.createElement 'div'
filelist.setAttribute 'class', 'adk-fileslist'

createList = (arr, nameClass, name, path)->
	returned = "<ul class='adk-filelist-ul #{nameClass}'><li>#{name}</li>"
	for f in arr
		returned += "<li><a href='#{f}' target='_blank'>#{parsePath f}</a></li>"
	returned += "</ul>"
	returned


res = "<div class='filelist-header'>
	Filelist
	<span>
		<a href='#' id='ADKresizeFilelist' class='adk-window-place'><i class='icon'></i></a>
		<a href='#' id='ADKshowAll' class='active'><i class='icon icon-folder'></i>all</a>
		<a href='#' id='ADKshowJs'><i class='icon icon-js'></i>javascript</a>
		<a href='#' id='ADKshowCss'><i class='icon icon-css'></i>css</a>
		<a href='#' id='ADKshowRoot'><i class='icon icon-html'></i>root</a>
	</span>
	</div>"
filelistWrapper.innerHTML = res

res = ""

res += createList otherFiles, 'adk-otherfilelist', 'Root', '/'
res += createList cssFiles, 'adk-cssfilelist', 'CSS', 'css/'
res += createList jsFiles, 'adk-jsfilelist', 'Javascript', 'js/'

filelist.innerHTML = res
filelistWrapper.appendChild filelist
document.body.appendChild filelistWrapper



bind 'ADKshowRoot', (e)->
	e = event || window.event; e.preventDefault(); do showAllCategories
	classNames '.adk-jsfilelist, .adk-cssfilelist', 'add', 'disabled'
	classNames '#ADKshowRoot', 'add', 'active'

bind 'ADKshowJs', (e)->
	e = event || window.event; e.preventDefault(); do showAllCategories
	classNames '.adk-otherfilelist, .adk-cssfilelist', 'add', 'disabled'
	classNames '#ADKshowJs', 'add', 'active'

bind 'ADKshowCss', (e)->
	e = event || window.event; e.preventDefault(); do showAllCategories
	classNames '.adk-jsfilelist, .adk-otherfilelist', 'add', 'disabled'
	classNames '#ADKshowCss', 'add', 'active'

bind 'ADKshowAll', (e)->
	e = event || window.event; e.preventDefault(); do showAllCategories
	classNames '#ADKshowAll', 'add', 'active'

bind 'ADKresizeFilelist', (e)->
	e = event || window.event; e.preventDefault();
	filelistWrapper.classList.toggle 'bottom-place'
# adkFilelist = document.getElementsByClassName('adk-fileslist')[0]

# stopWheel = (e) ->
# 	e = window.event  unless e
# 	e.preventDefault()  if e.preventDefault
# 	e.returnValue = false

# adkFilelist.addEventListener "mousewheel", (e)->
# 	delta = e.deltaY or e.detail or e.wheelDelta
# 	if delta < 0 then adkFilelist.scrollTop -= 50 else adkFilelist.scrollTop += 50
# , true


# adkFilelist.addEventListener 'mouseover', ->
# 	document.body.onmousewheel = (e)->
# 		stopWheel()

# adkFilelist.addEventListener 'mouseout', ->
# 	document.body.onmousewheel = null













document.onkeydown = (event) ->
	if event.keyCode is 49
		adkFilelist = document.getElementsByClassName('adk-fileslist-wrapper')[0]
		adkFilelist.classList.toggle 'active'
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

# document.onkeyup = ->
# 	document.body.style.overflow = ''
# 	document.getElementsByClassName('adk-fileslist-wrapper')[0]
# 		.classList.remove 'active'