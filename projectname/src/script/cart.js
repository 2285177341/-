//1.渲染商品列表, 传入两个参数，一个id和数量，根据id和数量渲染整个可见的列表.
define(['config'], function() {
    require(['jquery', 'jqcookie'], function() {
        (function($) {
            //  1.渲染商品列表, 传入两个参数，一个id和数量，根据id和数量渲染整个可见的列表.
            function goodslist(id, count) {
                $.ajax({
                    url: 'http://10.31.163.38/chitem1/changhong/projectname/php/changhongdata.php', //获取所有的接口数据
                    dataType: 'json'
                }).done(function(data) {
                    // console.log(data);
                    $.each(data, function(index, value) {
                        if (id == value.sid) { //遍历判断sid和传入的sid是否相同，方便将那条数据设置到渲染的商品列表中。
                            var $clonebox = $('.gd:hidden').clone(true, true);
                            $clonebox.find('.picc a').find('img').attr('src', value.url);
                            $clonebox.find('.picc a').find('img').attr('sid', value.sid);
                            $clonebox.find('.jshao').find('a').html(value.title);
                            $clonebox.find('.price .now-price').find('span').html(value.price);
                            $clonebox.find('.num-rt').find('input').val(count);
                            $clonebox.css('display', 'block');
                            $('.goodss').append($clonebox);
                            // 选择商品的数量
                            $('.car-lf .yixuan span').html(count);
                            //计算每个商品的价格。
                            $('.state span').html((value.price * count).toFixed(2));
                            priceall(); //计算总价的
                        }
                    });
                })
            }
            //    结算样式，恭喜老板下单成功
            $('.car-rt .sbt').on('click', function() {
                if (confirm("你确定全部结算吗？")) {
                    $('.shopping-car').show();
                }
            });
            $('.shopping-car').on('mouseleave', function() {
                $('.shopping-car').hide();
            })

            //2.获取cookie，执行渲染列表的函数
            if (getcookie('cookiesid') && getcookie('cookienum')) {
                var s = getcookie('cookiesid').split(','); //数组sid
                var n = getcookie('cookienum').split(','); //数组num
                $.each(s, function(i, value) {
                    goodslist(s[i], n[i]);
                });
            }

            function priceall() {
                var $sum = 0;
                var $count = 0;
                $('.gd:visible').each(function(index, element) {
                    if ($(element).find('.goods-inner .ckbox input').prop('checked')) {
                        $sum += parseInt($(element).find('.num-rt').find('input').val());
                        $count += parseFloat($(element).find('.state span').html());

                    }
                });
                $('.car-lf .yixuan').find('span').html($sum);
                $('.car-rt .sum-price span').html('￥' + $count.toFixed(2));
            }
            //5.全选操作
            $('.allcheck').on('change', function() {
                $('.gd:visible').find(':checkbox').prop('checked', $(this).prop('checked'));
                $('.allcheck').prop('checked', $(this).prop('checked'));
                priceall(); //取消选项，重算总和。
            });

            // var $inputs = $('.gd:visible').find(':checkbox');
            // $('.ckbox input').on('change', $inputs, function() { //事件的委托的this指向被委托的元素
            //     // console.log($('.ckbox input'))
            //     if ($('.gd:visible').find('input:checkbox').length == $('.gd:visible').find('input:checked').size()) {

            //         $('.allcheck').prop('checked', true);
            //     } else {
            //         $('.allcheck').prop('checked', false);

            //     }
            //     priceall(); //取消选项，重算总和。
            // });

            // console.log($('.gd:visible').find('input:checkbox').length)
            //6.数量的改变
            //改变商品数量++
            $('.num-rt .jia').on('click', function() {
                var $count = $(this).parents('.gd').find('.num-rt input').val(); //值
                $count++;
                if ($count >= 99) {
                    $count = 99;
                }
                $(this).parents('.gd').find('.num-rt input').val($count); //赋值回去
                $(this).parents('.gd').find('.state').find('span').html(singlegoodsprice($(this))); //改变后的价格
                priceall(); //重新计算总和。
                setcookie($(this)); //将改变的数量重新添加到cookie

            });

            //改变商品数量--
            $('.num-rt .jian').on('click', function() {
                var $count = $(this).parents('.gd').find('.num-rt input').val();
                $count--;
                if ($count <= 1) {
                    $count = 1;
                }
                $(this).parents('.gd').find('.num-rt input').val($count);
                $(this).parents('.gd').find('.state').find('span').html(singlegoodsprice($(this))); //改变后的价格
                priceall();
                setcookie($(this));
            });

            //直接输入改变数量
            $('.num-rt input').on('input', function() {
                var $reg = /^\d+$/g; //只能输入数字
                var $value = parseInt($(this).val());
                if ($reg.test($value)) { //是数字
                    if ($value >= 99) { //限定范围
                        $(this).val(99);
                    } else if ($value <= 0) {
                        $(this).val(1);
                    } else {
                        $(this).val($value);
                    }
                } else { //不是数字
                    $(this).val(1);
                }
                $(this).parents('.gd').find('.state').find('span').html(singlegoodsprice($(this))); //改变后的价格
                priceall();
                setcookie($(this));
            });
            10

            //7.计算数量改变后单个商品的价格
            function singlegoodsprice(obj) { //obj:当前元素
                var $dj = parseFloat(obj.parents('.gd').find('.now-price').find('span').html()); //单价
                var $cnum = parseInt(obj.parents('.gd').find('.num-rt input').val()); //数量
                return ($dj * $cnum).toFixed(2); //结果
            }

            //8.将改变后的数量的值存放到cooki
            //点击按钮将商品的数量和id存放cookie中
            var arrsid = []; //商品的id
            var arrnum = []; //商品的数量
            //提前获取cookie里面id和num
            function cookietoarray() {
                if (getcookie('cookiesid') && getcookie('cookienum')) {
                    arrsid = getcookie('cookiesid').split(','); //cookie商品的sid  
                    arrnum = getcookie('cookienum').split(','); //cookie商品的num

                }
            }

            function setcookie(obj) { //obj:当前操作的对象
                cookietoarray(); //得到数组
                var $index = obj.parents('.gd').find('img').attr('sid'); //通过id找数量的位置
                arrnum[$.inArray($index, arrsid)] = obj.parents('.gd').find('.num-rt input').val();
                addcookie('cookienum', arrnum.toString(), 7);
            }
            //9.删除操作
            //删除cookie
            function delgoodslist(sid, arrsid) { //sid：当前删除的sid，arrsid:cookie的sid的值
                var $index = -1;
                $.each(arrsid, function(index, value) { //删除的sid对应的索引位置。 index:数组项的索引
                    if (sid == value) {
                        $index = index; //如果传入的值和数组的值相同，返回值对应的索引。
                    }
                });
                arrsid.splice($index, 1); //删除数组对应的值
                arrnum.splice($index, 1); //删除数组对应的值
                addcookie('cookiesid', arrsid.toString(), 7); //添加cookie
                addcookie('cookienum', arrnum.toString(), 7); //添加cookie
            }

            //删除单个商品的函数(委托)
            $('.gd').on('click', '.null-rt .no', function(ev) {
                // console.log($(this))
                cookietoarray(); //得到数组,上面的删除cookie需要。
                // alert(3);
                if (confirm('你确定要删除吗？')) {
                    $(this).first().parents('.gd').remove(); //通过当前点击的元素找到整个一行列表，删除
                }

                delgoodslist($(this).first().parents('.gd').find('img').attr('sid'), arrsid);
                priceall();
            });

            //删除全部商品的函数
            $('.lose').on('click', function() {
                cookietoarray(); //得到数组,上面的删除cookie需要。
                if (confirm('你确定要全部删除吗？')) {
                    $('.gd:visible').each(function() {
                        if ($(this).find('input:checkbox').is(':checked')) { //复选框一定是选中的
                            $(this).remove();
                            delgoodslist($(this).find('img').attr('sid'), arrsid);
                        }
                    });
                    priceall();
                }
            });
        })(jQuery);


    })


})