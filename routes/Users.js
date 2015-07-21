var express = require('express');
var router = new express.Router();

router.get('/', function(req, res, next){
    res.redirect('/signin');
});

/**
 * 登录
 */
router.get('/signin', function (req, res, next) {
    res.render('user/signin');
});

/**
 * 注册
 */
router.get('/signup', function (req, res, next) {
    res.render('user/signup');
});

/**
 * 注销
 */
router.get('/signout', function (req, res, next) {
    res.render('user/signup');
});

/**
 * 忘记密码
 */
router.get('/forgetPwd', function (req, res, next) {
    res.render('user/forgetPwd');
});

/**
 * 邮箱/用户名是否已经存在
 */
router.post('/userExist', function (req, res, next) {
    var email = req.body.email;
    var uname = req.body.uname;
    var obj = {};
    obj.flag = false;
    res.json(JSON.stringify(obj));
})

/**
 * 发送确认邮件
 */
router.post('/sendEmail', function(req, res, next){
    var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport({
        service : 'Gmail',
        auth : {
            user:'xxx',
            pass:'xxx'
        }
    });

    var mailOptions = {
        from : 'xx',
        to :   'xx',
        subject : 'Hello',
        text : 'Hello world',
        html:   '<b>Hello Akitech</b>'
    };
    transporter.sendMail(mailOptions, function (err, info) {
        var rt = {};
        if(err) {
            rt.flag = false;
            console.log(err);
        } else {
            rt.flag = true;
            console.log("Message sent: " + info.response);
        }
        res.json(JSON.stringify(rt));
    });

});



/**
 * 查看个人主页
 */
router.get('/profile', function (req, res, next) {

});

module.exports = router;