(function ($) {
    "use strict";
    var windowOn = $(window); 

  if ($('.ui-drag-wrapper').length) {
    $('.ui-drag-element').draggable({
      scroll: true,
      cursor: "move",
      containment: "body",
      start: function(event, ui) {
        $(this).css('z-index', 9999);
      },
      stop: function(event, ui) {
        $(this).css('z-index', '');
      }
    });
  }


})(jQuery);