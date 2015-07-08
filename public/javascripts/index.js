$(document).ready( function($) {
    if( $.fn.fsvs ) {
        var slider = $.fn.fsvs({
            speed : 1000,
            nthClasses : 4,
            mouseDragEvents : false
        });
    }
    var fsvs = $.fn.fsvs({
        speed : 1000,
        bodyID : 'full-screen',
        selector : '> .slide',
        mouseSwipeDisance : 40,
        afterSlide : function(){},
        beforeSlide : function(){},
        endSlide : function(){},
        mouseWheelEvents : true,
        mouseDragEvents : true,
        touchEvents : true,
        arrowKeyEvents : true,
        pagination : true,
        nthClasses : false,
        detectHash : true
    });
    if( $.fn.fsvs ) {
        var slider = $.fn.fsvs({
            speed : 1000,
            nthClasses : 4,
            mouseDragEvents : false
        });
    }

    if( $.fn.flare ) {
        var flares = $('.flare').flare();
        for( var flare in flares ) {
            //flares[flare].reset();
        }
    }

    var sectionHeight = $('#full-screen > .slide:eq(0)').height();
    $('#full-screen > .slide').each( function(){
        var section = $(this),
            item = $('.item', section ),
            demo = $('.demo', section ),
            itemHeight = item.outerHeight(),
            demoHeight = demo.outerHeight();
        item.css({
            marginTop : ( ( sectionHeight - itemHeight ) / 2 ) + 'px'
        });
        demo.css({
            marginTop : ( ( sectionHeight - demoHeight ) / 2 ) + 'px'
        });

    });
    var sectionHeight = $('#full-screen > .slide:eq(0)').height();
    console.log("height:"+sectionHeight);
    $('#full-screen > .slide').each( function(){
        $(this).css({'height':$(window).height()} )
            //item = $('.item', section ),
            //demo = $('.demo', section ),
            //itemHeight = item.outerHeight(),
            //demoHeight = demo.outerHeight();

    });
});