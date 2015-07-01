$(document).ready(
    function(){
        var c = document.getElementById('canvas');
        var ctx = stage.initStage(c, 800, 640, 2);
        stage.initFixedCircle(ctx, coord.fixArc, setting.fixArc, color.fixArc);
        stage.drawCenterStar(ctx, coord.star, setting.star, color.star);
        stage.circleAnime(ctx, coord.moveArcS, coord.moveArcE, setting.animeTime);
    }
);

var coord = {
    star:{x:400, y:100},
    fixArc:{x:400, y:550},
    moveArcS:{x:400, y:150},
    moveArcE:{x:400, y:614}

};
var color = {
    fixArc:"red",
    star:"sienna"
}
var setting = {
    fixArc:30,
    star:50,
    animeTime:1000
}
var stage = {
    initStage:function(c, w, h, lw) {
        var mouse=utils.cpatureMousePosition(c);
        (function drawFrame(){
            window.requestAnimFrame(drawFrame,c);
            console.log(mouse.x+","+mouse.y);
        })();
        c.width= w;
        c.height= h;
        var ctx = c.getContext('2d');
        ctx.lineWidth = lw;
        return ctx;
    },
    initFixedCircle: function(ctx, origin, radius, color) {
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.arc(origin.x, origin.y, radius, 0 , 2*Math.PI, true);
        ctx.closePath();
        ctx.stroke();
    },
    drawCenterStar:function(cxt, center, r, color) {
        a = {x:0, y:-1};
        b = {x:Math.cos(0.1*Math.PI), y:-Math.sin(0.1*Math.PI)};
        c = {x:Math.cos(0.3*Math.PI), y:Math.sin(0.3*Math.PI)};
        d = {x:-Math.cos(0.3*Math.PI), y:Math.sin(0.3*Math.PI)};
        e = {x:-Math.cos(0.1*Math.PI), y:-Math.sin(0.1*Math.PI)};
        onScreen=function(vertex) {
            return {x:center.x+r*vertex.x, y:center.y+r*vertex.y};
        }
        cxt.beginPath();
        cxt.strokeStyle = color;
        cxt.moveTo(onScreen(a).x, onScreen(a).y);
        cxt.lineTo(onScreen(c).x, onScreen(c).y);
        cxt.lineTo(onScreen(e).x, onScreen(e).y);
        cxt.lineTo(onScreen(b).x, onScreen(b).y);
        cxt.lineTo(onScreen(d).x, onScreen(d).y);
        cxt.lineTo(onScreen(a).x, onScreen(a).y);
        cxt.stroke();
        cxt.closePath();
    },
    drawMoveCircle:function(ctx, x, y, r, color) {
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, r, 0 , 2*Math.PI, true);
        ctx.closePath();
        ctx.stroke();
    },
    //一秒刷新50次
    circleAnime:function(cxt, s, d, animeTime) {
        var startTime = new Date().getTime();
        px = s.x;
        py = s.y;
        pr = setting.fixArc * 0.5;
        circleDown = setInterval(function(){
            var pass = new Date().getTime()-startTime;
            if(pass<= animeTime) {
                percent = pass/animeTime;
                cxt.clearRect(px-pr-2, py-pr-2, 2*pr+4, 2*pr+4);
                px = s.x;
                py = s.y+(d.y-s.y)*percent ;
                pr = setting.fixArc*(0.5+percent*0.5);
                stage.drawMoveCircle(cxt, px, py, pr, "black");
                if(py+pr > coord.fixArc.y-setting.fixArc) {
                    stage.initFixedCircle(cxt, coord.fixArc, setting.fixArc, color.fixArc);
                }
            } else {
                clearInterval(circleDown);
            }
        }, 20);
    }
}
var utils={};
utils.cpatureMousePosition=function(element){
    var mouse={x:0,y:0};
    element.addEventListener("mousedown",function(event){
        var x,y;
        if(event.pageX||event.pageY){
            x=event.pageX;
            y=event.pageY;
        }else{
            x=event.clientX+document.body.scrollLeft+document.documentElement.scrollLeft;
            y=event.clientY+document.body.scrollTop+document.documentElement.scrollTop;
        }
        x-=element.offsetLeft;
        y-=element.offsetTop;
        mouse.x=x;
        mouse.y=y;
    },false);
    return mouse;
};
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
})();