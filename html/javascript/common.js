(function ($, undefined) {
    "use strict"

    $.fn.equalHeights = function() {
        var max = 0;
        this.each(function() {
            max = Math.max( max, $(this).height() );
        });
        return $(this).height(max);
    };

    //  no-js
    $('html').removeClass('no-js');

    if($("#frontpage-slider").length) {
        $("#frontpage-slider").carouFredSel({
            auto : false,
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
    });

    $('.advantage__line').each(function() {
        $(this).find('.advantage__item-title').equalHeights();
        $(this).find('.advantage__item-img').equalHeights();
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

})(jQuery);