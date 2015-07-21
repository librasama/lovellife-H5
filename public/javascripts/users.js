$(document).ready(function(){

    /**
     * 点击眼睛显示密码
     */
    $('#showpwd').on('click', function(){

    });


    $('#signBtn').on('click', function () {
        // '邮箱不能为空'
        $.getJSON('/data/check.json', function(data){
            var flag = checksuit.isNull(data.user);
            if(flag) {
                // 都不为空，开始校验是否密码相等
                if($('#pwd').val() != $('#pwd2')) {
                    $('.error').text('两次密码输入不一致！');
                } else {
                    $('.error').text('');
                }
                if(!checksuit.isEmail($('#email'))) {
                    $('.error').text($('.error').text() + ' 邮箱格式不正确！');
                }
                // 校验邮箱或用户名已存在
                var obj = {};
                obj.uname = $('#uname').val();
                obj.email = $('#email').val();
                checkUser(obj,function(err){
                    if(err) {
                        // 提示
                    } else {
                        // 注册未激活用户，发送激活邮件
                        $.post('/user/sendEmail', function (json) {
                            var data = JSON.parse(json);
                            if(data.flag) {
                                alert('邮件发送成功，请去邮箱检查~！');
                            } else {
                                alert('邮件发送失败，或者其他的失败……');
                            }
                        })
                    }
                });
            }
        });
    });

    function checkUser(user, cb) {
        $.post('/user/userExist', function(json) {
            data = $.parseJSON(json);
            if(data.flag) {
                var err = {};
                err.msg = data.msg;
                // 存在用户
                // 邮箱已被注册
                cb(err);
            }  else {
                cb(null);
            }
        });
    };

    /**
     * ajax 邮箱校验
     */
    //$('#email').onblur(function(){
    //
    //});

    /**
     * ajax 用户名校验
     */
    //$('#uname').onblur(function(){
    //
    //});

});