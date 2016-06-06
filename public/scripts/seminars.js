// seminars.js
// Alexander Rhett Crammer
// Monday, 6 June, 2016
$(document).ready(function () {
  $(window).on('resize load', function () {
    if ($(window).width() <= 950) {
      // Swap 'main' and 'aside'
      $('aside').before($('main'));
    } else {
      // Swap 'aside' and 'main'
      $('main').before($('aside'));
    }
  });
});
