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
        $('.search-btn').on('click', function() {
            card.getPlayer(1);
        });

        $('.paging .next').on('click', function(){
            c = parseInt($(this).attr('page'));
            if(c>=2) {$('.paging .prev').attr('page', c-1);$('.paging .prev').css('visibility','visible');}
            total = parseInt($('.paging .total').val());
            if(c < total) {
                $($('.paging .next').get(0)).attr("page", c+1);
            } else {
                $(this).css('visibility','hidden');
            }
            card.getPlayer(c);
        });
        $('.paging .prev').on('click', function(){
            c = parseInt($(this).attr('page'));
            $($('.paging .next').get(0)).attr('page', c+1);
            $('.paging .next').css('visibility','visible');
            $(this).attr('page', c-1);
            if(c==1) {
                $(this).css('visibility','hidden');
            }
            card.getPlayer(c);
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
    getPlayer:function(page){
        param = $('.condition');
        var obj = {};
        obj.char = $(param).find('#char').val();
        obj.prop = $(param).find('#prop').val();
        obj.type = $(param).find('#type').val();
        obj.total = $('.peakbox .total').val();
        obj.page = page;
        $.post('/card/search', obj, function (data, status) {
            $('.grid-5-2').empty();
            console.log(data);
            rs = $.parseJSON(data);
            if(rs.flag) {
                count = rs.total;
                console.log("total:"+count);
                if(count > 1) {
                    $('.paging .next').css('visibility','visible');
                    $('.paging .next').attr('page', '2');
                    $('.paging .total').val(count);
                }
                $(rs.data).each(function($idx, $item) {
                    if(($idx%5) == 0 ) {
                        var newRow = $('<div class="row"></div>');
                        $('.grid-5-2').append(newRow);
                    }
                    src= "../upload/"+$item.card_normal;
                    var player = $('<div class="player"><img src="'+src+'"> </div>');
                    $($(".peakbox .row").get(Math.floor($idx/5))).append(player);
                });
            } else {
                //空结果集
                $('.grid-5-2').append('换个条件试试吧~！');
            }
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