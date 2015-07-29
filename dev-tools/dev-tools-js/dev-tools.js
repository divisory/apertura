var _g, addControl, append, block, blockHeight, c, cacheHoverColor, config, counter, counterStyle, createGridLayer, createLinkToFile, file, files, filesBlock, getClassOfLink, getColorOfLink, getHeight, getImageOfLink, getPixelperfect, gridBlock, gridBlockVertical, gridBlockVerticalStyle, gridCalc, gridColor, gridColorVerical, gridGutter2, gridLineHeight, gridWidth, i, images, insertOpacity, j, k, len, len1, linkStyle, linkStyleHover, n, op, pixelPerfect, renameHref, renameStr, s, select, str, style, sumStyle, sums, sumsBlock, unbindEvent;

select = function(str) {
  var elem;
  if (str.indexOf('#' > -1)) {
    elem = document.getElementById("" + (str.substr(1)));
  } else {
    elem = document.getElementsByClassName("" + (str.substr(1)));
  }
  return elem;
};

append = function(elem) {
  document.body.appendChild(elem);
  return elem;
};

files = ["dist/index.html", "dist/css/full/grid.css", "dist/css/full/skin.css", "dist/css/grid.min.css", "dist/css/skin.min.css", "dist/js/dev-tools.js", "dist/js/main.js", "dist/js/script.js", "dist/js/vendor/html5shiv.js", "dist/js/vendor/jquery-2.1.0.min.js", "dist/js/vendor/minify.min.js", "dist/js/vendor/modernizr-2.7.1.min.js", "dist/js/vendor/no-hover.min.js"];

config = "/* ----------------------------------------------------- CONFIG */ // GRID:: padding $gutter: 							10px; // GRID:: padding $grid_line_height: 		20px; // GRID:: boxes widths $grid_sizes:					(720, 960, 1140); $primary_grid: 				1140; // GRID:: boxes widths $grid_prefixes: 			(768, '--t') (640, '--sm') (480, '--m'); // GRID:: grid calc $grid_calc: 					(1 2 3 4 5 6 7 8 9 10 11 12); // GRID:: fixed widths $fixed_widths:        (50,100,150,200,250,300); // indents $islands: 						(5,10,15,20,25,30,35,40,45,50); $vertical_indents: 		(5,10,15,20,25,30,35,40,45,50); $horizontal_indents: 	(5,10,15,20,25,30,35,40,45,50); // FONTS:: min font size $min_font_size: 			6; // FONTS:: max font size $max_font_size: 			60; // SKIN:: Colors $colors_list: 				(black, #000000) (white, #ffffff); // SKIN:: background colors $colors_list_bg: 			(black, #000000) (white, #ffffff); // SKIN:: font size $font_size: 					14px; // SKIN:: font-family $font_family: 				sans-serif;";

gridColor = 'rgba(200,20,20,.2)';

gridColorVerical = 'rgba(200,20,20,.2)';

_g = config.substr(config.indexOf("$grid_calc:"));

_g = _g.substr(_g.indexOf("(") + 1);

_g = _g.substr(0, _g.indexOf(");"));

_g = _g.split(' ');

gridCalc = _g[_g.length - 1];

_g = config.substr(config.indexOf("$grid_line_height"));

_g = _g.substr(_g.indexOf(":") + 1);

_g = _g.substr(0, _g.indexOf("px;"));

gridLineHeight = parseInt(_g);

_g = config.substr(config.indexOf("$gutter"));

_g = _g.substr(_g.indexOf(":") + 1);

_g = _g.substr(0, _g.indexOf("px;"));

gridGutter2 = parseInt(_g);

_g = config.substr(config.indexOf("$primary_grid"));

_g = _g.substr(_g.indexOf(":") + 1);

_g = _g.substr(0, _g.indexOf(";"));

gridWidth = parseInt(_g);

renameHref = function(str) {
  str = str.replace(/\\/gim, '/');
  return '/' + str.substring(str.indexOf('dist') + 5);
};

renameStr = function(str) {
  str = str.replace(/\\/gim, '/').replace(/(js\/|css\/|vendor\/|full\/)/gim, '<span style="color:#fff;">$1</span>');
  return str.substring(str.indexOf('dist') + 5);
};

