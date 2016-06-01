// profile.js
// Alexander Rhett Crammer
// Wednesday, 1 June, 2016

// Prevent a(href="#") from jumping to the top
$('a[href="#"]').click(function (e) {
  e.preventDefault();
});

// Show the appropriate form when
// sidebar links are clicked
$('.form-changer').click(function (e) {
  // Get the index of the link clicked
  // then show the appropriate form
  var chosenIndex = $(e.currentTarget).index();

  // Hide all of the forms
  $(document.forms).hide();

  // Show the form the user wants to see
  $(document.forms[chosenIndex]).show();
});
