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
 * 发送确认邮件
 */
router.post('/sendEmail', function(req, res, next){

});



/**
 * 查看个人主页
 */
router.get('/profile', function (req, res, next) {

});

module.exports = router;