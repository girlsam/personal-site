(function() {
  'use strict';

var dates = ["8/15/2016", "9/01/2016", "10/01/2016", "10/15/2016", "11/01/2016"];
var monthSpan = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function dateSpan(date) {
  var month = date.split('/')[0];
  month = monthSpan[month - 1];
  var day = date.split('/')[1];
  if (day.charAt(0) == '0') {
    day = day.charAt(1);
  }
  var year = date.split('/')[2];
  return month + " " + year;
}

function makeCircles() {
  if (dates.length < 2) {
    $("#line").hide();
    $("#span").show().text(dateSpan(dates[0]));
  } else if (dates.length >= 2) {
    var first = dates[0];
    var last = dates[dates.length - 1];

    var firstMonth = parseInt(first.split('/')[0]);
    var firstDay = parseInt(first.split('/')[1]);

    var lastMonth = parseInt(last.split('/')[0]);
    var lastDay = parseInt(last.split('/')[1]);

    var lastInt = ((lastMonth - firstMonth) * 30) + (lastDay - firstDay);

    //creates first circle
    $("#line").append('<div class="circle" id="circle0" style="left: ' + 0 + '%;"><div class="popupSpan">' + dateSpan(dates[0]) + '</div></div>');

    //displays first span for content (first circle, first span)
    $("#mainCont").append('<span id="span0" class="center">' + $("#proj0").html () +  '</span>');


    for (var i = 1; i < dates.length - 1; i++) {
      var thisMonth = parseInt(dates[i].split('/')[0]);
      var thisDay = parseInt(dates[i].split('/')[1]);

      var thisInt = ((thisMonth - firstMonth) * 30) + (thisDay - firstDay);

      var relativeInt = thisInt / lastInt;

      //creates middle circles
      $("#line").append('<div class="circle" id="circle' + i + '" style="left: ' + relativeInt * 100 + '%;"><div class="popupSpan">' + dateSpan(dates[i]) + '</div></div>');

      //creates all middle spans
      $("#mainCont").append('<span id="span' + i + '" class="right">' + $("#proj" + i).html() + '</span>');

    }

    //creates last circle
    $("#line").append('<div class="circle" id="circle' + i + '" style="left: ' + 99 + '%;"><div class="popupSpan">' + dateSpan(dates[dates.length - 1]) + '</div></div>');

    //last content span
    $("#mainCont").append('<span id="span' + i + '" class="right">' + $("#proj4").html() + '</span>');

  }

  $(".circle:first").addClass("active");
}

makeCircles();

$(".circle").mouseenter(function() {
  $(this).addClass("hover");
});

$(".circle").mouseleave(function() {
  $(this).removeClass("hover");
});

$(".circle").click(function() {
  var spanNum = $(this).attr("id");
  selectDate(spanNum);
});

function selectDate(selector) {
  var $selector = "#" + selector;
  var $spanSelector = $selector.replace("circle", "span");
  var current = $selector.replace("circle", "");

  $(".active").removeClass("active");
  $($selector).addClass("active");

  if ($($spanSelector).hasClass("right")) {
    $(".center").removeClass("center").addClass("left")
    $($spanSelector).addClass("center");
    $($spanSelector).removeClass("right")
  } else if ($($spanSelector).hasClass("left")) {
    $(".center").removeClass("center").addClass("right");
    $($spanSelector).addClass("center");
    $($spanSelector).removeClass("left");
  };
};

}());
