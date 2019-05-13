define(['config'], function() {
    require(['jquery', 'validate'], function() {



        $(function() {
            $('#form1').validate({
                rules: {
                    username: {
                        required: true,
                        minlength: 2,
                        maxlength: 10,
                        remote: { //将前端的name给后端
                            url: "http://10.31.163.38/chitem1/changhong/projectname/php/reg.php", //后台处理程序
                            type: "post" //数据发送方式
                        }
                    },
                    password: {
                        required: true,
                        minlength: 6
                    },
                    repass: {
                        required: true,
                        equalTo: '#password'
                    },
                    email: {
                        required: true,
                        email: true
                    }
                },
                messages: {
                    username: {
                        required: '用户名不能为空',
                        minlength: '用户名不能小于2',
                        maxlength: '用户名不能大于10',
                        remote: '用户名已存在'
                    },
                    password: {
                        required: '密码不能为空',
                        minlength: '密码不能低于六位',
                    },
                    repass: {
                        required: '密码重复不能为空'
                    },
                    email: {
                        required: '电子邮箱不能为空',
                        email: '你输入的格式有误'
                    }
                }

            });
        });

        $.validator.setDefaults({
            /*添加校验成功后的执行函数--修改提示内容，并为正确提示信息添加新的样式(默认是valid)*/
            success: function(label) {
                label.text('√').css('color', 'green').addClass('valid');
            }
        });





    })
});