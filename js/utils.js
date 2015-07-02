
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
        eventbus.dispatchEvent(constVal.event.TouchIn, mouse)
    },false);
    return mouse;
};
var eventbus = {
    eventQueue:{},
    addEventlistener:function(eventType, callback){
        if(eventbus.eventQueue[eventType] == null) {eventbus.eventQueue[eventType] = [];}
        eventbus.eventQueue[eventType].push(callback);
    },
    dispatchEvent:function(eventType, eventInfo) {
        if(eventbus.eventQueue != null &&　eventbus.eventQueue[eventType] != null) {
            $(eventbus.eventQueue[eventType]).each(function($idx, $cb){
                $cb(eventType, eventInfo);
            });
        }
    }
};

window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
})();