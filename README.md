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
<code>
|- Current project
|- coffee/
|  |- main.coffee
|- dev-tools/
|  |- dev-tools-css/
|  |- dev-tools-img/
|  |- dev-tools-js/
|  |- dev-tools-templates/
|  |  |- _320.png
|  |  |- _360.png
|  |  |- _480.png
|  |  |- _640.png
|  |  |- _768.png
|  |  |- _960.png
|  |  |- _1024.png
|  |  |- _1140.png
|  |  |- _1280.png
|  |  |- _1400.png
|  |- list.json
|- dist/
|  |- css/
|  |  |- full/
|  |- img/
|  |- js/
|  |  |- vendor/
|- html/
|  |- includes/
|- psd/
|- scss/
|  |- _default/
|  |  |- _default.scss
|  |  |- _fonts.scss
|  |  |- _indents.scss
|  |  |- _normalize.scss
|  |- _media/
|  |  |- _480.scss
|  |  |- _768.scss
|  |  |- _1024.scss
|  |- _mixins/
|  |  |- _mixins.scss
|  |- _pages/
|  |  |- _footer.scss
|  |  |- _header.scss
|  |  |- _main.scss
|  |  |- _typical.scss
|  |- _calc.scss
|  |- _config.scss
|  |- _func.scss
|  |- _grid_flexbox.scss
|  |- _grid.scss
|  |- _skin.scss
|- config.rb
|- gulpfile.coffee
|- package.json
|- project_log.txt
|- README.txt
</code>



Модули дял установки: 
coffee-script gulp-coffee gulp-connect gulp-clean gulp-uglify gulp-sass colors gulp-include gulp-cssmin gulp-rename gulp-filelist gulp-using map-stream gulp-plumber


<div id="ddd">daas</div>
