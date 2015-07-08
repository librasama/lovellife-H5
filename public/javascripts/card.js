$(document).ready(function(){
    $.getJSON('data/player.json', function(data){

    });
    card.init();
});

var card = {
    init:function(){
        $($(".tab-title").get(0)).addClass('on');
        $($(".tab").get(0)).addClass('on');
        $(".tab-title").click(function(){
            if($(this).hasClass('on')) return;
            var i = parseInt($(this).attr("tab-rel"))-1;
            $(".tab-title").removeClass("on");
            $($(".tab-title").get(i)).addClass("on");
            $(".tab").removeClass("on");
            $($(".tab").get(i)).addClass("on");

        });
    }
};