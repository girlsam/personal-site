(function() {
  'use strict';

  function toggle_visibility(id) {
    var e = document.getElementById(id);
    if(e.style.display == 'block') {
      e.style.display = 'none';
    } else {
      e.style.display = 'block';
    }
  }

}());

// $('#contact').on('click', function(e) {
//   e.preventDefault();
//   if ($('.icon-container').hasClass('slideDown')) {
//     $('.icon-container').removeClass('slideDown');
//   } else {
//     $('.icon-container').addClass('slideDown');
//   }
// });
//
// $('#about').on('click', function(e) {
//   e.preventDefault();
//   if ($('.content').hasClass('slideDown')) {
//     $('.content').removeClass('slideDown');
//   } else {
//     $('.content').addClass('slideDown');
//   }
// });
