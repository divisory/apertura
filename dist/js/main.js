(function() {
  $(document).ready(function() {
    var handle;
    handle = function(hash) {
      var to;
      to = $(hash).position().top - 60;
      $('html,body').animate({
        scrollTop: to
      }, 1000);
      return location.hash = hash;
    };
    $('.anchors li a').click(function(e) {
      e.preventDefault();
      return handle("" + ($(this).attr('href')));
    });
    if (location.hash.length > 0) {
      handle(location.hash);
    }
    $('.show-menu').click(function(e) {
      e.preventDefault();
      $(this).toggleClass('active');
      return $('.main-nav').toggleClass('active');
    });
  });

}).call(this);
