(function ($, undefined) {
    "use strict"

    $.fn.equalHeights = function() {
        var max = 0;
        $(this).each(function() {
            max = Math.max( max, $(this).height() );
        });
        return $(this).height(max);
    };

    //  no-js
    $('html').removeClass('no-js');

    if($("#frontpage-slider").length) {
        $("#frontpage-slider").carouFredSel({
            auto : {
                play : true,
                timeoutDuration : 4000
            },
            prev : "#frontpage-slider__prev",
            next : "#frontpage-slider__next"
        });
    }

    if($("#slider").length) {
        $("#slider").carouFredSel({
            auto : false,
            prev : "#slider__prev",
            next : "#slider__next",
            pagination  : "#carousel-pagination"
        });
    }

    if($("#slider-1").length) {
        $("#slider-1").carouFredSel({
            auto : false,
            prev : "#slider__prev-1",
            next : "#slider__next-1",
            pagination  : "#carousel-pagination-1"
        });
    }

    if($("#content-slider").length) {
        $("#content-slider").carouFredSel({
            auto : false,
            pagination  : "#content-slider-pagination"
        });
    }

    $('.service').each(function() {
        $(this).find('.service__item-title').equalHeights();
        $(this).find('.service__item-list').equalHeights();
    });

    $('#corpCodeTo').on("click", function(e) {
        if($("#corpCode").length) {
            e.preventDefault();
            $("#corpCode")[0].scrollIntoView(true);
        } else {
            e.preventDefault();
        }
    });

    $('.page-navigation__menu').on('click', 'a', function(e) {
        $(this).siblings('a').removeClass('active');
        $(this).addClass('active');
    });

    $('.list-price').on('click', 'li', function(e) {
        e.preventDefault();
        $(this).toggleClass('open');
    });

    if($("#image-popup-1").length) {
        $("#image-popup-1").fancybox({
            helpers: {
                title : {
                    type : 'float'
                }
            }
        });
    }

    if($("#image-popup-2").length) {
        $("#image-popup-2").fancybox({
          helpers: {
              title : {
                  type : 'float'
              }
          }
        });
    }

    if($("#image-popup-3").length) {
        $("#image-popup-3").fancybox({
            helpers: {
                title : {
                    type : 'float'
                }
            }
        });
    }

    if($("#popup-callback").length) {
        $("#popup-callback-btn").fancybox();
    }
})(jQuery);
