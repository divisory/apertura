var formValidation, validateEmail;

validateEmail = function(email) {
  var re;
  re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return re.test(email);
};

formValidation = function() {
  var dataElements, inp, j, len, status;
  status = true;
  dataElements = document.querySelectorAll('#regForm input, #regForm textarea');
  for (j = 0, len = dataElements.length; j < len; j++) {
    inp = dataElements[j];
    if (!$(inp).hasClass('btn')) {
      if ($(inp).hasClass('email')) {
        if (!validateEmail($(inp).val())) {
          $(inp).parent().addClass('error');
          status = false;
        } else {
          $(inp).parent().removeClass('error');
          status = true;
        }
      } else {
        if ($(inp).val().trim().length < 3) {
          $(inp).parent().addClass('error');
          status = false;
        } else {
          $(inp).parent().removeClass('error');
          status = true;
        }
      }
    }
  }
  return status;
};

$(document).ready(function() {
  var $daysSlider, $daysWrap, $monthsWrap, CURRENT_SLIDE, FULLPAGE, setMenuOffset, showPhotos, windowHeight, windowWidth;
  CURRENT_SLIDE = 1;
  windowWidth = function() {
    var w;
    w = 0;
    if (window.innerWidth > window.outerWidth) {
      w = window.outerWidth;
    } else {
      w = window.innerWidth;
    }
    return w;
  };
  windowHeight = function() {
    var w;
    w = 0;
    if (window.innerHeight > window.outerHeight) {
      w = window.outerHeight;
    } else {
      w = window.innerHeight;
    }
    return w;
  };
  setMenuOffset = function() {
    $('#fullpage-menu').css({
      left: ($('.container').eq(0).offset().left + $('.container').eq(0).width()) + 'px',
      opacity: 1
    });
  };
  setMenuOffset();
  FULLPAGE = $('#fullpage').fullpage({
    menu: '#fullpage-menu',
    responsiveWidth: 991,
    anchors: ['about', 'quests', 'news', 'corp', 'gifts', 'contacts', 'photos'],
    onLeave: function(index, nextIndex, direction) {
      CURRENT_SLIDE = nextIndex;
      if (nextIndex > 1) {
        $('#fullpage-menu').addClass('bigger');
        return $('.callme').addClass('leftside');
      } else {
        $('#fullpage-menu').removeClass('bigger');
        if (windowWidth() > 992) {
          return $('.callme').removeClass('leftside');
        }
      }
    }
  });
  if (windowWidth() < 993) {
    $('.callme').addClass('leftside');
  }
  $('#fullpage-menu').on('click', '#prevSlideBtn', function(e) {
    e.preventDefault();
    return $.fn.fullpage.moveSectionUp();
  });
  $daysSlider = $("#cyclepages");
  $daysWrap = $daysSlider.parent();
  if (windowWidth() > 768) {
    $daysSlider.find('li').css('width', $('.big-table:not(.clear) tr td').eq(0).width() + 'px');
  }
  $daysSlider.sly({
    horizontal: 1,
    itemNav: "basic",
    smart: 1,
    activateOn: "click",
    mouseDragging: 1,
    touchDragging: 1,
    releaseSwing: 1,
    startAt: 0,
    scrollBy: 1,
    activatePageOn: "click",
    speed: 300,
    elasticBounds: 1,
    easing: "easeOutExpo",
    dragHandle: 1,
    dynamicHandle: 1,
    clickBar: 1,
    cycleBy: "pages",
    startPaused: 1,
    prevPage: $daysWrap.find(".prevPage"),
    nextPage: $daysWrap.find(".nextPage")
  });
  $('[data-toggle="tooltip"]').tooltip();
  $daysSlider = $("#cyclemonths");
  $monthsWrap = $daysSlider.parent();
  $daysSlider.sly({
    horizontal: 1,
    itemNav: "basic",
    smart: 1,
    activateOn: "click",
    mouseDragging: 1,
    touchDragging: 1,
    releaseSwing: 1,
    startAt: 0,
    scrollBy: 1,
    activatePageOn: "click",
    speed: 300,
    elasticBounds: 1,
    easing: "easeOutExpo",
    dragHandle: 1,
    dynamicHandle: 1,
    clickBar: 1,
    prevPage: $monthsWrap.find(".prevMonth"),
    nextPage: $monthsWrap.find(".nextMonth")
  });
  showPhotos = function() {
    $('.page-wrapper:not(.inner-wrapper) .photo-col').show();
    if (windowHeight() > 800) {
      return $('.page-wrapper:not(.inner-wrapper) .photo-col').each(function(i, photo) {
        if (i > 11) {
          return $(photo).hide();
        }
      });
    } else {
      return $('.page-wrapper:not(.inner-wrapper) .photo-col').each(function(i, photo) {
        if (i > 7) {
          return $(photo).hide();
        }
      });
    }
  };
  showPhotos();
  lightbox.option({
    'resizeDuration': 200,
    'wrapAround': true
  });
  $(window).scroll(function() {
    if ($(window).scrollTop() > 0) {
      return $('.callme').addClass('leftside');
    } else {
      if (windowWidth() > 992) {
        return $('.callme').removeClass('leftside');
      }
    }
  });
  $(window).scroll();
  $(window).resize(function() {
    setMenuOffset();
    return showPhotos();
  });
});