images = {
  html: "<img src='data:image/png;base64,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'/>",
  css: "<img src='data:image/png;base64,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'/>",
  js: "<img src='data:image/png;base64,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'/>",
  other: "<img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABbCAYAAADk1gJuAAAACXBIWXMAAAsTAAALEwEAmpwYAAABNmlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjarY6xSsNQFEDPi6LiUCsEcXB4kygotupgxqQtRRCs1SHJ1qShSmkSXl7VfoSjWwcXd7/AyVFwUPwC/0Bx6uAQIYODCJ7p3MPlcsGo2HWnYZRhEGvVbjrS9Xw5+8QMUwDQCbPUbrUOAOIkjvjB5ysC4HnTrjsN/sZ8mCoNTIDtbpSFICpA/0KnGsQYMIN+qkHcAaY6addAPAClXu4vQCnI/Q0oKdfzQXwAZs/1fDDmADPIfQUwdXSpAWpJOlJnvVMtq5ZlSbubBJE8HmU6GmRyPw4TlSaqo6MukP8HwGK+2G46cq1qWXvr/DOu58vc3o8QgFh6LFpBOFTn3yqMnd/n4sZ4GQ5vYXpStN0ruNmAheuirVahvAX34y/Axk/96FpPYgAAACBjSFJNAAB6JQAAgIMAAPn/AACA6AAAUggAARVYAAA6lwAAF2/XWh+QAAADZ0lEQVR42uydvU4UURiGHyerjUY7f2pjr8ZKbTQCdyBr70XoDWht4g0YG1piIhT+JNoaG6MWFIoxwu7sAAtrxCDEYs/g7MDMnJ/dAeF9k9PBbObhe8/3fmcmy5HJycm7wHUgRnLRcSBpADeBO+LhpXYEzImDt75EwIo4eGspAlri4K0kAhbEwVsLsnCYOhHQAbbEwt/CMZCIhb+F14FVsfC3MEBbLLy0kgJcFAtnrQJxClCd2F1dYFkVGDCFAKQAf4iHs1pZgLKwu+IsQM3DgRbWHugRorMAu+LhrHYW4JLGOWctZwH20DMRVy1mAaJ5OKwLqxO7afsAJsp3FclKHbMGACpM2ysBNvMAlQXttV1ssnBAB5aFAw8S8gB1Kh1o4Va6MUp2czBAIxeke8CpYX/a1NTUntxls9ms1cJrGufCLKx90F7tIoA61qrW7zKACtPVSnvFrgAVpu3s+6sIoMK03UECRQB1pOXQgWXhwDlYFh4BwI74hFk4xjwwlvwqsGdGOskToDpxtQamtUYdAEd4KlK3NqtyoDpxuZbInVhFVR6XdszB61UAFabL52CqAC6LU6FaNgDVhS1DtPbAwAxYBFCn0sVasAGYKMqEWbirQ4WwJpLmHclzD1QnLg/SVgAVpnfPx4ktQDWRneq4VKCyoGVfkIUDOrAsHNiBywDqJSPLolKMGVEFDrxAIxX3hagk82icC7Cw9sGdil0BqhMHxBg1kkH9pOCcNHLdNA/xGNeVhf3VpuAb7mRhOxU+5pCF7SsQWXjIIboKoIL04GDhDLCNHnEGWXgNvWwZZOEtjXNhFlaU+afEF6A6cX+Mi30B6uFS/2y06wtQYbr/Wu8fX4AfDjm8b8Cjsh9oVFxgFjhG/z/eTJh18YDb9YW57xnge9UvNCwuugG8NusecA4YN+sWcPo/h/YReG6AvS2zqy/A3fbFJ2YBXMkAveZ5zTq1lqmyWWNTbw3jZt+Z9QA4CdwwMCeA8wehykYNML+HTJsFcMGAHDdgT9QErAe8NMBmQqusToB5zZn1GDhqmlFanZeG/FmfclW2Ucdfqs79KtuM7gNngTEDdAw441FlrzJVNr8Xe8NebviLwFOzAC5notJVU7F5fc5U2Zu6qmy/AszrvVkPM83otqnMaeAZ8HW/tfS/AwDXuP7S/7MwLQAAAABJRU5ErkJggg=='/>"
};

