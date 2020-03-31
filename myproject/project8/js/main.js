// wow installation
new WOW().init();
// wow instaletion end


// owl carousel runner

// property section
$('.property-carousel').owlCarousel({
    loop: true,
    margin: 30,
    nav: false,
    responsive: {
        0: {
            items: 1
        },
        750: {
            items: 2
        },
        1000: {
            items: 3
        }
    }
});


// news section
$('.news-carousel').owlCarousel({
    loop: true,
    margin: 30,
    nav: false,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 2
        },
        1000: {
            items: 3
        }
    }
});



// property-single-carousel
$('.ps-carousel').owlCarousel({
    loop: true,
    margin: 30,
    nav: true,
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
});


// testimonial section
$('.testimonial').owlCarousel({
    loop: false,
    margin: 10,
    nav: true,
    responsive: {
        0: {
            items: 1
        },
    }
});


// owl carousel runner end


// on scroll add class code
function Scroll() {
    var top = document.getElementById('top-nav');
    var X = document.getElementById('gtt-btn');
    var ypos = window.pageYOffset;
    if (ypos > 350) {
            top.classList.add('navbar-reduce');
            X.classList.add('display');
    } else {
        top.classList.remove('navbar-reduce');
        X.classList.remove('display');
    }
}
window.addEventListener("scroll", Scroll);
// ############



// cool scrolling effect
$(function() {
    var topoffset = 0; //variable for menu height

    //Use smooth scrolling when clicking on navigation
    $('.gtt-btn').click(function() {
      if (location.pathname.replace(/^\//,'') === 
        this.pathname.replace(/^\//,'') && 
        location.hostname === this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top-topoffset
          }, 500);
          return false;
        } //target.length
      } //click function
    }); //smooth scrolling
  });		

//   ###################

// on scroll add class code end


// search box collapse
$('.search-icon-btn').click(function(){
    $('.search-box-wrapper').addClass('search-box');
});

$('#btn-close').click(function(){
    $('.search-box-wrapper').removeClass('search-box');
});



