$(document).ready(
    function(){
        var c = document.getElementById('canvas');
        var d = new Director(c);
        d.play(0);
        initPlaybtn(d);
    }
);
var isPlay = false;
var constVal = {
    coord : {
        star:{x:400, y:100},
        fixArc:{x:400, y:550},
        moveArcS:{x:400, y:150},
        moveArcE:{x:400, y:614}
    },
    color : {
        fixArc:"red",
        star:"sienna"
    },
    setting : {
        fixArc:30,
        star:50,
        animeTime:1000
    },
    event:{
        TouchIn:"touchin",
        TouchOut:"touchOut",
        Play:"Play",
        Pause:"Pause"
    }
}

function Director(canvas, i){
    this.c = canvas;
    this.stage = new Stage(canvas, 800, 640, 2);
    this.stage.initStage();
}
Director.prototype = {
    c:null,
    stage:null,
    tune:null,
    pauseTimestamp:new Date().getTime(),
    startTimestamp:new Date().getTime(),
    currentSecond:0,
    song:{},
    pause:function(){
        this.stage.pause();
    },
    play:function(i){
        d = this;
        var dataRoot = "data/tune.json";
        $.getJSON(dataRoot, function (data) {
            this.tune = new Tune(data.tunes[i]);
            this.tune.init();
            d.stage.play();
            isPlay = true;
            this.tune.play();
        });
    },
    isEnd:function(){}
}
function Stage(){}
function Stage(c, w, h, lw){
    this.canvas = c;
    this.width = w;
    this.height = h;
    this.canvas.width= w;
    this.canvas.height= h;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.lineWidth = lw;
}
Stage.prototype = {
    canvas:{},
    width:0,
    height:0,
    ctx:{},
    startTime:0,
    initStage:function() {
        utils.cpatureMousePosition(this.canvas);
        this.initStar(this.ctx, constVal.coord.star, constVal.setting.star, constVal.color.star);
        this.initEventlistener();
    },
    initStar:function(cxt, center, r, color) {
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
    initEventlistener:function(){
        var stage = this;
        eventbus.addEventlistener(constVal.event.TouchIn, function(type, mouse){
            console.log("x:"+mouse.x+";y:"+mouse.y);
        });
        eventbus.addEventlistener(constVal.event.Play, function(type, info){

        });
        eventbus.addEventlistener(constVal.event.Pause, function(type, info){

        });

    },
    play:function() {
        new Track().sequential(this.ctx);
    },
    pause:function() {

    }
}
function initPlaybtn(d) {
    $("#playbtn").on("click", function() {
        if($("audio").get(0).paused) {
            eventbus.dispatchEvent(constVal.event.Play, {"time":new Date().getTime()});
            $("#playbtn").val("暂停");
            $("audio").get(0).play();
            isPlay = true;
        } else {
            eventbus.dispatchEvent(constVal.event.Pause, {"time":new Date().getTime()});
            $("#playbtn").val("播放");
            $("audio").get(0).pause();
            isPlay = false;
        }
    });


}

function Tune(info){
    this.title = info.title;
    this.path = info.music;
}
Tune.prototype = {
    title:"曲目名",
    path:"data/music/1.mp3",
    init:function(){
        $("audio").get(0).src = this.path;
        $("audio").get(0).volume = 0.3;
        $("h2").text(this.title);
    },
    play:function() {
        $("audio").get(0).play();
    },
    pause:function() {
        $("audio").get(0).pause();
    }
};
function Song(){}
Song.prototype = {

}

function ControllBtn(){
}
ControllBtn.prototype = {
    ctx:{},
    origin:{},
    radius:0,
    init:function(ctx, origin, radius, color) {
        this.ctx = ctx;
        this.origin = origin;
        this.radius = radius;
        this.color = color;
        this.draw();
        this.initListener();
    },
    draw:function() {
        this.ctx.strokeStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.origin.x, this.origin.y, this.radius, 0 , 2*Math.PI, true);
        this.ctx.closePath();
        this.ctx.stroke();
    },
    initListener:function(){
        var ctlbtn = this;
        eventbus.addEventlistener(constVal.event.TouchIn, function(type, mouse){
            if(Math.sqrt(Math.pow((ctlbtn.origin.x-mouse.x),2), Math.pow((ctlbtn.origin.y-mouse.y),2)) <= ctlbtn.radius) {
                console.log("In!!");
            } else {
                console.log("Out!!");
            }
        });

    }
};
function Track(){}
Track.prototype = {
    beats:[],
    btn:new ControllBtn(),
    curIdx :0,
    maxIdx:0,
    ctx:{},
    drawMoveCircle:function(ctx, x, y, r, color) {
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, r, 0 , 2*Math.PI, true);
        ctx.closePath();
        ctx.stroke();
    },
    moveAnime:function(cxt, s, d, animeTime) {
        var startTime = new Date().getTime();
        px = s.x;
        py = s.y;
        pr = constVal.setting.fixArc * 0.5;
        trackMove = this;
        function circleDown(){
            var pass = new Date().getTime()-startTime;
            if(pass<= animeTime && isPlay) {
                percent = pass/animeTime;
                trackMove.ctx.clearRect(px-pr-2, py-pr-2, 2*pr+4, 2*pr+4);
                px = s.x;
                py = s.y+(d.y-s.y)*percent ;
                pr = constVal.setting.fixArc*(0.5+percent*0.5);
                trackMove.drawMoveCircle(cxt, px, py, pr, "black");
                if(py+pr > constVal.coord.fixArc.y-constVal.setting.fixArc) {
                    trackMove.btn.draw();
                }
                window.requestAnimFrame(circleDown);
            }
        };
        window.requestAnimFrame(circleDown);
    },
    initbeats:function(){
        this.beats.push(new Beat(0), new Beat(1000), new Beat(3000));
    },
    sequential:function(ctx) {
        this.btn.init(ctx, constVal.coord.fixArc, constVal.setting.fixArc, constVal.color.fixArc);
        this.ctx = ctx;
        this.initbeats();
        this.maxIdx = this.beats.length;
        st = new Date().getTime()+constVal.setting.animeTime;
        var track = this;
        function play(){
            if(track.curIdx < track.maxIdx) {
                curBeat = track.beats[track.curIdx];
                var pass = new Date().getTime()-st;
                if(curBeat.rightTime <= pass) {
                    track.curIdx++;
                    track.moveAnime(track.ctx, constVal.coord.moveArcS, constVal.coord.moveArcE, constVal.setting.animeTime);
                }
                window.requestAnimFrame(play);
            }
        }
        window.requestAnimFrame(play);
    }
}

function Beat(time) {
    return {rightTime:time};
}
Beat.prototype = {

}

