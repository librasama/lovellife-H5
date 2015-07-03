$(document).ready(
    function(){
        $.getJSON("data/config.json", function(data){
            constVal = data;
            canvas = document.getElementById('canvas');
            context = canvas.getContext("2d");
            var d = new Director(canvas);
            d.init(0);
        });
    }
);
var canvas ;
var context;
var isPlay = false;
var startTime;
var pauseTime;
var addOnTime = 0;
var constVal = {};
var statics={};
function Director(canvas){
    this.c = canvas;
    statics = {perfect:0, great:0, good:0,bad:0,miss:0};
    this.stage = new Stage(canvas, 800, 640, 2);
    this.stage.initStage();
    this.initEventlistener();
}
Director.prototype = {
    c:null,
    stage:null,
    tune:null,
    currentSecond:0,
    init:function(i) {
        this.tune = new Tune(stage, i);
        $("#playbtn").on("click", function() {
            //addOnTime += new Date().getTime() - pauseTime;
            eventbus.dispatchEvent($("audio").get(0).paused ? constVal.event.RePlay : constVal.event.Pause, {"addOn":addOnTime});
        });
    },
    pause:function(){
        pauseTime = new Date().getTime();
        $("#playbtn").val("播放");
        $("audio").get(0).pause();
        isPlay = false;
    },
    play:function(){
        this.tune.play();
        $("#playbtn").val("暂停");
        $("audio").get(0).play();
        isPlay = true;
    },
    replay:function() {
        addOnTime = new Date().getTime() - pauseTime;
        console.log("addOnTime:"+addOnTime);
        $("#playbtn").val("暂停");
        $("audio").get(0).play();
        isPlay = true;
    },
    isEnd:function(){},
    initEventlistener:function(){
        theDirector = this;
        eventbus.addEventlistener(constVal.event.TunesInited, function(type,info){
            theDirector.tune = info;
            theDirector.play();
        });
        eventbus.addEventlistener(constVal.event.Pause, function(type,info){
            theDirector.pause();
        });
        eventbus.addEventlistener(constVal.event.RePlay, function(type,info){
            theDirector.replay();
        });
    }
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
    ctlBtns:[],
    tracks:[],
    initStage:function() {
        utils.cpatureMousePosition(this.canvas);
        this.initStar(this.ctx, constVal.coord.star, constVal.setting.star, constVal.color.star);
        this.initEventlistener();
        this.initCtlBtns();
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
        eventbus.addEventlistener(constVal.event.RePlay, function(type, info){

        });
        eventbus.addEventlistener(constVal.event.Pause, function(type, info){

        });
    },
    initCtlBtns:function() {
        sctx = this.ctx;
        stage = this;
        $(constVal.coord.fixArc).each(function($index, $item){
            btn = new ControllBtn();
            btn.init(sctx, $item, constVal.setting.fixArc, constVal.color.fixArc);
            stage.ctlBtns.push(btn);
        });
    }
}
function ControllBtn(){}
ControllBtn.prototype = {
    ctx:{},
    origin:{},
    radius:0,
    curBeat:{},
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
                offset = Math.abs(new Date().getTime()-startTime-ctlbtn.curBeat.rightTime);
                var i=0;
                for(;i<ctlbtn.curBeat.judge.length;i++) {
                    if(offset < parseInt(ctlbtn.curBeat.judge[i]))  break;
                }
                console.log(offset+"，判定："+constVal.level[i]);
                ctlbtn.curBeat.hit=i;
                ctlbtn.curBeat.hitted = true;
            }
        });

    }
};
function Track(id, from, to, ctx, ctrBtn, judge){
    this.id = id;
    this.btn = ctrBtn;
    this.beats = [];
    for(var i=0;i<tunes.tracks.length;i++) {
        var item = tunes.tracks[i];
        if(item.id == this.id) {
            for(var j=0;j<item.beats.length;j++) {
                this.beats.push(new Beat(ctx, ctrBtn, item.beats[j], from, to, judge));
            }
        }
    }
    this.maxIdx = this.beats.length;
}
Track.prototype = {
    id:0,
    beats:[],
    curBeats:[],
    curIdx :0,
    maxIdx:0,
    stime:0,
    play:function() {
        var track = this;
        function go(){
            with(track) {
                if(curIdx < maxIdx) {
                    curBeat = beats[track.curIdx];
                    if((curBeat.rightTime+startTime+addOnTime <= constVal.setting.animeTime+new Date().getTime()) && isPlay) {
                        curIdx++;
                        curBeats.push(curBeat);
                        curBeat.moveAnime(new Date().getTime(), constVal.setting.animeTime);
                    } else if(!isPlay){
                        $(curBeats).each(function($index, $item){
                            if($item != null)
                            $item.paused = true;
                        });
                    }
                    window.requestAnimFrame(go);
                }
            }
        }
        window.requestAnimFrame(go);
    },
    initEventlistener:function(){

    }
}
var tunes = {
    tunes:{},
    tracks:{},
    loaded:false,
    init:function() {
        var dataRoot = "data/tune.json";
        t = this;
        $.getJSON(dataRoot, function (data) {
            t.tunes = data.tunes;
            t.tracks = data.tracks;
            t.loaded = true;
            eventbus.dispatchEvent(constVal.event.TunesLoaded, t.tunes);
        });
    }
}

