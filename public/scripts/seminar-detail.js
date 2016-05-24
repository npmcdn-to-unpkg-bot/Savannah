// seminar-detail.js
// Alexander Rhett Crammer
// Monday, 2 May, 2016

// Stars for Review Submission
$('form .stars').click(function (e) {
  var clickedStar = $(e.target);
  $('input[name="star_count"]').val(clickedStar.index() + 1);

  // Hollowize or fill other stars
  clickedStar.siblings().andSelf().each(function (index, siblingStar) {
    if (clickedStar.index() < index) {
      $(siblingStar).attr({
        src: '/icons/unstar.png',
        alt: 'Hollow Star'
      });
    } else {
      $(siblingStar).attr({
        src: '/icons/star.png',
        alt: 'Star'
      });
    }
  });
});
