// cart.js
// Alexander Rhett Crammer
// Monday, 2 May, 2016

// Prevent Form Submission
$('form').submit(function (e) {
  e.preventDefault();
  $(e.target).find('button').attr('disabled', 'disabled');
});

// Remove items from the users' cart when they delete them
$('.delete').click(function (e) {
  var productToDeleteASIN = $(e.currentTarget).closest('section').data('product-asin');
  $.ajax({
    url: '/cart/delete/',
    method: 'POST',
    data: {asin: productToDeleteASIN},
    success: function (response) {
      if (response == 'OK') {
        // The item was deleted so
        // we can get rid of it
        $('section[data-product-asin="' + productToDeleteASIN + '"]').hide();
      }
    }
  });
});