function Tune(stage, i){
    this.initEventlistener();
    this.stage = stage;
    this.index = i;
    if(tunes.loaded) {
        this.init(tunes.data[i]);
    } else {
        tunes.init();
    }
}
Tune.prototype = {
    index:0,
    title:"曲目名",
    path:"data/music/1.mp3",
    inited:false,
    tracks:[],
    stage:{},
    play:function() {
        $(this.tracks).each(function($index, $track){
            $track.play();
        });
        isPlay = true;
        $("audio").get(0).play();
        startTime = new Date().getTime();
    },
    pause:function() {
        $("audio").get(0).pause();
        $(this.tracks).each(function($index, $track){
            $track.pause();
        });
    },
    init:function(data) {
        this.inited = true;
        this.title = data.title;
        this.path = data.music;
        $("audio").get(0).src = this.path;
        $("audio").get(0).volume = 0.3;
        $("h2").text(this.title);
        this.initTracks(data.tracks, data.judge);
        eventbus.dispatchEvent(constVal.event.TunesInited, this);
    },
    initEventlistener:function(){
        theTune = this;
        eventbus.addEventlistener(constVal.event.TunesLoaded, function(type, info){
            if(!theTune.inited) {
                theTune.init(info[theTune.index]);
            }
        });
    },
    initTracks:function(trackIds, judge) {
        tune = this;
        s = tune.stage;
        $(constVal.coord.moveArcE).each(function($index, $item){
            tune.tracks.push(new Track(trackIds[$index],constVal.coord.moveArcS, $item, s.ctx, s.ctlBtns[$index], judge));
        });
    }

};


function Beat(ctx, btn, data, from ,to, judge) {
    this.ctx = ctx;
    this.btn = btn;
    this.type = data.type;
    this.rightTime = data.time;
    this.s = from;
    this.d = to;
    this.px = s.x;
    this.py = s.y;
    this.pr = constVal.setting.fixArc * 0.5;
    this.dis = Math.sqrt(Math.pow((from.x - to.x), 2)+Math.pow((from.y - to.y), 2));
    this.judge = judge;
    this.initEventlistener();
}
Beat.prototype = {
    type:"normal",
    rightTime:0,
    ctx:{},
    btn:{},
    px:0,
    py:0,
    pr:0,
    dis:0,
    judge:{},
    hit:4,
    hitted:false,
    paused:false,
    moveAnime:function(st, animeTime) {
        this.btn.curBeat = this;
        var trackMove = this;
        function circleDown(){
            with(trackMove) {
                var pass = new Date().getTime()-st;
                if(paused) pass-=addOnTime;
                if(pass<= animeTime && isPlay && !hitted) {
                    percent = pass/animeTime;
                    //console.log("percent:"+percent);
                    ctx.clearRect(px-pr-2, py-pr-2, 2*pr+4, 2*pr+4);
                    px = s.x +(d.x-s.x)*percent;
                    py = s.y +(d.y-s.y)*percent ;
                    pr = constVal.setting.fixArc*(0.5+percent*0.5);
                    drawMoveCircle(px, py, pr, "black");
                    if(percent > (pr / dis)) {
                        btn.draw();
                    }
                    window.requestAnimFrame(circleDown);
                } else if(isPlay && (hitted || (pass> animeTime))) {
                    //清算结果
                    ctx.clearRect(px-pr-2, py-pr-2, 2*pr+4, 2*pr+4);
                    btn.draw();
                    evalue();
                    delete this;
                } else {
                    window.requestAnimFrame(circleDown);
                }
            }
        };
        window.requestAnimFrame(circleDown);
    },
    drawMoveCircle:function(x, y, r, color) {
        this.ctx.strokeStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0 , 2*Math.PI, true);
        this.ctx.closePath();
        this.ctx.stroke();
    },
    initEventlistener:function() {
        eventbus.addEventlistener(constVal.event.RePlay, function(type, info){
            this.st += info.addOn;
        });
    },
    evalue:function(){
        i = this.hit;
        context.font="24px Arial bold";//定义字体样式
        context.fillStyle="blue";
        context.fillText(constVal.level[i], constVal.coord.hitLabel.x, constVal.coord.hitLabel.y);
        $("#score").text(parseInt($("#score").text()) + constVal.score[i]);
        setTimeout(function(){
            context.clearRect(constVal.coord.hitLabel.x-20, constVal.coord.hitLabel.y-20, 200, 60);
        },300);
        statics[constVal.level[i]]++;
        console.log(statics);
    }
}