cacheHoverColor = '';

blockHeight = 0;

getHeight = function() {
  return blockHeight = window.innerHeight - 55;
};

getHeight();

window.addEventListener('resize', getHeight);

style = "display:none;position:fixed;top:0;left:0; width:100%;background:rgba(0,0,0,.8); z-index:9999;box-sizing:border-box;padding:20px; font-family: 'Exo 2', sans-serif;color:#777; text-align:center; height:" + blockHeight + "px;overflow-y:auto;";

linkStyle = "display:inline-block;color:#111;padding:20px 30px; text-decoration:none;text-align:left; box-shadow:0 0 0 1px #000;margin:0 10px 20px; width:200px;height:70px;vertical-align:top;";

linkStyleHover = "display:inline-block;color:#111;padding:20px 30px; text-decoration:none;text-align:left; box-shadow:0 0 0 1px #000,0 0 0 4px #fff;margin:0 10px 20px; width:200px;height:70px;vertical-align:top;";

sumStyle = "display:none;position:fixed;top:0px;left:0; width:100%;z-index:9999; box-sizing:border-box; font-family: 'Exo 2', sans-serif;color:#fff;";

counterStyle = "display:inline-block;box-sizing:border-box; padding: 3px 20px;cursor:pointer; color:#fff;border-radius:0px;text-align:left; line-height:40px;font-size:16px; border-left:1px solid #333;";

filesBlock = document.createElement('div');

filesBlock.id = 'dev-files-block';

filesBlock.setAttribute('style', style);

filesBlock.style = style;

filesBlock.className = 'fa df asdf sd fasd';

append(filesBlock);

block = select('#dev-files-block');

sumsBlock = document.createElement('div');

sumsBlock.setAttribute('style', sumStyle);

sumsBlock.style = sumStyle;

sumsBlock.id = 'dev-sums-block';

append(sumsBlock);

sumsBlock = select('#dev-sums-block');

unbindEvent = function(e) {
  var grid, gridV;
  e = e || event;
  if ((e.keyCode !== 38) && (e.keyCode !== 40)) {
    block.style.display = 'none';
    sumsBlock.style.display = 'none';
    grid = select('#dev-grid-block');
    gridV = select('#dev-grid-block-vertical');
    grid.style.display = 'none';
    gridV.style.display = 'none';
    document.body.style.overflow = 'auto';
    grid = select('#dev-pixel-perfect');
    grid.style.display = 'none';
    select('#dev-tools-pixel-input').blur();
  }
};

document.onkeydown = function(event) {
  var grid, gridV;
  if (event.keyCode === 49) {
    document.body.style.overflow = 'hidden';
    block.style.display = 'block';
    sumsBlock.style.display = 'block';
  }
  if (event.keyCode === 50) {
    grid = select('#dev-grid-block');
    grid.style.display = 'block';
    gridV = select('#dev-grid-block-vertical');
    gridV.style.display = 'block';
  }
  if (event.keyCode === 51) {
    grid = select('#dev-pixel-perfect');
    grid.style.display = 'block';
    select('#dev-tools-pixel-input').focus();
  }
};

document.onkeyup = unbindEvent;

getImageOfLink = function(f) {
  if (renameStr(f).match(/\.html/gim) !== null) {
    return images.html;
  } else if (renameStr(f).match(/\.css/gim) !== null) {
    return images.css;
  } else if (renameStr(f).match(/\.js/gim) !== null) {
    return images.js;
  } else {
    return images.other;
  }
};

getColorOfLink = function(f) {
  if (renameStr(f).match(/\.html/gim) !== null) {
    return '#d4826d';
  } else if (renameStr(f).match(/\.css/gim) !== null) {
    return '#699ff6';
  } else if (renameStr(f).match(/\.js/gim) !== null) {
    return '#f2c066';
  } else {
    return '#eee';
  }
};

