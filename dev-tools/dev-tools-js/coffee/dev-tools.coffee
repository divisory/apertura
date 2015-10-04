config = ''
list = []

document.addEventListener "DOMContentLoaded", (event)->
	link = document.createElement 'link'
	link.setAttribute 'rel', "stylesheet"
	link.setAttribute 'href', "dev-tools-css/dev-tools-skin.css"
	document.body.appendChild link

Ajax = (url, callback, onerror)->
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
		if request.status is 200
			if request.readyState is 4
				callback request.responseText, request
		else if onerror
			onerror request

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
	console.log 'ADK :: GridHightlighter -> Grid information has been updated'

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


# --------------------------------------------------------
# PERFECT PIXEL
# --------------------------------------------------------

opacity = 40

pixelPerfectWrapper = element 'div', 'pixelPerfectWrapper', '', 'pixel-perfect-wrapper'
document.body.appendChild pixelPerfectWrapper
pixelPerfectImage = element 'img', 'pixelPerfectImage', '', 'adk-pixelperfect-image'
pixelPerfectWrapper.appendChild pixelPerfectImage

pushPixelPerfectImage = (resolution)->
	Ajax "dev-tools-templates/_#{resolution}.jpg", (data, req)->
		if req.status is 200
			pixelPerfectImage.src = req.responseURL
		else
			console.log 'ADK :: PerfectPixel -> The \'JPG\'-file not found. Sending request for \'PNG\'-file...'
			Ajax "dev-tools-templates/_#{resolution}.png", (data, req)->
				if req.status is 200
					pixelPerfectImage.src = req.responseURL
					console.log 'ADK :: PerfectPixel -> \'PNG\'-file loaded [OK]'
				else console.log 'ADK :: PerfectPixel -> Error. Image not found.'
	, (req)->
		console.log req.status


pixelPerfectInfo = element 'div', 'pixelPerfectInfo', '', 'adk-pixelperfect-info'
pixelPerfectWrapper.appendChild pixelPerfectInfo

pixelPerfectInput = element 'input', 'pixelPerfectInput', '', 'adk-pixelperfect-input'
pixelPerfectText = element 'div', 'pixelPerfectText', '<i class="icon icon-image"></i>', 'adk-pixel-perfect-text'
pixelPerfectBar = element 'div', 'pixelPerfectBar', '', 'adk-pixelperfect-bar'
pixelPerfectBarInner = element 'div', 'pixelPerfectBarInner', '', 'adk-pixelperfect-bar-inner'

pixelPerfectBar.appendChild pixelPerfectBarInner
pixelPerfectInfo.appendChild pixelPerfectInput
pixelPerfectInfo.appendChild pixelPerfectText
pixelPerfectInfo.appendChild pixelPerfectBar

insertPerfectBar = ->
	pixelPerfectText.setAttribute 'data-precent', opacity
	pixelPerfectImage.style.opacity = opacity/100
	pixelPerfectBarInner.style.width = opacity+'%'

do insertPerfectBar

findoutRect = ->
	obj = {}
	obj.iW 	= window.innerWidth
	obj.oW 	= window.outerWidth
	obj.iH 	= window.innerHeight
	obj.oH 	= window.outerHeight
	obj

pushImage = ->
	rect = findoutRect()
	width = if rect.oW > rect.iW then rect.iW else rect.oW
	if width <= 350
		pushPixelPerfectImage 320
	else if width <= 540
		pushPixelPerfectImage 480
	else if width <= 760
		pushPixelPerfectImage 640
	else if width <= 800
		pushPixelPerfectImage 768
	else if width <= 1020
		pushPixelPerfectImage 992
	else if width <= 1100
		pushPixelPerfectImage 1024
	else if width <= 1260
		pushPixelPerfectImage 1200
	else if width <= 1300
		pushPixelPerfectImage 1280
	else if width <= 1480
		pushPixelPerfectImage 1400
	else if width <= 1650
		pushPixelPerfectImage 1600
	else pushPixelPerfectImage 1920

