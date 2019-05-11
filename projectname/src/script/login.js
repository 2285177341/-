define(['config'], function() {
    require(['jquery', 'jqcookie'], function() {

        function addCookie(key, value, day) {
            var date = new Date(); //创建日期对象
            date.setDate(date.getDate() + day); //过期时间：获取当前的日期+天数，设置给date
            document.cookie = key + '=' + encodeURI(value) + ';expires=' + date; //添加cookie，设置过期时间
        }


        $('.zh-btn').on('click', function() {
            alert(1);
            var $username = $('#username').val();
            var $password = $('#password').val();
            var $tele = $('#username').val();
            var $email = $('#username').val();

            $.ajax({
                type: 'post',
                url: 'http://10.31.163.38/chitem1/changhong/projectname/php/login.php',
                data: { //将用户名和密码传输给后端
                    name: $username,
                    pass: $password,
                    tel: $tele,
                    mail: $email,
                },
                success: function(data) { //请求成功，接收后端返回的值
                    if (!data) { //用户名或者密码错误
                        // $('#error').html('用户名或者密码错误');
                        $('#password').val('');
                    } else { //成功,存cookie,跳转到首页
                        addCookie('UserName', $username, 7);
                        location.href = '../index1.html';
                    }
                }
            })
        });



    })
});