getClassOfLink = function(f) {
  if (renameStr(f).match(/\.html/gim) !== null) {
    return 'html';
  } else if (renameStr(f).match(/\.css/gim) !== null) {
    return 'css';
  } else if (renameStr(f).match(/\.js/gim) !== null) {
    return 'js';
  } else {
    return 'other';
  }
};

createLinkToFile = function(f) {
  var l;
  l = document.createElement('a');
  l.href = renameHref(f);
  l.innerHTML = (getImageOfLink(renameStr(f))) + " <div>" + (renameStr(f)) + "</div>";
  l.className = "__link " + (getClassOfLink(f));
  l.setAttribute('target', '_blank');
  l.addEventListener('mousedown', function() {
    return setTimeout(function() {
      return unbindEvent();
    }, 1000);
  });
  return block.appendChild(l);
};

str = '';

sums = {
  html: 0,
  css: 0,
  js: 0,
  other: 0
};

for (i = j = 0, len = files.length; j < len; i = ++j) {
  file = files[i];
  if (file.match(/\.html/gim) !== null) {
    sums.html++;
  } else if (file.match(/\.css/gim) !== null) {
    sums.css++;
  } else if (file.match(/\.js/gim) !== null) {
    sums.js++;
  } else {
    sums.other++;
  }
  createLinkToFile(file);
}

sumsBlock.innerHTML = "<span class='dev-counter' id='showHTML'> " + images.html + "<b style='margin-left:6px;'>" + sums.html + "</b> </span> <span class='dev-counter' id='showCSS'> " + images.css + "<b style='margin-left:6px;'>" + sums.css + "</b> </span> <span class='dev-counter' id='showJS'> " + images.js + "<b style='margin-left:6px;'>" + sums.js + "</b> </span> <span class='dev-counter' id='showOther'> " + images.other + "<b style='margin-left:6px;'>" + sums.other + "</b> </span> <span class='dev-counter' id='showAll'> <b style='color:4aaff6;margin-left:6px;'> All:" + (sums.html + sums.css + sums.js + sums.other) + " </b> </span>";

counter = document.body.getElementsByClassName('dev-counter');

addControl = function(c, i) {
  return c.onclick = function() {
    var e, k, len1, len2, len3, len4, len5, len6, m, n, o, p, q, r, ref, ref1, ref2, ref3, ref4, ref5;
    ref = document.getElementsByClassName('__link');
    for (m = k = 0, len1 = ref.length; k < len1; m = ++k) {
      e = ref[m];
      e.style.display = 'none';
    }
    if (i === 0) {
      ref1 = document.getElementsByClassName('html');
      for (n = 0, len2 = ref1.length; n < len2; n++) {
        e = ref1[n];
        e.style.display = 'block';
      }
    }
    if (i === 1) {
      ref2 = document.getElementsByClassName('css');
      for (o = 0, len3 = ref2.length; o < len3; o++) {
        e = ref2[o];
        e.style.display = 'block';
      }
    }
    if (i === 2) {
      ref3 = document.getElementsByClassName('js');
      for (p = 0, len4 = ref3.length; p < len4; p++) {
        e = ref3[p];
        e.style.display = 'block';
      }
    }
    if (i === 3) {
      ref4 = document.getElementsByClassName('other');
      for (q = 0, len5 = ref4.length; q < len5; q++) {
        e = ref4[q];
        e.style.display = 'block';
      }
    }
    if (i === 4) {
      ref5 = document.getElementsByClassName('__link');
      for (r = 0, len6 = ref5.length; r < len6; r++) {
        e = ref5[r];
        e.style.display = 'block';
      }
    }
  };
};

for (i = k = 0, len1 = counter.length; k < len1; i = ++k) {
  c = counter[i];
  addControl(c, i);
}

gridBlock = document.createElement('div');

gridBlock.id = 'dev-grid-block';

append(gridBlock);

gridBlock = select('#dev-grid-block');

