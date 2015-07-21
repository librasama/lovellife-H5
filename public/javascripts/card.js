$(document).ready(function(){
    card.init();
    mask.init();
    tabs.init();
    searchbox.init();
    picked.init();
});

var info = {};
var card = {
    init:function() {
        info = JSON.parse($('#initInfos').val());
        $('#initInfos').remove();
        $('.member').on('click', picked.showCardInfo);
        $($(".tab-title").get(0)).addClass('on');
        $($(".tab").get(0)).addClass('on');
        $(".tab-title").click(function () {
            if ($(this).hasClass('on')) return;
            var i = $(this).index();
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

        $('.addBtn').on('click', function() {
            if ($('.playerIn').length != 9) {
                alert('缪斯果然必须九个人才行呢~！');return false;}

            /**
             *  TODO HTML5本地存储?????
             */
            var cleanUp = function(){
                $('.playerIn').removeClass('playerIn').addClass('add-player')
                    .append($('<span>+</span>')).unbind().on('click', mask.bringMask);
                $('.add-player img').remove();
                mask.pickedNum = 0;
                mask.enableNum = 9;
            };
            $.get('/team/count', true, function(ret){
                var tooMany = (parseInt(JSON.parse(ret).count) >= 5);
                if(tooMany) {alert('按国服的标准您的队伍太多...憋建了'); cleanUp();return;}
                team = {};
                team.name = $('.teamname').val();
                players = [];
                $('.playerIn img').each(function($idx, $player) {
                    console.log(info[$($player).attr('id')].card_id);
                    players.push(info[$($player).attr('id')].card_id);
                });
                team.players = players;
                $.post('/team/save', team, function (data) {
                    alert('主人，您的队伍已经建好啦~');
                    cleanUp();
                });
            });

        });
    }

};

var mask = {
    pickedTop: 0,
    pickedNum : 0,
    enableNum : 0,
    padLeft : 0 ,
    padLeft2 : 0 ,
    boxPadleft : 0,
    init:function() {
        $('.mask').on('click', function(e){
            $('.mask').hide();
            $('.peakbox').hide();
            $('.result-box').hide();
            $('.picked').remove();
            mask.resetPicked();
        });

        $('.peakbox').on('click', function(e){
            return false;
        });
        $('.add-player').on('click', mask.bringMask);
        $(window).resize(function(){
            mask.initPadding();
        });
        mask.initPadding();
        mask.initPick();
        mask.resetPicked();
    },
    initPick:function(){
        $('.grid-5-2').delegate('.player', 'click', function(e){
            if(mask.pickedNum >= mask.enableNum) {alert('已经超过九人了哦~！'); return;}
            mask.pickedNum++;
            console.log("pickedNum:"+mask.pickedNum+";enableNum:"+mask.enableNum);
            x = e.clientX;
            y = e.clientY;
            var flyOne = $(this).clone().addClass('picked');
            padleft = mask.pickedNum%2 == 0?mask.padLeft2:mask.padLeft;
            $(flyOne).fly({
                start:{
                    left: x,  //开始位置（必填）#fly元素会被设置成position: fixed
                    top: y  //开始位置（必填）
                },
                end:{
                    left: padleft, //结束位置（必填）
                    top: mask.pickedTop,  //结束位置（必填）
                    width: 60, //结束时高度
                    height: 60, //结束时高度
                },
                autoPlay: true, //是否直接运动,默认true
                speed: 1.1, //越大越快，默认1.2
                vertex_Rtop:100, //运动轨迹最高点top值，默认20
                onEnd: function(){} //结束回调
            });
            $('.picked span').remove();
            if(mask.pickedNum%2 == 0) mask.pickedTop += 70;
        });
    },
    initPadding : function(){
        var offset = $(window).width() /2 + 300 - mask.padLeft;
        console.log("offset:"+offset);
        mask.padLeft = $(window).width() /2 + 305 ;
        mask.padLeft2 = $(window).width() /2 + 370 ;
        mask. boxPadleft = $(window).width() /2 + 295;
        console.log("padLeft2:"+mask.padLeft2);
        $('.result-box').css('left', mask.boxPadleft);
        //重绘已选择的队员（有bug）
        if($('.picked').size() != 0) {
            $('.picked:nth-child(2n+1)').css('left', mask.boxPadleft+10);
            $('.picked:nth-child(2n)').css('left', mask.boxPadleft+75);
        }
    },
    resetPicked :function() {
        mask.pickedTop = 250;
        mask.pickedNum = 0;
        mask.enableNum = 9 - $('.playerIn').size();
    },
    bringMask:function(){
        $('.mask').toggle();
        $('.peakbox').toggle();
        $('.result-box').toggle();
    }
};
var searchbox = {
    init: function() {
        $('.search-btn').on('click', function() {
            searchbox.getPlayer(1, true);
        });

        $('.paging .next').on('click', function(){
            c = parseInt($(this).attr('page'));
            if(c>=2) {
                $('.paging .prev').css('visibility','visible');
                $('.paging .prev').attr('page', (c-1));
            }
            total = parseInt($('.paging .total').val());
            if(c < total) {
                $(this).attr("page", (c+1));
            }else {
                $('.paging .next').css('visibility','hidden');
            }
            searchbox.getPlayer(c, false);
        });
        $('.paging .prev').on('click', function(){
            c = parseInt($(this).attr('page'));
            $('.paging .next').css('visibility','visible');
            $('.paging .next').attr('page', (c+1));
            $(this).attr('page', (c-1));
            if(c==1) {
                $(this).css('visibility','hidden');
            }
            searchbox.getPlayer(c, false);
        });
    },
    getPlayer:function(page, init){
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
                if((count > 1) && init) {
                    if(parseInt($('.paging .next').attr("page")) <= count) {
                        $('.paging .next').css('visibility','visible');
                    } else {
                        $('.paging .next').css('visibility','hidden');
                    }
                    $('.paging .total').val(count);
                }
                $(rs.data).each(function($idx, $item) {
                    if(($idx%5) == 0 ) {
                        var newRow = $('<div class="row"></div>');
                        $('.grid-5-2').append(newRow);
                    }
                    src= "../upload/"+$item.card_normal;
                    if(!info[$item.card_normal]) {info[$item.card_normal] = $item};
                    var player = $('<div class="player"><img id="'+$item.card_normal+'" src="'+src+'"> <span>'+$item.card_name+'</span></div>');
                    $($(".peakbox .row").get(Math.floor($idx/5))).append(player);
                });
            } else {
                $('.paging .next').css('visibility','hidden');
                $('.paging .prev').css('visibility','hidden');
                $('.grid-5-2').append('换个条件试试吧~！');
            }
        });
    }
};

