config = ''
list = []

Ajax = (url, callback)->
	request = new XMLHttpRequest()
	try
		request = new XMLHttpRequest()
	catch e
		try
			request = new ActiveXObject("Msxml2.XMLHTTP")
		catch e
			try
				request = new ActiveXObject("Microsoft.XMLHTTP")
			catch e
			return false

	request.onreadystatechange = ->
		if request.readyState is 4
			callback request.responseText

	request.open "GET", url, true
	request.send()

###
-------------------------------------------------------------
###

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

parseSubstring = (str1, str2)->
	cache = config.match(new RegExp(str1+"(.+?)"+str2, "g"))
	if str1 isnt '\\\$grid_calc:'
		cache2 = cache[0].replace(/(\s|\t|\n|\r)/gim, '').substr str1.length-1
	else
		cache2 = cache[0].replace(/(\(|\))/gim, '').substr str1.length-1
	cache = cache2.substr 0, cache2.length-str2.length
	cache

element = (elem, id, text, clas)->
	ele = document.createElement elem
	ele.setAttribute 'id', id
	ele.setAttribute 'class', clas
	ele.innerHTML = text
	ele

# --------------------------------------------------------
# FILES WATCHER
# --------------------------------------------------------

jsFiles = []
cssFiles = []
otherFiles = []

createList = (arr, nameClass, name, path)->
	returned = "<ul class='adk-filelist-ul #{nameClass}'><li>#{name}<b>#{arr.length}</b></li>"
	for f in arr
		returned += "<li><a href='#{f}' target='_blank'>#{parsePath f}</a></li>"
	returned += "</ul>"
	returned

filelistWrapper = document.createElement 'div'
filelistWrapper.setAttribute 'class', 'adk-fileslist-wrapper'

filelist = document.createElement 'div'
filelist.setAttribute 'class', 'adk-fileslist'

# <a href='#' id='ADKresizeFilelist' class='adk-window-place'><i class='icon'></i></a>
res = "<div class='filelist-header'>
	<span>
		<a href='#' id='ADKshowAll' class='active'><i class='icon icon-folder'></i>all</a>
		<a href='#' id='ADKshowJs'><i class='icon icon-js'></i>javascript</a>
		<a href='#' id='ADKshowCss'><i class='icon icon-css'></i>css</a>
		<a href='#' id='ADKshowRoot'><i class='icon icon-html'></i>root</a>
	</span>
	</div>"
filelistWrapper.innerHTML = res
res = ""

filelistWrapper.appendChild filelist
document.body.appendChild filelistWrapper

Ajax 'list.json', (data)->

	files = JSON.parse(data)
	for file in files
		str = renameStr file
		if str.match /js\//gim
			jsFiles.push str
		else if str.match /css\//gim
			cssFiles.push str
		else otherFiles.push str

	jsFiles.sort sortingFunction
	cssFiles.sort sortingFunction

	res += createList otherFiles, 'adk-otherfilelist', 'Root', '/'
	res += createList cssFiles, 'adk-cssfilelist', 'CSS', 'css/'
	res += createList jsFiles, 'adk-jsfilelist', 'Javascript', 'js/'

	filelist.innerHTML = res

bind 'ADKshowRoot', (e)->
	e = e || window.event; e.preventDefault(); do showAllCategories
	classNames '.adk-jsfilelist, .adk-cssfilelist', 'add', 'disabled'
	classNames '#ADKshowRoot', 'add', 'active'

bind 'ADKshowJs', (e)->
	e = e || window.event; e.preventDefault(); do showAllCategories
	classNames '.adk-otherfilelist, .adk-cssfilelist', 'add', 'disabled'
	classNames '#ADKshowJs', 'add', 'active'

bind 'ADKshowCss', (e)->
	e = e || window.event; e.preventDefault(); do showAllCategories
	classNames '.adk-jsfilelist, .adk-otherfilelist', 'add', 'disabled'
	classNames '#ADKshowCss', 'add', 'active'

bind 'ADKshowAll', (e)->
	e = e || window.event; e.preventDefault(); do showAllCategories
	classNames '#ADKshowAll', 'add', 'active'

# --------------------------------------------------------
# GRID
# --------------------------------------------------------

Grid =
	width: 				0
	height: 			0
	gutter: 			0
	gridCalc: 		''
	columns: 			0
	columnWidth: 	0

