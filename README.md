Apertura
========

Интструменты для быстрой и комфортной разработки веб-приложений.

Для корректной работы необходимы Node.js, Gulp.js и модули к нему.
* Node.js (платформа)        >= 0.10.33
* Gulp.js (Сборщик проектов) >= 3.0.8
* NPM (Node Package Manager) >= 1.4.28

###Apertura
<ul>
  <li><a href="#aWhatIsThis">Что это такое?</a></li>
  <li><a href="#aStructure">Структура</a></li>
  <li><a href="#aConfig">Конфиг + запуск</a></li>
  <li><a href="#aGrid">Grid</a></li>
  <li><a href="#aDefaults">Default styles</a></li>
  <li><a href="#aADK">Apertura Development Kit</a></li>
</ul>

<h4 id="aWhatIsThis">Что это такое?</h4>
Apertura – это целый копмлекс инструментов и решений, которые направлены на упрощение жизни разработчика при работе с новым проектом. Мы собрали самые нужные дополнения по разработке и отладке для FrontEnd-разработчика и  запаковали это все в единую крепкую систему.

<h4 id="aStructure">Структура</h4>
`
|- Current project<br>
|- coffee/<br>
|  |- main.coffee<br>
|- dev-tools/<br>
|  |- dev-tools-css/<br>
|  |- dev-tools-img/<br>
|  |- dev-tools-js/<br>
|  |- dev-tools-templates/<br>
|  |  |- _320.png<br>
|  |  |- _360.png<br>
|  |  |- _480.png<br>
|  |  |- _640.png<br>
|  |  |- _768.png<br>
|  |  |- _960.png<br>
|  |  |- _1024.png<br>
|  |  |- _1140.png<br>
|  |  |- _1280.png<br>
|  |  |- _1400.png<br>
|  |- list.json<br>
|- dist/<br>
|  |- css/<br>
|  |  |- full/<br>
|  |- img/<br>
|  |- js/<br>
|  |  |- vendor/<br>
|- html/<br>
|  |- includes/<br>
|- psd/<br>
|- scss/<br>
|  |- _default/<br>
|  |  |- _default.scss<br>
|  |  |- _fonts.scss<br>
|  |  |- _indents.scss<br>
|  |  |- _normalize.scss<br>
|  |- _media/<br>
|  |  |- _480.scss<br>
|  |  |- _768.scss<br>
|  |  |- _1024.scss<br>
|  |- _mixins/<br>
|  |  |- _mixins.scss<br>
|  |- _pages/<br>
|  |  |- _footer.scss<br>
|  |  |- _header.scss<br>
|  |  |- _main.scss<br>
|  |  |- _typical.scss<br>
|  |- _calc.scss<br>
|  |- _config.scss<br>
|  |- _func.scss<br>
|  |- _grid_flexbox.scss<br>
|  |- _grid.scss<br>
|  |- _skin.scss<br>
|- config.rb<br>
|- gulpfile.coffee<br>
|- package.json<br>
|- project_log.txt<br>
|- README.txt
`
<br>
coffee - содержит .coffee-файлы, которые компилируются в файлы *.js и помещяются в папку dist/js/ с таким же названием, как и исходник.
<br>
dev-tools - инструменты разработчика. Тут находятся инструменты, дополняющие систему. Им уделим особое внимание далее.
<br>
dist - скомпилированный чистый проект без исходников. Тут лежат и картинки, и скрипты и сами страницы.
<br>
В папке dist/css/full лежат не минифицированные *.css-файлы, а директорией выше, в папке dist/css/  лежат минифицированные файлы.
<br>
html - тут лежат *.html файлы, которые пропускаются через фильтр для поиска инклуда других файлов. По умолчанию папка со включаемыми файлами находится тут же: /html/includes/. Чтобы вставить файл пропишите директиву и используйте относительный путь:
<br>
#include 'includes/myfileincluded.html'
psd - папка с макетами проректа
<br>
scss - тут находится вся система сетки, и все ее компоненты и модули. Так же тут находится конфиг всей системы. Папка _default содержит фйлы, задающие нормальное отображение элементов, конструируют классы для работы со шрифтами и отступами. _media - содержит файлы для адаптации проекта под разные устройства. _mixins - миксины (аналоги функций), вызываются в любом месте кода с помощью @include (@include transform(scale(2.2));). _pages - для облегчения разработки и для большего понимания - стили разбиваются на 4 основных блока: стили хедера (header.scss), футера (footer.scss), основного тела страницы (main.scss) и стили для типичной страницы (контентная часть) (typical.scss).



Модули дял установки: 
coffee-script gulp-coffee gulp-connect gulp-clean gulp-uglify gulp-sass colors gulp-include gulp-cssmin gulp-rename gulp-filelist gulp-using map-stream gulp-plumber


<div id="ddd">daas</div>