var picked = {
    init : function(){
        $('body').delegate('.picked', 'click', function(){
            mask.pickedNum--;
            mask.enableNum++;
            $(this).remove();
            $('.picked:nth-child(2n+1)').css('left', mask.boxPadleft+10);
            $('.picked:nth-child(2n)').css('left', mask.boxPadleft+75);
            mask.pickedTop = 250;
            $('.picked').each(function($idx, $item){
                $($item).css('top', mask.pickedTop);
                if($idx >0 && (($idx%2) == 1)) mask.pickedTop += 70;
            });
        });
        picked.addNewPlayer();
    },
    addNewPlayer:function(){
        $('.fin-btn').on('click', function(){
            var begin = $('.playerIn').size();
            $('.picked').each(function($idx, $item){
                var txt = $($item).clone().removeClass('picked').html();

                $('#player'+(parseInt($idx)+begin)).empty().append($(txt)).unbind()
                    .removeClass('add-player').addClass('playerIn')
                    .on('click', picked.showCardInfo);
            });
            //关掉mask;
            $('.mask').trigger('click', null);
        });
    },
    showCardInfo:function() {
        var id = $(this).find('img').attr('src').replace('../upload/', '');
        var item = info[id];
        if(item == null) {
        //url获取信息
        }
        var img = item.card_normal.replace('face', 'card');
        console.log(img);
        //{"_id":"559fda2fe1dd13382cff0000","lovelive_grade":"N","card_name":"近江遥",
        // "card_fullid":"No. 19","card_id":"19","card_normal":"face_0019.png","card_horo":"face_0019_horo.png","hp_01":1,"hp_02":1,"hp_03":2,
        // "smile_01":1760,"smile_02":2040,"smile_03":2140,"pure_01":600,"pure_02":780,"pure_03":840,
        // "cool_01":360,"cool_02":500,"cool_03":550,"card_type":"smile","__v":0,"char":"近江遥"}
        $('.card .flipper .front').css('background', "url('../../upload/"+img+"') 0 0 no-repeat");
        $('.card .flipper .front').css('background-size', "100% 100%");
        $('.card .flipper .back').css('background', "url('../../upload/"+img.replace('.png', '_horo.png')+"') 0 0 no-repeat");
        $('.card .flipper .back').css('background-size', "100% 100%");
        $('.cardinfo .face-normal').attr('src', '../../upload/'+item.card_normal);
        $('.cardinfo .face-horo').attr('src', '../../upload/'+item.card_horo);
        $('.cardinfo #name').text(item.card_name);
        $('.cardinfo #type').text(item.card_type);
        $('.cardinfo #power').text(item.hp_01 + " " + item.hp_02 + " " + item.hp_03);
        $('.cardinfo #smile').text(item.smile_01 + " " + item.smile_02 + " " + item.smile_03);
        $('.cardinfo #pure').text(item.pure_01 + " " + item.pure_02 + " " + item.pure_03);
        $('.cardinfo #cool').text(item.cool_01 + " " + item.cool_02 + " " + item.cool_03);
        $('.cardinfo #skill').text(item.skill);
    }
}
var tabs = {
    init:function(){
        tabs.initDel();

    },
    initDel:function() {
        $('.del-team').on('click', function(){
            //弹出确认删除对话框
            var del =  $(this);
            var delCb = function() {
                var team = {};
                team.id = del.attr('id');
                console.log("team.id : " + team.id);
                $('.tabs .on').remove();
                $('.tabs .tab-titles span').eq(0).addClass('on');
                $('.tabs .tab').eq(0).addClass('on');
                $.post('/team/del', team, function(data, status){
                    var rs = JSON.parse(data);
                    if(rs.flag || "true" == rs.flag) {
                        alert('删除成功');
                    }
                });
            };
            if(confirm('真的要删除吗？')) {
                delCb();
            } else {
                return;
            }

        });
    }
};
