var check = {

    /**
     * 校验项目是否为空，如果为空placeholder变为指定的提示语
     * @param items
     * @returns {boolean}
     */
    isNull:function (items){
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
    },

    /**
     * 校验邮箱格式 xxxd23see@mail.com.cn
     */
    isEmail:function(str) {
        return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(str);
    },

    /**
     * 校验密码格式
     * 长度，是否包含大写字母，数字，特殊数值
     * @param pwd
     */
    pwdFormat:function(pwd, options) {
        //len, capital, digital, specific
        var msg = '密码中必须';
        if(options.len) {
            msg += '长度大于'+options.len+'位，';
            flag = false;
        }
        msg += "包含";
        if(options.capital) {
            msg += '大写字母、';
            flag = false;
        }
        if(options.digital) {
            msg += '数字、';
            flag = false;
        }
        if(options.specific) {
            msg += '特殊字符。';
            flag = false;
        }
        var rt = {};
        rt.flag = flag;
        rt.msg = msg;
        return rt;
    }
};

