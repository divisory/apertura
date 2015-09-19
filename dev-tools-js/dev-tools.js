var Ajax, Elements, Grid, adkFilelist, adkGrid, bind, classNames, config, createList, cssFiles, drawGrid, drawLine, element, filelist, filelistWrapper, gridCanvas, gridCanvasCtx, gridInfoWrapper, gridWrapper, jsFiles, list, otherFiles, parsePath, parseSubstring, renameHref, renameStr, res, showAllCategories, showAllCategoriesButtons, sortingFunction, updateGridElements;

config = '';

list = [];

Ajax = function(url, callback) {
  var e, request;
  request = new XMLHttpRequest();
  try {
    request = new XMLHttpRequest();
  } catch (_error) {
    e = _error;
    try {
      request = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (_error) {
      e = _error;
      try {
        request = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (_error) {
        e = _error;
      }
      return false;
    }
  }
  request.onreadystatechange = function() {
    if (request.readyState === 4) {
      return callback(request.responseText);
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
  return console.log('ADK -> Grid information has been updated');
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

window.addEventListener('resize', function() {
  if (adkGrid.style.display === 'block') {
    updateGridElements();
    return drawGrid();
  }
});

adkFilelist = document.getElementsByClassName('adk-fileslist-wrapper')[0];

adkGrid = document.getElementsByClassName('adk-grid-wrapper')[0];

document.onkeydown = function(event) {
  if (event.keyCode === 49) {
    adkGrid.style.display = '';
    adkFilelist.classList.toggle('active');
  }
  if (event.keyCode === 50) {
    adkFilelist.classList.remove('active');
    updateGridElements();
    if (adkGrid.style.display === 'block') {
      adkGrid.style.display = '';
    } else {
      adkGrid.style.display = 'block';
    }
    drawGrid();
  }
};
