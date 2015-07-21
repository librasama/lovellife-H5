$(document).ready(function(){
    function checkNull(items){
        var flag = true;
        for(var i=0;i<items.length;i++) {
            var item = items[i];
            var selector = item.selector;
            var tips = item.tips;
            if(($(selector).val() == null ||　$(selector).val()=='')) {
                flag = false;
                $(selector).attr('placeholder', tips);
            }
        }
        return flag;
    }

    /**
     * 点击眼睛显示密码
     */
    $('#showpwd').on('click', function(){

    });


    $('#signBtn').on('click', function () {
        // '邮箱不能为空'
        var flag = checkNull([{"selector":"#email", "tips":"邮箱不能为空"},
            {"selector":"#uname", "tips": "用户名不能为空"},
            {"selector":"#pwd", "tips": "密码不能为空"},
            {"selector":"#pwd2", "tips": "确认密码不能为空"}]);
            if(flag) {
                // 都不为空，开始校验是否密码相等
                if($('#pwd').val() != $('#pwd2')) {
                    $('#pwdTip').show(); // 显示
                } else {
                    $('#pwdTip').hide(); // 隐藏
                }
            }
        });


});