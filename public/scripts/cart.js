// cart.js
// Alexander Rhett Crammer
// Monday, 2 May, 2016

// Prevent Form Submission
$('form').submit(function (e) {
  e.preventDefault();
  $(e.target).find('button').attr('disabled', 'disabled');
});
