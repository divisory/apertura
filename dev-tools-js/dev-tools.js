var bind, config, createList, cssFiles, file, filelist, filelistWrapper, files, i, jsFiles, len, otherFiles, parsePath, renameHref, renameStr, res, showAllCategories, str;

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

showAllCategories = function() {
  document.querySelector('.adk-otherfilelist').classList.remove('disabled');
  document.querySelector('.adk-cssfilelist').classList.remove('disabled');
  return document.querySelector('.adk-jsfilelist').classList.remove('disabled');
};

files = ["dist/index.html", "dist/dsfasdasd.txt", "dist/dsfasdfasd.json", "dist/css/full/grid.css", "dist/css/full/skin.css", "dist/css/grid.min.css", "dist/css/skin.min.css", "dist/js/vendor/dfasd/minify.min.js", "dist/js/vendor/dfasd/modernizr-2.7.1.min.js", "dist/js/vendor/dfasd/no-hover.min.js", "dist/js/dev-tools.js", "dist/js/main.js", "dist/js/script.js", "dist/js/vendor/html5shiv.js", "dist/js/vendor/jquery-2.1.0.min.js", "dist/js/vendor/minify.min.js", "dist/js/vendor/modernizr-2.7.1.min.js", "dist/js/vendor/no-hover.min.js"];

config = "/* @module title: defaults *n type: scss *n caption: p{ Конфигом системы служит .scss-файл, который содержит в себе настройки для всей системы вцелом. Он находится в папке bd{ scss/_config.scss }. }p *n */ /*-------------------------------------------------------------- КОНФИГ --------------------------------------------------------------*/ /*@property name: $gutter *n caption: Отступ по бокам внутри ячейки сетки. [$gutter|<content here>|$gutter]. Если параметр равен 0 - контент прижимается вплотную к соронам блока. По умолчанию задано 10пикс. *n */ $gutter: 							10px; /*@property name: $grid_line_height *n caption: Высота строки или междустрочный интервал. Применяется для bd{ <body> } *n */ $grid_line_height: 		20px; /*@property name: $grid_sizes *n caption: Это массив с размерами шаблона. Если Вам дают макет шириной в 1400 пикселей, то вы указываете 1400. Если в одном шаблоне есть разные ширины сетки, к примеру 1400 и 960 пикселей, то вы указываете их оба через запятую, при чем от меньшего к большему. Допускается произвольное количество размеров (если они Вам нужны). *n */ $grid_sizes:					(720, 960, 1140); /*@property name: $primary_grid *n caption: Основная ширина сетки. *n */ $primary_grid: 				1140; /*@property name: $grid_prefixes *n caption: p{ Это массив, содержащий ассоциативные массивы с брейкпоинтами. Брейкпоинты помогают Вам добиться отображения при разных ширинах дисплея (адаптивный дизайн) иной ширины блоков. }p p{ Здесь x1d4 – ширина ячейки по умолчанию (1/4). на мобильном телефоне мы хотим чтобы она отображалась по-другому (1/2), для этого мы используем брейк-поинт x1d2--m, который на мобильном устройстиве отобразит ячейку шире (1/2). }p p{ Массив состоит из ассоциативных массивов (480, ‘--m’), в которых передается ширина, при которой брейкпоинт должен сработать и префикс, по которому к брейкпоинту можно обратиться. Вы сами можете создать сколько угодно брейкпоинтов. }p *n p{ Создает набор классов типа bd{.x<X>d<D>--<BRAKEPOINT>} }p *n */ $grid_prefixes: 			(768, '--t') (640, '--sm') (480, '--m'); /*@property name: $grid_calc *n caption: p{ Это части, на которые можно “дробить” ячейки в сетке. Мощнейшим преимуществом сетки есть дробление на произвольное количество ячеек, и сетка может разбиваться не на 12 колонок (как в Bootstrap), а на произвольное количество ячеек (например на 100, если это Вам нужно). }p p{ Эти части являются как ширинами блока, так и ширинами ячеек. Это значит, что вам не обязательно указывать постоянную ширину знаменателя (bd{x1d12}, bd{x3d12} и т.д). Это выражение - формирует процент от ширины, соответственно, bd{x1d2} и bd{x6d12} - это одно и то же (50%)) }p p{ Создает набор классов типа bd{.x<X>d<D>} }p *n */ $grid_calc: 					(1 2 3 4 5 6 7 8 9 10 11 12); /*@property name: $fixed_widths *n caption: p{ Содержит массив с фиксированными размерами (в пикселях). }p p{ Аналогично bd{$grid_calc}. }p*n p{ Создает набор классов типа bd{.w-fixed-<WIDTH>} }p *n */ $fixed_widths:        (50,100,150,200,250,300); /*@property name: $islands *n caption: p{ Массив с размерами отступов. Эти отступы означают равные отступы со всех сторон блока (от слова island, остров). То есть указывая 10px – Вы указываете отступ в 10 пикселей со всех сторон. Это есть padding и margin. }p p{ Создает набор классов типа bd{.island-<NUMBER>} }p *n */ $islands: 						(5,10,15,20,25,30,35,40,45,50); /*@property name: $vertical_indents *n caption: p{ Массив с размерами отступов. Аналогично bd{$islands}, за исключением того, что отступы указываются только по вертикали. }p p{ Создает набор классов типа: ul{ li{ bd{.pad-v<NUMBER>} - внутренний отступ сверху и снизу }li li{ bd{.pad-top-<NUMBER>} - внутренний отступ сверху }li li{ bd{.pad-bot-<NUMBER>} - внутренний отступ снизу }li li{ bd{.marg-v<NUMBER>} - внешний отступ сверху и снизу }li li{ bd{.marg-top-<NUMBER>} - внешний отступ сверху }li li{ bd{.marg-bot-<NUMBER>} - внешний отступ снизу }li }ul }p *n */ $vertical_indents: 		(5,10,15,20,25,30,35,40,45,50); /*@property name: $vertical_indents *n caption: p{ Массив с размерами отступов. Аналогично bd{$islands}, за исключением того, что отступы указываются только по горизонтали. }p p{ Создает набор классов типа: ul{ li{ bd{.pad-h<NUMBER>} - внутренний отступ слева и справа }li li{ bd{.pad-left-<NUMBER>} - внутренний отступ слева }li li{ bd{.pad-right-<NUMBER>} - внутренний отступ справа }li li{ bd{.marg-h<NUMBER>} - внешний отступ слева и справа }li li{ bd{.marg-left-<NUMBER>} - внешний отступ слева }li li{ bd{.marg-right-<NUMBER>} - внешний отступ справа }li }ul }p *n *n */ $horizontal_indents: 	(5,10,15,20,25,30,35,40,45,50); /*@property name: $min_font_size, $max_font_size *n caption: p{ Размеры шрифта. Применяются к блоку. }p*n p{ Создает набор классов типа bd{.font-<NUMBER>}, где <NUMBER> - это диапазон от bd{$min_font_size} до bd{$max_font_size} }p *n */ $min_font_size: 			6; $max_font_size: 			60; /*@property name: .YourColor *n caption: Устанавливает цвет текста с названием YourColor. Параметры задаются в bd{ _config.scss }, в объекте bd{ $colors_list } *n */ $colors_list: 				(black, #000000) (white, #ffffff); /*@property name: .bg-YourColor *n caption: Устанавливает фона блока с названием YourColor. Параметры задаются в bd{ _config.scss }, в объекте bd{ $colors_list_bg } *n */ $colors_list_bg: 			(black, #000000) (white, #ffffff); /*-------------------------------------------------------------- ПЕРЕМЕННЫЕ --------------------------------------------------------------*/ /*@property name: $font_size *n caption: Устанавливает размер шрифта по умолчанию для <body> *n */ $font_size: 					14px; /*@property name: $font_family *n caption: Устанавливает шрифт по умолчанию для <body> *n */ $font_family: 				sans-serif;";

