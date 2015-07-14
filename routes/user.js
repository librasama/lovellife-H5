var router = new require('express').Router();
var md5 = require('MD5');

router.post("/login", function(req, res, next){
    var uname = req.body.uname;
    var pwd = req.body.pwd;
    pwd = md5(pwd);
    if(existUser((uname, pwd))) {

    }

});
router.post("/signup", function(req, res, next){

});

function existUser(uname, pwd) {
    return false;
}
module.exports = router;