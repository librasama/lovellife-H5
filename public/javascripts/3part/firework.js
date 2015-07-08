$(document).ready(function(){
var c = document.getElementById('canvas');
if (!c.getContext) alert('请使用支持HTML5的浏览器，例如Chrome，IE9以上。');
else(function (c, cvs) {
//随着窗口调整画布大小
    var W, H;
    var up = 0;
//(onresize = function() {
//	c.width = W = window.innerWidth;
//	c.height = H = window.innerHeight;
//	})();
    c.width = W = 1080;
    c.height = H = 200;
//生成一个烟花
    function createPT(x, y, r, g, b) {
        return {
            r: r, g: g, b: b,
            x: x, y: y,
//轨迹序列
            pl: [],
            dx: rnd(20) - 10,
            dy: rnd(10) - 7,
            life: 30 + rnd(30),
//移动函数，修改加速度和坐标
            move: function () {
                this.dx *= .98;
                this.dy *= .98;
                this.dy += .22;
                this.x += this.dx;
                this.y += this.dy;
                this.pl.push([this.x, this.y]);
//保持轨迹长度
                if (this.pl.length > 10) this.pl.shift();
                this.life--;
            }
        };
    }

//总烟火数组
    var B = [];
//在x,y位置创建一个烟火
    function createBoom(x, y) {
        var q = [],
            r = rnd(255) | 0,
            g = rnd(255) | 0,
            b = rnd(255) | 0;
        for (var i = 0; i < rnd(16) + 15; i++) q.push(createPT(x, y, r, g, b));
        B.push(q);
    }

    setInterval(function () {
        cvs.clearRect(0, 0, W, H);
//依次绘制烟火
        for (var n = 0; n < B.length; n++) {
            var q = B[n];
            for (var i = 0; i < q.length; i++) {
                var pt = q[i];
                pt.move();
                dq(pt.pl, pt.life / 30, pt.r, pt.g, pt.b);
//超过生存周期就消失
                if (pt.life <= 0) q.splice(i, 1);
            }
//当一个烟火包含的烟花个数为零，则消灭这个烟火
            if (!B[n].length) B.splice(n, 1);
        }
//每隔一段时间添加一个新烟火
        if (new Date - up < 2000 + rnd(2000)) return;
        up = new Date;
        createBoom(rnd(W / 2) + W / 4, rnd(50) + 50);
    }, 20);
    function rnd(n) {
        return (n || 1) * Math.random();
    }

    function dq(ar, z, r, g, b) {
        cvs.save();
//绘制轨迹。思路是每次都绘制一条透明的轨迹，叠加起来形成一条渐变的样子
        for (var i = 0; i < ar.length; i++) {
            cvs.strokeStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + Math.abs(.2 * z) + ')';
            cvs.lineWidth = Math.min(i + 1, 4) * 2;
            cvs.beginPath();
            cvs.moveTo(ar[i][0], ar[i][1]);
            for (var j = i + 1; j < ar.length; j++) cvs.lineTo(ar[j][0], ar[j][1]);
            cvs.stroke();
        }
        cvs.restore();
    }
})(c, c.getContext('2d'));
});