jsFiles = [];

cssFiles = [];

otherFiles = [];

for (i = 0, len = files.length; i < len; i++) {
  file = files[i];
  str = renameStr(file);
  if (str.match(/js\//gim)) {
    jsFiles.push(str.replace(/js\//gim, ''));
  } else if (str.match(/css\//gim)) {
    cssFiles.push(str.replace(/css\//gim, ''));
  } else {
    otherFiles.push(str);
  }
}

filelistWrapper = document.createElement('div');

filelistWrapper.setAttribute('class', 'adk-fileslist-wrapper');

filelist = document.createElement('div');

filelist.setAttribute('class', 'adk-fileslist');

createList = function(arr, nameClass, name, path) {
  var f, j, len1, returned;
  returned = "<ul class='adk-filelist-ul " + nameClass + "'><li>" + name + "</li>";
  for (j = 0, len1 = arr.length; j < len1; j++) {
    f = arr[j];
    returned += "<li><a href='" + path + f + "' target='_blank'>" + (parsePath(f)) + "</a></li>";
  }
  returned += "</ul>";
  return returned;
};

res = "<div class='filelist-header'> Filelist <span> <i class='icon icon-cog'></i> <a href='#' id='showAll'><i class='icon icon-folder'></i>all</a> <hr> <a href='#' id='showJs'><i class='icon icon-js'></i>javascript</a> <a href='#' id='showCss'><i class='icon icon-css'></i>css</a> <a href='#' id='showRoot'><i class='icon icon-html'></i>root</a> </span> </div>";

res += createList(jsFiles, 'adk-jsfilelist', 'Javascript', 'js/');

res += createList(cssFiles, 'adk-cssfilelist', 'CSS', 'css/');

res += createList(otherFiles, 'adk-otherfilelist', 'Root', '/');

filelist.innerHTML = res;

filelistWrapper.appendChild(filelist);

document.body.appendChild(filelistWrapper);

bind('showRoot', function(e) {
  e = event || window.event;
  e.preventDefault();
  showAllCategories();
  document.querySelector('.adk-jsfilelist').classList.add('disabled');
  return document.querySelector('.adk-cssfilelist').classList.add('disabled');
});

bind('showJs', function(e) {
  e = event || window.event;
  e.preventDefault();
  showAllCategories();
  document.querySelector('.adk-otherfilelist').classList.add('disabled');
  return document.querySelector('.adk-cssfilelist').classList.add('disabled');
});

bind('showCss', function(e) {
  e = event || window.event;
  e.preventDefault();
  showAllCategories();
  document.querySelector('.adk-jsfilelist').classList.add('disabled');
  return document.querySelector('.adk-otherfilelist').classList.add('disabled');
});

bind('showAll', function(e) {
  e = event || window.event;
  e.preventDefault();
  return showAllCategories();
});

document.onkeydown = function(event) {
  if (event.keyCode === 49) {
    document.body.style.overflow = 'hidden';
    document.getElementsByClassName('adk-fileslist-wrapper')[0].classList.add('active');
  }
};

document.onkeyup = function() {
  document.body.style.overflow = '';
  return document.getElementsByClassName('adk-fileslist-wrapper')[0].classList.remove('active');
};
