$(document).ready(function(){
    $.getJSON('data/player.json', function(data){

    });
    card.init();
});

var card = {
    init:function() {
        $($(".tab-title").get(0)).addClass('on');
        $($(".tab").get(0)).addClass('on');
        $(".tab-title").click(function () {
            if ($(this).hasClass('on')) return;
            var i = parseInt($(this).attr("tab-rel")) - 1;
            $(".tab-title").removeClass("on");
            $($(".tab-title").get(i)).addClass("on");
            $(".tab").removeClass("on");
            $($(".tab").get(i)).addClass("on");

        });
        $('.team').delegate('.func', 'click', null, function() {
            $('.team .title .func').empty();
            if($(this).attr('id') == 'addteam') {
                $('.team .tabs').hide();
                $('.team .addbox').show();
                $('.team .title .func').attr('id', 'listteam').append('<');
            } else {
                $('.team .tabs').show();
                $('.team .addbox').hide();
                $('.team .title .func').attr('id', 'addteam').append('+');
            }
        });
        card.maskInit();
        $('.search-btn').on('click', function(){
            param = $(this).parent();
            var obj = {};
            obj.char = $(param).find('#char').val();
            obj.prop = $(param).find('#prop').val();
            obj.type = $(param).find('#type').val();
            $.post('/card/search', obj, function(){
                console.log("wwwww");
            });
        });
        $('.addBtn').on('click', function() {
            if ($('.grid .add-player').length != 0) {
                alert('缪斯果然必须九个人才行呢~！');return false;}
            $.get('/team/count', true, function(){
                tooMany = count >= 5;
            });
            if(tooMany) {alert('按国服的标准您的队伍太多...憋建了');}
            team.name = $('.teamname').val();
            team.players = [1,1,1,1,1,1,1,1,1];//九个id
            $.post('/team/save', team, function (data) {
            });
        });

    },
    maskInit:function() {
        $('.mask').on('click', function(e){
            $('.mask').hide();
            $('.peakbox').hide();
        });

        $('.peakbox').on('click', function(e){
            return false;
        });
        $('.add-player').on('click', function(){
            $('.mask').toggle();
            $('.peakbox').toggle();
        });
    }
};