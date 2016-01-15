$(function () {
  $('.side-nav .nav > li > a').on('click', function () {
    //check if current li is active
    //if it is, remove active and collapse next
    //if its not, add active and expand next
    //if its a link inside an expanded next, add active class to parent parent
    if ($(this).parent().hasClass('active')) {
      $('.side-nav .nav li').removeClass('active');
      $(this).parent().removeClass('active');
      $(this).next().addClass('hidden');
      $(this).find('span').removeClass('icon-chevron-down').addClass('icon-chevron-right');
    } else {
      $('.side-nav .nav li').removeClass('active');
      $(this).parent().addClass('active');
      $(this).next().removeClass('hidden');
      $(this).find('span').removeClass('icon-chevron-right').addClass('icon-chevron-down');
    }

  });

  $('.side-nav .nav > li > ul > li > a').on('click', function () {
    if ($(this).parent().parent().parent().hasClass('active')) {
      $(this).parent().siblings().removeClass('active');
      $(this).parent().addClass('active');
    } else {
      $('.side-nav .nav > li').removeClass('active');
      $(this).parent().siblings().removeClass('active');
      $(this).parent().parent().parent().addClass('active');
      $(this).parent().addClass('active');
    }

  })
});


$('.mask-date').mask("00/00/0000", {placeholder: "__/__/____"});
$('.mask-phone').mask("(000) 000-0000", {placeholder: "(___) ___-___"});
$('.mask-phone-extension').mask("(000) 000-0000  ext: 000000", {placeholder: "(___) ___-___  ext: ______"});
$('.mask-zip').mask("00000-0000", {placeholder: "_____-____"});

// Affix left side bar navigation
$(document).ready(function () {/* activate sidebar */
  $('#sidebar').affix({
    offset: {
      top: 10
    }
  });

  /* activate scrollspy menu */
  var $body = $(document.body);
  var navHeight = $('.navbar').outerHeight(true) + 10;

  $body.scrollspy({
    target: '#leftCol',
    offset: navHeight
  });

});

/* This was added as a prototyping way of show/hide content via a SELECT MENU OPTION VALUE */
//add collapse to all tags hiden and showed by select mystuff
$('#tab-organization_demographics').on('change', '.organization_type', function () {
  var $this = $(this);
  var $selectedText = $this.find(':selected').text();
  var $col = $this.parents('div.organization_demographics').children('div.organization_type-bga');

  if ($selectedText === 'BGA') {// THIS SCRIPT LOOKS AT THE OP
    $col.collapse('show');
    $(".bga-nav").css("display", "block");

  } else {
    $col.collapse('hide');
    $(".bga-nav").css("display", "none");
    ClearFormFields($col);
  }
});
