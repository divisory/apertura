var Ajax, Elements, Grid, adkFilelist, adkGrid, bind, bindHandler, classNames, config, createList, cssFiles, drawGrid, drawLine, element, filelist, filelistWrapper, findoutRect, getPath, gridCanvas, gridCanvasCtx, gridInfoWrapper, gridWrapper, insertPerfectBar, jsFiles, lines, list, opacity, otherFiles, parsePath, parseSubstring, pixelPerfectBar, pixelPerfectBarInner, pixelPerfectImage, pixelPerfectInfo, pixelPerfectInput, pixelPerfectText, pixelPerfectWrapper, pushImage, pushPixelPerfectImage, renameHref, renameStr, res, setWindowSizes, showAllCategories, showAllCategoriesButtons, sortingFunction, unbindHandler, updateGridElements;

config = '';

list = [];

document.addEventListener("DOMContentLoaded", function(event) {
  var link;
  link = document.createElement('link');
  link.setAttribute('rel', "stylesheet");
  link.setAttribute('href', "dev-tools-css/dev-tools-skin.css");
  return document.body.appendChild(link);
});

Ajax = function(url, callback, onerror) {
  var e, error, error1, error2, request;
  request = new XMLHttpRequest();
  try {
    request = new XMLHttpRequest();
  } catch (error) {
    e = error;
    try {
      request = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (error1) {
      e = error1;
      try {
        request = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (error2) {
        e = error2;
      }
      return false;
    }
  }
  request.onreadystatechange = function() {
    if (request.status === 200) {
      if (request.readyState === 4) {
        return callback(request.responseText, request);
      }
    } else if (onerror) {
      return onerror(request);
    }
  };
  request.open("GET", url, true);
  return request.send();
};


/*
-------------------------------------------------------------
 */

renameHref = function(str) {
  str = str.replace(/\\/gim, '/');
  return '/' + str.substring(str.indexOf('dist') + 5);
};

renameStr = function(str) {
  return str.substring(str.indexOf('dist') + 5);
};

parsePath = function(path) {
  var folder;
  return folder = path.replace(/(.+?\/)/gim, '<b>$1</b>').replace(/(\.[0-9a-z]+$)/gim, '<i>$1</i>');
};

bind = function(element, handler) {
  return document.getElementById(element).addEventListener('click', handler);
};

classNames = function(str, type, clas) {
  var element, elements, j, len, results;
  elements = str.split(',');
  results = [];
  for (j = 0, len = elements.length; j < len; j++) {
    element = elements[j];
    if (type === 'add') {
      results.push(document.querySelector(element).classList.add(clas));
    } else {
      results.push(document.querySelector(element).classList.remove(clas));
    }
  }
  return results;
};

showAllCategoriesButtons = function() {
  return classNames('#ADKshowRoot, #ADKshowJs, #ADKshowCss, #ADKshowAll', 'remove', 'active');
};

showAllCategories = function() {
  showAllCategoriesButtons();
  return classNames('.adk-otherfilelist, .adk-cssfilelist, .adk-jsfilelist', 'remove', 'disabled');
};

sortingFunction = function(a, b) {
  var A, B;
  A = a.match(/\//gim);
  B = b.match(/\//gim);
  if (A.length > B.length) {
    return -1;
  } else if (A.length < B.length) {
    return 1;
  } else {
    return 0;
  }
};

parseSubstring = function(str1, str2) {
  var cache, cache2;
  cache = config.match(new RegExp(str1 + "(.+?)" + str2, "g"));
  if (str1 !== '\\\$grid_calc:') {
    cache2 = cache[0].replace(/(\s|\t|\n|\r)/gim, '').substr(str1.length - 1);
  } else {
    cache2 = cache[0].replace(/(\(|\))/gim, '').substr(str1.length - 1);
  }
  cache = cache2.substr(0, cache2.length - str2.length);
  return cache;
};

element = function(elem, id, text, clas) {
  var ele;
  ele = document.createElement(elem);
  ele.setAttribute('id', id);
  ele.setAttribute('class', clas);
  ele.innerHTML = text;
  return ele;
};

jsFiles = [];

cssFiles = [];

otherFiles = [];

createList = function(arr, nameClass, name, path) {
  var f, j, len, returned;
  returned = "<ul class='adk-filelist-ul " + nameClass + "'><li>" + name + "<b>" + arr.length + "</b></li>";
  for (j = 0, len = arr.length; j < len; j++) {
    f = arr[j];
    returned += "<li><a href='" + f + "' target='_blank'>" + (parsePath(f)) + "</a></li>";
  }
  returned += "</ul>";
  return returned;
};

filelistWrapper = document.createElement('div');

filelistWrapper.setAttribute('class', 'adk-fileslist-wrapper');

filelist = document.createElement('div');

filelist.setAttribute('class', 'adk-fileslist');

res = "<div class='filelist-header'> <span> <a href='#' id='ADKshowAll' class='active'><i class='icon icon-folder'></i>all</a> <a href='#' id='ADKshowJs'><i class='icon icon-js'></i>javascript</a> <a href='#' id='ADKshowCss'><i class='icon icon-css'></i>css</a> <a href='#' id='ADKshowRoot'><i class='icon icon-html'></i>root</a> </span> </div>";

filelistWrapper.innerHTML = res;

res = "";

filelistWrapper.appendChild(filelist);

document.body.appendChild(filelistWrapper);

Ajax('list.json', function(data) {
  var file, files, j, len, str;
  files = JSON.parse(data);
  for (j = 0, len = files.length; j < len; j++) {
    file = files[j];
    str = renameStr(file);
    if (str.match(/js\//gim)) {
      jsFiles.push(str);
    } else if (str.match(/css\//gim)) {
      cssFiles.push(str);
    } else {
      otherFiles.push(str);
    }
  }
  jsFiles.sort(sortingFunction);
  cssFiles.sort(sortingFunction);
  res += createList(otherFiles, 'adk-otherfilelist', 'Root', '/');
  res += createList(cssFiles, 'adk-cssfilelist', 'CSS', 'css/');
  res += createList(jsFiles, 'adk-jsfilelist', 'Javascript', 'js/');
  return filelist.innerHTML = res;
});

bind('ADKshowRoot', function(e) {
  e = e || window.event;
  e.preventDefault();
  showAllCategories();
  classNames('.adk-jsfilelist, .adk-cssfilelist', 'add', 'disabled');
  return classNames('#ADKshowRoot', 'add', 'active');
});

bind('ADKshowJs', function(e) {
  e = e || window.event;
  e.preventDefault();
  showAllCategories();
  classNames('.adk-otherfilelist, .adk-cssfilelist', 'add', 'disabled');
  return classNames('#ADKshowJs', 'add', 'active');
});

bind('ADKshowCss', function(e) {
  e = e || window.event;
  e.preventDefault();
  showAllCategories();
  classNames('.adk-jsfilelist, .adk-otherfilelist', 'add', 'disabled');
  return classNames('#ADKshowCss', 'add', 'active');
});

bind('ADKshowAll', function(e) {
  e = e || window.event;
  e.preventDefault();
  showAllCategories();
  return classNames('#ADKshowAll', 'add', 'active');
});

Grid = {
  width: 0,
  height: 0,
  gutter: 0,
  gridCalc: '',
  columns: 0,
  columnWidth: 0
};

updateGridElements = function() {
  var w;
  gridWrapper.style.height = '0px';
  gridWrapper.style.height = document.body.scrollHeight + 'px';
  if (document.body.clientWidth > parseSubstring('\\\$primary_grid:', ';')) {
    w = parseSubstring('\\\$primary_grid:', ';');
  } else {
    w = document.body.clientWidth;
  }
  Elements[0].innerHTML = "<b><i class='icon icon-border_all'></i>Grid</b>" + w;
  Elements[1].innerHTML = "<b><i class='icon icon-format_align_justify'></i>Line height</b>" + Grid.height;
  Elements[2].innerHTML = "<b><i class='icon icon-border_left'></i>Gutter</b>" + Grid.gutter;
  Elements[3].innerHTML = "<b><i class='icon icon-view_comfortable'></i>Grid calc</b>" + Grid.gridCalc;
  Elements[4].innerHTML = "<b><i class='icon icon-border_inner'></i>Cols</b>" + Grid.columns[Grid.columns.length - 1];
  Elements[5].innerHTML = "<b><i class='icon icon-border_outer'></i>Col width</b>" + ((w / Grid.columns[Grid.columns.length - 1]).toFixed(1));
  Grid.columnWidth = w / Grid.columns[Grid.columns.length - 1];
  return console.log('ADK :: GridHightlighter -> Grid information has been updated');
};

gridWrapper = element('div', '', '', 'adk-grid-wrapper');

gridInfoWrapper = element('div', '', '', 'adk-gridinfo-wrapper');

document.body.appendChild(gridWrapper);

gridWrapper.style.height = document.body.scrollHeight + 'px';

Elements = [element('div', 'gridWidthElement', 0, ''), element('div', 'gridHeightElement', 0, ''), element('div', 'gridGutterElement', 0, ''), element('div', 'gridCalcElement', 0, ''), element('div', 'gridColumnsElement', 0, ''), element('div', 'gridColumnWidthElement', 0, '')];

gridCanvas = element('canvas', 'ADKGridCanvas', '', 'adk-grid-canvas');

gridCanvasCtx = null;

drawLine = function(x1, y1, x2, y2, type) {
  var offset;
  gridCanvasCtx.beginPath();
  if (type === 'row') {
    gridCanvasCtx.lineWidth = Grid.height;
    gridCanvasCtx.strokeStyle = "rgba(31, 37, 61, 0.4)";
    gridCanvasCtx.moveTo(x1, y1 + Grid.height / 2);
    gridCanvasCtx.lineTo(x2, y2 + Grid.height / 2);
  } else {
    if (document.body.clientWidth > Grid.width) {
      offset = (document.body.clientWidth - Grid.width) / 2;
    } else {
      offset = 0;
    }
    gridCanvasCtx.lineWidth = Grid.columnWidth - Grid.gutter * 2;
    gridCanvasCtx.strokeStyle = "rgba(31, 37, 61, 0.4)";
    gridCanvasCtx.moveTo(x1 - Grid.columnWidth / 2 + offset, y1);
    gridCanvasCtx.lineTo(x2 - Grid.columnWidth / 2 + offset, y2);
  }
  return gridCanvasCtx.stroke();
};

drawGrid = function() {
  var i, j, k, ref, ref1, results;
  gridCanvas.width = gridWrapper.clientWidth;
  gridCanvas.height = gridWrapper.clientHeight;
  gridCanvasCtx.clearRect(0, 0, gridCanvas.width, gridCanvas.height);
  for (i = j = 0, ref = gridWrapper.clientHeight / Grid.height; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
    if (i % 2 === 1) {
      drawLine(0, i * Grid.height, gridWrapper.clientWidth, i * Grid.height, 'row');
    }
  }
  results = [];
  for (i = k = 1, ref1 = Grid.columns.length; 1 <= ref1 ? k < ref1 : k > ref1; i = 1 <= ref1 ? ++k : --k) {
    results.push(drawLine(i * Grid.columnWidth, 0, i * Grid.columnWidth, gridWrapper.clientHeight, 'col'));
  }
  return results;
};

Ajax('_config.scss', function(data) {
  var elem, j, len;
  config = data;
  Grid.width = parseSubstring('\\\$primary_grid:', ';');
  Grid.height = parseSubstring('\\\$grid_line_height:', 'px;');
  Grid.gutter = parseSubstring('\\\$gutter:', 'px;');
  Grid.gridCalc = parseSubstring('\\\$grid_calc:', ';');
  Grid.columns = (parseSubstring('\\\$grid_calc:', ';')).split(' ');
  Grid.columnWidth = 0;
  gridWrapper.appendChild(gridCanvas);
  for (j = 0, len = Elements.length; j < len; j++) {
    elem = Elements[j];
    gridInfoWrapper.appendChild(elem);
  }
  gridWrapper.appendChild(gridInfoWrapper);
  updateGridElements();
  gridCanvasCtx = gridCanvas.getContext("2d");
  return drawGrid();
});

opacity = 40;

pixelPerfectWrapper = element('div', 'pixelPerfectWrapper', '', 'pixel-perfect-wrapper');

document.body.appendChild(pixelPerfectWrapper);

pixelPerfectImage = element('img', 'pixelPerfectImage', '', 'adk-pixelperfect-image');

pixelPerfectWrapper.appendChild(pixelPerfectImage);

pushPixelPerfectImage = function(resolution) {
  return Ajax("dev-tools-templates/_" + resolution + ".jpg", function(data, req) {
    if (req.status === 200) {
      return pixelPerfectImage.src = req.responseURL;
    } else {
      console.log('ADK :: PerfectPixel -> The \'JPG\'-file not found. Sending request for \'PNG\'-file...');
      return Ajax("dev-tools-templates/_" + resolution + ".png", function(data, req) {
        if (req.status === 200) {
          pixelPerfectImage.src = req.responseURL;
          return console.log('ADK :: PerfectPixel -> \'PNG\'-file loaded [OK]');
        } else {
          return console.log('ADK :: PerfectPixel -> Error. Image not found.');
        }
      });
    }
  }, function(req) {
    return console.log(req.status);
  });
};

pixelPerfectInfo = element('div', 'pixelPerfectInfo', '', 'adk-pixelperfect-info');

pixelPerfectWrapper.appendChild(pixelPerfectInfo);

pixelPerfectInput = element('input', 'pixelPerfectInput', '', 'adk-pixelperfect-input');

pixelPerfectText = element('div', 'pixelPerfectText', '<i class="icon icon-image"></i>', 'adk-pixel-perfect-text');

pixelPerfectBar = element('div', 'pixelPerfectBar', '', 'adk-pixelperfect-bar');

pixelPerfectBarInner = element('div', 'pixelPerfectBarInner', '', 'adk-pixelperfect-bar-inner');

pixelPerfectBar.appendChild(pixelPerfectBarInner);

pixelPerfectInfo.appendChild(pixelPerfectInput);

pixelPerfectInfo.appendChild(pixelPerfectText);

pixelPerfectInfo.appendChild(pixelPerfectBar);

insertPerfectBar = function() {
  pixelPerfectText.setAttribute('data-precent', opacity);
  pixelPerfectImage.style.opacity = opacity / 100;
  return pixelPerfectBarInner.style.width = opacity + '%';
};

insertPerfectBar();

findoutRect = function() {
  var obj;
  obj = {};
  obj.iW = window.innerWidth;
  obj.oW = window.outerWidth;
  obj.iH = window.innerHeight;
  obj.oH = window.outerHeight;
  return obj;
};

pushImage = function() {
  var rect, width;
  rect = findoutRect();
  width = rect.oW > rect.iW ? rect.iW : rect.oW;
  if (width <= 350) {
    return pushPixelPerfectImage(320);
  } else if (width <= 540) {
    return pushPixelPerfectImage(480);
  } else if (width <= 760) {
    return pushPixelPerfectImage(640);
  } else if (width <= 800) {
    return pushPixelPerfectImage(768);
  } else if (width <= 1020) {
    return pushPixelPerfectImage(992);
  } else if (width <= 1100) {
    return pushPixelPerfectImage(1024);
  } else if (width <= 1260) {
    return pushPixelPerfectImage(1200);
  } else if (width <= 1300) {
    return pushPixelPerfectImage(1280);
  } else if (width <= 1480) {
    return pushPixelPerfectImage(1400);
  } else if (width <= 1650) {
    return pushPixelPerfectImage(1600);
  } else {
    return pushPixelPerfectImage(1920);
  }
};

pushImage();

lines = {};

lines.wrap = element('div', 'ADKLinesWrapper', '', 'adk-lines-wrapper');

lines.x = element('div', 'ADKLineX', '', 'adk-line-x');

lines.y = element('div', 'ADKLineY', '', 'adk-line-y');

lines.win = element('div', 'ADKWindow', '', 'adk-line-window');

lines.wrap.appendChild(lines.x);

lines.wrap.appendChild(lines.y);

lines.wrap.appendChild(lines.win);

document.body.appendChild(lines.wrap);

setWindowSizes = function() {
  var rect;
  rect = document.body.getBoundingClientRect();
  return lines.win.innerHTML = '<span><i class="icon icon-display"></i>' + rect.width + 'x' + rect.height + '</span><span><i class="icon icon-tablet"></i>' + window.outerWidth + 'x' + window.outerHeight + '</span>';
};

setWindowSizes();

lines.wrap.addEventListener('mousemove', function(e) {
  lines.x.setAttribute('style', "-webkit-transform: translate(0," + (e.pageY - document.body.scrollTop) + "px); -moz-transform: translate(0," + (e.pageY - document.body.scrollTop) + "px); -ms-transform: translate(0," + (e.pageY - document.body.scrollTop) + "px); -o-transform: translate(0," + (e.pageY - document.body.scrollTop) + "px); transform: translate(0," + (e.pageY - document.body.scrollTop) + "px);");
  lines.y.setAttribute('style', "-webkit-transform: translate(" + (e.pageX - document.body.scrollLeft) + "px,0); -moz-transform: translate(" + (e.pageX - document.body.scrollLeft) + "px,0); -ms-transform: translate(" + (e.pageX - document.body.scrollLeft) + "px,0); -o-transform: translate(" + (e.pageX - document.body.scrollLeft) + "px,0); transform: translate(" + (e.pageX - document.body.scrollLeft) + "px,0);");
  lines.x.innerHTML = '<span class="' + (e.pageX - document.body.scrollLeft <= 200 ? 'right' : '') + ' ' + (e.pageY - document.body.scrollTop >= window.innerHeight / 2 ? 'bottom' : '') + '"><b>' + (e.pageY - document.body.scrollTop) + '</b>, <s>' + document.body.scrollTop + '</s>, <i>' + e.pageY + '</i></span>';
  return lines.y.innerHTML = '<span class="' + (e.pageY - document.body.scrollTop <= 200 ? 'bottom' : '') + ' ' + (e.pageX - document.body.scrollLeft >= window.innerWidth / 2 ? 'right' : '') + '"><b>' + (e.pageX - document.body.scrollLeft) + '</b>, <s>' + document.body.scrollLeft + '</s>, <i>' + e.pageX + '</i></span>';
});

getPath = function(node) {
  var count;
  var count;
  var sibling;
  var count, path, sibling;
  path = path || [];
  if (node.parentNode) {
    path = getPath(node.parentNode, path);
  }
  if (node.previousSibling) {
    count = 1;
    sibling = node.previousSibling;
    while (true) {
      if (sibling.nodeType === 1 && sibling.nodeName === node.nodeName) {
        count++;
      }
      sibling = sibling.previousSibling;
      if (!sibling) {
        break;
      }
    }
    if (count === 1) {
      count = null;
    }
  } else if (node.nextSibling) {
    sibling = node.nextSibling;
    while (true) {
      if (sibling.nodeType === 1 && sibling.nodeName === node.nodeName) {
        count = 1;
        sibling = null;
      } else {
        count = null;
        sibling = sibling.previousSibling;
      }
      if (!sibling) {
        break;
      }
    }
  }
  if (node.nodeType === 1 && node.nodeName.toLowerCase() !== 'html' && node.nodeName.toLowerCase() !== 'body') {
    path.push(node.nodeName.toLowerCase() + (node.id ? '<s>#' + node.id + '</s>' : node.classList.toString().length >= 1 && node.nodeName.toLowerCase() !== 'html' ? '<b>.' + node.classList.toString().replace(/\s/gim, '.') + '</b>' : ''));
  }
  return path;
};

bindHandler = function(e) {
  var border, content, hint, info, j, len, margin, p, padding, path, rect, ref, style;
  if (!e) {
    e = new MouseEvent('mouseover');
  }
  if (e.ctrlKey) {
    hint = document.createElement('div');
    hint.setAttribute('class', 'dev-tools-boxer-hint');
    document.body.appendChild(hint);
    hint = document.getElementsByClassName('dev-tools-boxer-hint')[0];
    if (e.ctrlKey && hint !== void 0) {
      e.target.style.opacity = '0.8';
      style = getComputedStyle(e.target);
      rect = e.target.getBoundingClientRect();
      margin = {
        w: rect.width + parseFloat(style.marginLeft) + parseFloat(style.marginRight),
        h: rect.height + parseFloat(style.marginTop) + parseFloat(style.marginBottom)
      };
      hint.setAttribute('style', "top:" + (rect.top + rect.height + parseFloat(style.marginBottom) + document.body.scrollTop) + "px; left:" + (rect.left + document.body.scrollLeft - parseFloat(style.marginLeft)) + "px; width:" + margin.w + "px; height:" + margin.h + "px;");
      border = document.createElement('div');
      border.setAttribute('class', 'dev-tools-boxer-hint-border');
      border.setAttribute('style', "top:" + (parseFloat(style.marginTop)) + "px; left:" + (parseFloat(style.marginLeft)) + "px; width:" + (margin.w - parseFloat(style.marginLeft) - parseFloat(style.marginRight)) + "px; height:" + (margin.h - parseFloat(style.marginTop) - parseFloat(style.marginBottom)) + "px;");
      padding = document.createElement('div');
      padding.setAttribute('class', 'dev-tools-boxer-hint-padding');
      padding.setAttribute('style', "top:" + (parseFloat(style.borderTopWidth)) + "px; left:" + (parseFloat(style.borderLeftWidth)) + "px; width:" + (margin.w - parseFloat(style.marginLeft) - parseFloat(style.marginRight) - parseFloat(style.borderLeftWidth) - parseFloat(style.borderRightWidth)) + "px; height:" + (margin.h - parseFloat(style.marginTop) - parseFloat(style.marginBottom) - parseFloat(style.borderTopWidth) - parseFloat(style.borderBottomWidth)) + "px;");
      content = document.createElement('div');
      content.setAttribute('class', 'dev-tools-boxer-hint-content');
      content.setAttribute('style', "top:" + (parseFloat(style.paddingTop)) + "px; left:" + (parseFloat(style.paddingLeft)) + "px; width:" + (margin.w - parseFloat(style.marginLeft) - parseFloat(style.marginRight) - parseFloat(style.borderLeftWidth) - parseFloat(style.borderRightWidth) - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight)) + "px; height:" + (margin.h - parseFloat(style.marginTop) - parseFloat(style.marginBottom) - parseFloat(style.borderTopWidth) - parseFloat(style.borderBottomWidth) - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom)) + "px;");
      padding.appendChild(content);
      border.appendChild(padding);
      hint.appendChild(border);
      info = document.createElement('div');
      info.setAttribute('class', 'dev-tools-boxer-hint-info');
      path = '<b>body</b>';
      ref = getPath(e.target);
      for (j = 0, len = ref.length; j < len; j++) {
        p = ref[j];
        path += '<i>&gt;</i>' + p.toString();
      }
      info.innerHTML = "<div class='dev-tools-info-path'>" + path + "</div> <div class='dev-tools-info-margin'> <span class='t'>" + (parseFloat(style.marginTop)) + "</span> <span class='r'>" + (parseFloat(style.marginRight)) + "</span> <span class='b'>" + (parseFloat(style.marginBottom)) + "</span> <span class='l'>" + (parseFloat(style.marginLeft)) + "</span> </div> <div class='dev-tools-info-border'> <span class='t'>" + (parseFloat(style.borderTopWidth)) + "</span> <span class='r'>" + (parseFloat(style.borderRightWidth)) + "</span> <span class='b'>" + (parseFloat(style.borderBottomWidth)) + "</span> <span class='l'>" + (parseFloat(style.borderLeftWidth)) + "</span> </div> <div class='dev-tools-info-padding'> <span class='t'>" + (parseFloat(style.paddingTop)) + "</span> <span class='r'>" + (parseFloat(style.paddingRight)) + "</span> <span class='b'>" + (parseFloat(style.paddingBottom)) + "</span> <span class='l'>" + (parseFloat(style.paddingLeft)) + "</span> <hr> <div class='padded-box'> " + (margin.w - parseFloat(style.marginLeft) - parseFloat(style.marginRight) - parseFloat(style.borderLeftWidth) - parseFloat(style.borderRightWidth) - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight)) + "x" + (margin.h - parseFloat(style.borderTopWidth) - parseFloat(style.borderBottomWidth)) + " </div> </div> <div class='dev-tools-info-content'> " + (margin.w - parseFloat(style.marginLeft) - parseFloat(style.marginRight) - parseFloat(style.borderLeftWidth) - parseFloat(style.borderRightWidth) - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight)) + "x" + (margin.h - parseFloat(style.marginTop) - parseFloat(style.marginBottom) - parseFloat(style.borderTopWidth) - parseFloat(style.borderBottomWidth) - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom)) + " </div>";
      return hint.appendChild(info);
    }
  }
};

unbindHandler = function(e) {
  var h, hint, i, j, len;
  hint = document.getElementsByClassName('dev-tools-boxer-hint');
  e.target.style.opacity = '';
  for (i = j = 0, len = hint.length; j < len; i = ++j) {
    h = hint[i];
    if (h !== void 0) {
      h.parentNode.removeChild(h);
    }
  }
};

document.addEventListener('mouseover', bindHandler);

document.addEventListener('mouseout', unbindHandler);

document.addEventListener('keyup', unbindHandler);

document.addEventListener('keydown', bindHandler);

window.addEventListener('resize', function() {
  if (adkGrid.style.display === 'block') {
    updateGridElements();
    updatePixelPerfect();
    drawGrid();
  }
  pushImage();
  if (lines.wrap.classList.contains('active')) {
    return setWindowSizes();
  }
});

adkFilelist = document.getElementsByClassName('adk-fileslist-wrapper')[0];

adkGrid = document.getElementsByClassName('adk-grid-wrapper')[0];

document.onkeydown = function(event) {
  if (event.keyCode === 49) {
    lines.wrap.classList.remove('active');
    pixelPerfectWrapper.classList.remove('active');
    adkGrid.style.display = '';
    adkFilelist.classList.toggle('active');
  }
  if (event.keyCode === 50) {
    lines.wrap.classList.remove('active');
    pixelPerfectWrapper.classList.remove('active');
    adkFilelist.classList.remove('active');
    updateGridElements();
    if (adkGrid.style.display === 'block') {
      adkGrid.style.display = '';
    } else {
      adkGrid.style.display = 'block';
    }
    drawGrid();
  }
  if (event.keyCode === 51) {
    adkGrid.style.display = '';
    adkFilelist.classList.remove('active');
    lines.wrap.classList.remove('active');
    pixelPerfectWrapper.classList.toggle('active');
  }
  if (event.keyCode === 38) {
    event.preventDefault();
    if (opacity < 100) {
      opacity += 20;
      insertPerfectBar();
    }
  }
  if (event.keyCode === 40) {
    event.preventDefault();
    if (opacity > 0) {
      opacity -= 20;
      insertPerfectBar();
    }
  }
  if (event.keyCode === 52) {
    pixelPerfectWrapper.classList.remove('active');
    adkFilelist.classList.remove('active');
    adkGrid.style.display = 'none';
    lines.wrap.classList.toggle('active');
  }
};
