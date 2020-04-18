// On scroll add class
$(window).scroll(function(){
    if ($(this).scrollTop() > 200) {
       $('.navbar').addClass('scroll');
    } else {
       $('.navbar').removeClass('scroll');
    }
});
// On scroll add class End


// Wow init
new WOW().init();


// Typed script
var typed3 = new Typed('.type', {
    strings: [
    'Good At: Html5 & css3',
    'Good At: twitter bootstrap',
    'Good At: jquery',
    'Good At: javascript',
    'I Will do: parsonal website design',
    'I will do: blog design',
    'I will do: landing page design',
    'I will do: psd to html5 conver'
    ],

   typeSpeed: 30,
    backSpeed: 30,
    backDelay: 1000,
    startDelay: 1000,
    smartBackspace: true, // this is a default
    loop: true
});
// Typed script End


// Isotop script
$('.portfolios').isotope({
    itemSelector: '.item',
    layoutMode: 'fitRows'
});

$('.portfolio-menu ul li').click(function () {
    $('.portfolio-menu ul li').removeClass('active');
    $(this).addClass('active');

    var selector = $(this).attr('data-filter');
    $('.portfolios').isotope({
        filter: selector
    });

    return false;
});
// Isotop script End


// Owl carousel script
$(document).ready(function(){
    $(".owl-carousel").owlCarousel();
  });


  $('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 1
        },
        1000: {
            items: 1
        }
    }
})
// Owl carousel script Emd