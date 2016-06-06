// Pancake Button
var pancakes = $('.pancakes');
var nav = $('nav');
var navShouldBePink = !$('nav').hasClass('pink-to-darker-pink');
$(pancakes).click(function () {
  if (navShouldBePink) {
    // Get rid of the navigation background
    nav.toggleClass('pink-to-darker-pink');
  }
  pancakes.children('span').toggleClass('crossed');
  nav.toggleClass('visible');
});

// Prevent a(href="#") from jumping to the top
$('a[href="#"]').click(function (e) {
  e.preventDefault();
});

// Google Analytics
$(document).ready(function () {
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-76976632-1', 'auto');
  ga('send', 'pageview');
});