do pushImage

# --------------------------------------------------------
# LINES
# --------------------------------------------------------

lines = {}
lines.wrap = element 'div', 'ADKLinesWrapper', '', 'adk-lines-wrapper'
lines.x = element 'div', 'ADKLineX', '', 'adk-line-x'
lines.y = element 'div', 'ADKLineY', '', 'adk-line-y'
lines.win = element 'div', 'ADKWindow', '', 'adk-line-window'

lines.wrap.appendChild lines.x
lines.wrap.appendChild lines.y
lines.wrap.appendChild lines.win
document.body.appendChild lines.wrap

setWindowSizes = ->
	rect = document.body.getBoundingClientRect()
	lines.win.innerHTML = '<span><i class="icon icon-display"></i>'+rect.width+'x'+rect.height+'</span><span><i class="icon icon-tablet"></i>'+window.outerWidth+'x'+window.outerHeight+'</span>'
do setWindowSizes


lines.wrap.addEventListener 'mousemove', (e)->
	lines.x.setAttribute 'style', "
		-webkit-transform: translate(0,#{e.pageY-document.body.scrollTop}px);
		-moz-transform: translate(0,#{e.pageY-document.body.scrollTop}px);
		-ms-transform: translate(0,#{e.pageY-document.body.scrollTop}px);
		-o-transform: translate(0,#{e.pageY-document.body.scrollTop}px);
		transform: translate(0,#{e.pageY-document.body.scrollTop}px);
	"
	lines.y.setAttribute 'style', "
		-webkit-transform: translate(#{e.pageX-document.body.scrollLeft}px,0);
		-moz-transform: translate(#{e.pageX-document.body.scrollLeft}px,0);
		-ms-transform: translate(#{e.pageX-document.body.scrollLeft}px,0);
		-o-transform: translate(#{e.pageX-document.body.scrollLeft}px,0);
		transform: translate(#{e.pageX-document.body.scrollLeft}px,0);
	"
	lines.x.innerHTML = '<span class="'+(if e.pageX-document.body.scrollLeft <= 200 then 'right' else '')+' '+(if e.pageY-document.body.scrollTop >= window.innerHeight / 2 then 'bottom' else '')+'"><b>'+(e.pageY-document.body.scrollTop)+'</b>, <s>'+document.body.scrollTop+'</s>, <i>'+e.pageY+'</i></span>'
	lines.y.innerHTML = '<span class="'+(if e.pageY-document.body.scrollTop <= 200 then 'bottom' else '')+' '+(if e.pageX-document.body.scrollLeft >= window.innerWidth / 2 then 'right' else '')+'"><b>'+(e.pageX-document.body.scrollLeft)+'</b>, <s>'+document.body.scrollLeft+'</s>, <i>'+e.pageX+'</i></span>'

# --------------------------------------------------------
# INSPECTOR
# --------------------------------------------------------
getPath = (node)->
	`var count`
	`var count`
	`var sibling`
	path = path or []
	if node.parentNode
		path = getPath(node.parentNode, path)
	if node.previousSibling
		count = 1
		sibling = node.previousSibling
		loop
			if sibling.nodeType == 1 and sibling.nodeName == node.nodeName
				count++
			sibling = sibling.previousSibling
			unless sibling
				break
		if count == 1
			count = null
	else if node.nextSibling
		sibling = node.nextSibling
		loop
			if sibling.nodeType == 1 and sibling.nodeName == node.nodeName
				count = 1
				sibling = null
			else
				count = null
				sibling = sibling.previousSibling
			unless sibling
				break
	if node.nodeType == 1 and node.nodeName.toLowerCase() isnt 'html' and node.nodeName.toLowerCase() isnt 'body'
		path.push node.nodeName.toLowerCase() + (
			if node.id
				'<s>#'+node.id+'</s>'
			else if node.classList.toString().length >= 1 and node.nodeName.toLowerCase() isnt 'html'
				'<b>.'+node.classList.toString().replace(/\s/gim, '.')+'</b>'
			else ''
		)
	path

bindHandler = (e)->
	if !e then e = new MouseEvent 'mouseover'
	if e.ctrlKey
		hint = document.createElement 'div'
		hint.setAttribute 'class', 'dev-tools-boxer-hint'
		document.body.appendChild hint
		hint = document.getElementsByClassName('dev-tools-boxer-hint')[0]
		if e.ctrlKey and hint isnt undefined
			e.target.style.opacity = '0.8'
			style = getComputedStyle e.target
			rect = e.target.getBoundingClientRect()
			margin =
				w: rect.width+parseFloat(style.marginLeft)+parseFloat(style.marginRight)
				h: rect.height+parseFloat(style.marginTop)+parseFloat(style.marginBottom)
			hint.setAttribute 'style', "
				top:#{rect.top+rect.height+parseFloat(style.marginBottom)+document.body.scrollTop}px;
				left:#{rect.left+document.body.scrollLeft-parseFloat(style.marginLeft)}px;
				width:#{margin.w}px;
				height:#{margin.h}px;
			"
			border = document.createElement 'div'
			border.setAttribute 'class', 'dev-tools-boxer-hint-border'
			border.setAttribute 'style', "
				top:#{parseFloat(style.marginTop)}px;
				left:#{parseFloat(style.marginLeft)}px;
				width:#{margin.w-parseFloat(style.marginLeft)-parseFloat(style.marginRight)}px;
				height:#{margin.h-parseFloat(style.marginTop)-parseFloat(style.marginBottom)}px;
			"
			padding = document.createElement 'div'
			padding.setAttribute 'class', 'dev-tools-boxer-hint-padding'
			padding.setAttribute 'style', "
				top:#{parseFloat(style.borderTopWidth)}px;
				left:#{parseFloat(style.borderLeftWidth)}px;
				width:#{margin.w-parseFloat(style.marginLeft)-parseFloat(style.marginRight)-parseFloat(style.borderLeftWidth)-parseFloat(style.borderRightWidth)}px;
				height:#{margin.h-parseFloat(style.marginTop)-parseFloat(style.marginBottom)-parseFloat(style.borderTopWidth)-parseFloat(style.borderBottomWidth)}px;
			"
			content = document.createElement 'div'
			content.setAttribute 'class', 'dev-tools-boxer-hint-content'
			content.setAttribute 'style', "
				top:#{parseFloat(style.paddingTop)}px;
				left:#{parseFloat(style.paddingLeft)}px;
				width:#{margin.w-parseFloat(style.marginLeft)-parseFloat(style.marginRight)-parseFloat(style.borderLeftWidth)-parseFloat(style.borderRightWidth)-parseFloat(style.paddingLeft)-parseFloat(style.paddingRight)}px;
				height:#{margin.h-parseFloat(style.marginTop)-parseFloat(style.marginBottom)-parseFloat(style.borderTopWidth)-parseFloat(style.borderBottomWidth)-parseFloat(style.paddingTop)-parseFloat(style.paddingBottom)}px;
			"
			padding.appendChild content
			border.appendChild padding
			hint.appendChild border
			info = document.createElement 'div'
			info.setAttribute 'class', 'dev-tools-boxer-hint-info'
			path = '<b>body</b>'
			for p in getPath e.target
				path += '<i>&gt;</i>'+p.toString()

			info.innerHTML = "
				<div class='dev-tools-info-path'>#{path}</div>
				<div class='dev-tools-info-margin'>
					<span class='t'>#{parseFloat(style.marginTop)}</span>
					<span class='r'>#{parseFloat(style.marginRight)}</span>
					<span class='b'>#{parseFloat(style.marginBottom)}</span>
					<span class='l'>#{parseFloat(style.marginLeft)}</span>
				</div>
				<div class='dev-tools-info-border'>
					<span class='t'>#{parseFloat(style.borderTopWidth)}</span>
					<span class='r'>#{parseFloat(style.borderRightWidth)}</span>
					<span class='b'>#{parseFloat(style.borderBottomWidth)}</span>
					<span class='l'>#{parseFloat(style.borderLeftWidth)}</span>
				</div>
				<div class='dev-tools-info-padding'>
					<span class='t'>#{parseFloat(style.paddingTop)}</span>
					<span class='r'>#{parseFloat(style.paddingRight)}</span>
					<span class='b'>#{parseFloat(style.paddingBottom)}</span>
					<span class='l'>#{parseFloat(style.paddingLeft)}</span>
					<hr>
					<div class='padded-box'>
						#{margin.w-parseFloat(style.marginLeft)-parseFloat(style.marginRight)-parseFloat(style.borderLeftWidth)-parseFloat(style.borderRightWidth)-parseFloat(style.paddingLeft)-parseFloat(style.paddingRight)}x#{margin.h-parseFloat(style.borderTopWidth)-parseFloat(style.borderBottomWidth)}
					</div>
				</div>
				<div class='dev-tools-info-content'>
					#{margin.w-parseFloat(style.marginLeft)-parseFloat(style.marginRight)-parseFloat(style.borderLeftWidth)-parseFloat(style.borderRightWidth)-parseFloat(style.paddingLeft)-parseFloat(style.paddingRight)}x#{margin.h-parseFloat(style.marginTop)-parseFloat(style.marginBottom)-parseFloat(style.borderTopWidth)-parseFloat(style.borderBottomWidth)-parseFloat(style.paddingTop)-parseFloat(style.paddingBottom)}
				</div>
			"
			hint.appendChild info

unbindHandler = (e)->
	hint = document.getElementsByClassName 'dev-tools-boxer-hint'
	e.target.style.opacity = ''
	for h,i in hint
		if h isnt undefined
			h.parentNode.removeChild h
	return

document.addEventListener 'mouseover', bindHandler
document.addEventListener 'mouseout', unbindHandler
document.addEventListener 'keyup', unbindHandler
document.addEventListener 'keydown', bindHandler

# --------------------------------------------------------
# EVENTS
# --------------------------------------------------------

window.addEventListener 'resize', ->
	if adkGrid.style.display is 'block'
		do updateGridElements
		do updatePixelPerfect
		do drawGrid
	do pushImage
	if lines.wrap.classList.contains 'active'
		do setWindowSizes


adkFilelist = document.getElementsByClassName('adk-fileslist-wrapper')[0]
adkGrid = document.getElementsByClassName('adk-grid-wrapper')[0]

document.onkeydown = (event) ->
	# list
	if event.keyCode is 49
		lines.wrap.classList.remove 'active'
		pixelPerfectWrapper.classList.remove 'active'
		adkGrid.style.display = ''
		adkFilelist.classList.toggle 'active'
	# grid
	if event.keyCode is 50
		lines.wrap.classList.remove 'active'
		pixelPerfectWrapper.classList.remove 'active'
		adkFilelist.classList.remove 'active'
		do updateGridElements
		if adkGrid.style.display is 'block'
			adkGrid.style.display = ''
		else adkGrid.style.display = 'block'
		do drawGrid
	# perfect pixel
	if event.keyCode is 51
		adkGrid.style.display = ''
		adkFilelist.classList.remove 'active'
		lines.wrap.classList.remove 'active'
		pixelPerfectWrapper.classList.toggle 'active'
	if event.keyCode is 38
		event.preventDefault()
		if opacity < 100
			opacity += 20
			do insertPerfectBar
	if event.keyCode is 40
		event.preventDefault()
		if opacity > 0
			opacity -= 20
			do insertPerfectBar
	# window
	if event.keyCode is 52
		pixelPerfectWrapper.classList.remove 'active'
		adkFilelist.classList.remove 'active'
		adkGrid.style.display = 'none'
		lines.wrap.classList.toggle 'active'
	return