createGridLayer = function() {
  var clientHeight, clientWidth, gridColumn, gridColumns, gridGutter, gridStyle, n, ref, s;
  clientHeight = document.body.clientHeight;
  clientWidth = document.body.clientWidth;
  if (clientWidth < gridWidth) {
    gridWidth = clientWidth;
  }
  gridColumns = gridCalc;
  gridColumn = gridWidth / gridColumns;
  gridGutter = gridGutter2 * 2;
  gridBlock.innerHTML = "<div> Grid: <b>" + gridWidth + "</b>px,&nbsp; Cols: <b>" + gridColumns + "</b>,&nbsp; Col: <b>" + (gridColumn.toFixed(1)) + "</b>px,&nbsp; Gutter: <b>" + (gridGutter / 2) + "</b>px,&nbsp; Line: <b>" + gridLineHeight + "</b>px </div>";
  s = 'box-shadow:';
  for (i = n = 0, ref = gridColumns; 0 <= ref ? n < ref : n > ref; i = 0 <= ref ? ++n : --n) {
    s += (i * gridColumn) + "px 0 0 0 " + gridColor + (i < gridColumns - 1 ? ',' : ';');
  }
  gridStyle = "position:fixed;width:" + (gridColumn - gridGutter) + "px;top:0;left:50%; margin-left:-" + (gridWidth / 2 - gridGutter / 2) + "px;height: 100%; background:" + gridColor + ";display:block;z-index:9998; display:none;" + s;
  gridBlock.setAttribute('style', gridStyle);
  gridBlock.style = gridStyle;
};

gridBlockVertical = document.createElement('div');

gridBlockVertical.id = 'dev-grid-block-vertical';

append(gridBlockVertical);

gridBlockVertical = select('#dev-grid-block-vertical');

s = 'box-shadow:';

for (i = n = 0; n < 300; i = ++n) {
  s += "0 " + (gridLineHeight * i * 2) + "px 0 0 " + gridColorVerical + (i < 298 ? ',' : ';');
}

gridBlockVerticalStyle = "position:absolute;width:100%;top:0;left:0;height: " + gridLineHeight + "px; background:transparent;display:block;z-index:9998;" + s + "display:none;";

gridBlockVertical.style = gridBlockVerticalStyle;

gridBlockVertical.setAttribute('style', gridBlockVerticalStyle);

createGridLayer();

window.onresize = function() {
  var b;
  createGridLayer();
  getHeight();
  b = select('#dev-files-block');
  b.style.height = blockHeight;
  return getPixelperfect();
};

pixelPerfect = document.createElement('div');

pixelPerfect.id = 'dev-pixel-perfect';

append(pixelPerfect);

pixelPerfect = select('#dev-pixel-perfect');

getPixelperfect = function() {
  var getImage, ss, w;
  w = window.innerWidth;
  s = w;
  getImage = function() {
    if (w < 360) {
      return s = 320;
    } else if (w < 480) {
      return s = 360;
    } else if (w < 640) {
      return s = 480;
    } else if (w < 768) {
      return s = 640;
    } else if (w < 960) {
      return s = 768;
    } else if (w < 1024) {
      return s = 960;
    } else if (w < 1140) {
      return s = 1024;
    } else if (w < 1280) {
      return s = 1140;
    } else if (w < 1400) {
      return s = 1280;
    } else {
      return s = 1400;
    }
  };
  getImage();
  ss = select('#templates-dev');
  return ss.innerHTML = "<img src='dev-tools-templates/_" + s + ".png' id='pixel-image'>";
};

pixelPerfect.innerHTML = "<div class='dev-tools-opacity-title'>Opacity</div> <input type='text' id='dev-tools-pixel-input' readonly maxlength='2' value='30'> <span>%</span> <div id='templates-dev'> <img src='dev-tools-templates/_" + s + ".png' id='pixel-image'> </div>";

getPixelperfect();

insertOpacity = function() {
  return select('#pixel-image').style.opacity = select('#dev-tools-pixel-input').value / 100;
};

insertOpacity();

op = select('#dev-tools-pixel-input');

op.onkeydown = function(e) {
  e = e || event;
  e.preventDefault();
  if (e.keyCode === 40) {
    op.value = op.value > 10 ? parseInt(op.value) - 5 : parseInt(op.value);
  } else if (e.keyCode === 38) {
    op.value = op.value < 90 ? parseInt(op.value) + 5 : parseInt(op.value);
  }
  return insertOpacity();
};
