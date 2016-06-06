// product-detail.js
// Alexander Rhett Crammer
// Saturday, 30 April, 2016
$('.previews img').hover(function (e) {
  $('.large-image').attr('src', $(e.target).attr('src'));
});