updateGridElements = ->
	gridWrapper.style.height = '0px'
	gridWrapper.style.height = document.body.scrollHeight+'px'
	if document.body.clientWidth > parseSubstring '\\\$primary_grid:', ';'
		w = parseSubstring '\\\$primary_grid:', ';'
	else w = document.body.clientWidth
	Elements[0].innerHTML = "<b><i class='icon icon-border_all'></i>Grid</b>#{w}"
	Elements[1].innerHTML = "<b><i class='icon icon-format_align_justify'></i>Line height</b>#{Grid.height}"
	Elements[2].innerHTML = "<b><i class='icon icon-border_left'></i>Gutter</b>#{Grid.gutter}"
	Elements[3].innerHTML = "<b><i class='icon icon-view_comfortable'></i>Grid calc</b>#{Grid.gridCalc}"
	Elements[4].innerHTML = "<b><i class='icon icon-border_inner'></i>Cols</b>#{Grid.columns[Grid.columns.length-1]}"
	Elements[5].innerHTML = "<b><i class='icon icon-border_outer'></i>Col width</b>#{(w / Grid.columns[Grid.columns.length-1]).toFixed(1)}"
	Grid.columnWidth = w / Grid.columns[Grid.columns.length-1]
	console.log 'ADK -> Grid information has been updated'

gridWrapper = element 'div', '', '', 'adk-grid-wrapper'
gridInfoWrapper = element 'div', '', '', 'adk-gridinfo-wrapper'

document.body.appendChild gridWrapper
gridWrapper.style.height = document.body.scrollHeight+'px'

Elements = [
	element 'div', 'gridWidthElement', 0, ''
	element 'div', 'gridHeightElement', 0, ''
	element 'div', 'gridGutterElement', 0, ''
	element 'div', 'gridCalcElement', 0, ''
	element 'div', 'gridColumnsElement', 0, ''
	element 'div', 'gridColumnWidthElement', 0, ''
]

gridCanvas = element 'canvas', 'ADKGridCanvas', '', 'adk-grid-canvas'
gridCanvasCtx = null

drawLine = (x1,y1,x2,y2,type)->
	gridCanvasCtx.beginPath()
	if type is 'row'
		gridCanvasCtx.lineWidth = Grid.height
		gridCanvasCtx.strokeStyle = "rgba(31, 37, 61, 0.4)"
		gridCanvasCtx.moveTo x1, y1+Grid.height/2
		gridCanvasCtx.lineTo x2, y2+Grid.height/2
	else
		if document.body.clientWidth > Grid.width
			offset = (document.body.clientWidth - Grid.width)/2
		else offset = 0
		gridCanvasCtx.lineWidth = Grid.columnWidth-Grid.gutter*2
		gridCanvasCtx.strokeStyle = "rgba(31, 37, 61, 0.4)"
		gridCanvasCtx.moveTo x1-Grid.columnWidth/2+offset, y1
		gridCanvasCtx.lineTo x2-Grid.columnWidth/2+offset, y2
	gridCanvasCtx.stroke()

drawGrid = ->
	gridCanvas.width = gridWrapper.clientWidth
	gridCanvas.height = gridWrapper.clientHeight
	gridCanvasCtx.clearRect 0, 0, gridCanvas.width, gridCanvas.height
	for i in [0...gridWrapper.clientHeight/Grid.height]
		if i%2 is 1
			drawLine 0, i*Grid.height, gridWrapper.clientWidth, i*Grid.height, 'row'
	for i in [1...Grid.columns.length]
		drawLine i*Grid.columnWidth, 0, i*Grid.columnWidth, gridWrapper.clientHeight, 'col'

Ajax '_config.scss', (data)->
	config = data
	Grid.width = 				parseSubstring '\\\$primary_grid:', ';'
	Grid.height = 			parseSubstring '\\\$grid_line_height:', 'px;'
	Grid.gutter = 			parseSubstring '\\\$gutter:', 'px;'
	Grid.gridCalc = 		parseSubstring '\\\$grid_calc:', ';'
	Grid.columns = 			(parseSubstring '\\\$grid_calc:', ';').split(' ')
	Grid.columnWidth = 	0

	gridWrapper.appendChild gridCanvas

	for elem in Elements
		gridInfoWrapper.appendChild elem
	gridWrapper.appendChild gridInfoWrapper

	do updateGridElements


	gridCanvasCtx = gridCanvas.getContext "2d"

	do drawGrid

window.addEventListener 'resize', ->
	if adkGrid.style.display is 'block'
		do updateGridElements
		do drawGrid














































adkFilelist = document.getElementsByClassName('adk-fileslist-wrapper')[0]
adkGrid = document.getElementsByClassName('adk-grid-wrapper')[0]
document.onkeydown = (event) ->
	if event.keyCode is 49
		adkGrid.style.display = ''
		adkFilelist.classList.toggle 'active'
	if event.keyCode is 50
		adkFilelist.classList.remove 'active'
		do updateGridElements
		if adkGrid.style.display is 'block'
			adkGrid.style.display = ''
		else adkGrid.style.display = 'block'
		do drawGrid
	return























# document.onkeyup = ->
# 	document.body.style.overflow = ''
# 	document.getElementsByClassName('adk-fileslist-wrapper')[0]
# 		.classList.remove 'active'