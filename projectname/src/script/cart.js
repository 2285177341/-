//1.渲染商品列表, 传入两个参数，一个id和数量，根据id和数量渲染整个可见的列表.
// function goodslist(id, count) {
//     $.ajax({
//         url: '../php/changhongdata.php', //获取所有的接口数据
//         dataType: 'json'
//     }).done(function(data) {
//         $.each(data, function(index, value) {

//             // 	<div class="gd">
//             // 	<div class="com-width goods-inner">
//             // 		<div class="ckbox lf"><input type="checkbox"></div>
//             // 		<div class="goods-right rt">
//             // 			<div class="rt-top">
//             // 				<div class="nulll"></div>
//             // 				<div class="null-rt">
//             // 					<a href="javascript:;" class="like"></a>
//             // 					<a href="javascript:;" class="no"></a>
//             // 				</div>
//             // 			</div>
//             // 			<div class="rt-bottom">
//             // 				<div class="lf picc">
//             // 					<a href="#"><img src="http://cn.changhong.com/cpzx/pb_televisions/znyy/201902/P020190228553357380471.jpg" style="width:110px;height:110px;display:block;"></a>
//             // 				</div>
//             // 				<div class="lf jshao"><a href="#">长虹（CHANGHONG）65Q6A 65英寸超薄人工智能4.0OLED有机自发光物联电视</a></div>
//             // 				<div class="lf price">
//             // 					<p class="p1"></p>
//             // 					<p class="now-price">单价<span>21997.00</span>元</p>
//             // 					<p class="p3"></p>
//             // 				</div>
//             // 				<div class="lf num">
//             // 					<label>数量</label>
//             // 					<div class="num-rt">
//             // 						<a href="#" class="jian"></a>
//             // 						<input type="text" value="1">
//             // 						<a href="#" class="jia"></a>
//             // 					</div>
//             // 				</div>
//             // 				<div class="state">
//             // 					<span>有货</span>
//             // 				</div>
//             // 			</div>
//             // 		</div>
//             // 	</div>
//             // </div>

//             if (id == value.sid) { //遍历判断sid和传入的sid是否相同，方便将那条数据设置到渲染的商品列表中。
//                 var $clonebox = $('.gd:hidden').clone(true, true);
//                 $clonebox.find('.picc a').find('img').attr('src', value.url);
//                 $clonebox.find('.picc a').find('img').attr('sid', value.sid);
//                 $clonebox.find('.jshao').find('a').html(value.titile);
//                 $clonebox.find('.price .now-price').find('span').html(value.price);
//                 $clonebox.find('.num-rt').find('input').val(count);
//                 //计算每个商品的价格。
//                 // $clonebox.find('.car-rt .sum-price').find('span').html((value.price*count).toFixed(2));
//                 $clonebox.css('display', 'block');
//                 $('.body').append($clonebox);
//                 priceall(); //计算总价的
//             }
//         });
//     })
// }
// //2.获取cookie，执行渲染列表的函数
// if (getcookie('cookiesid') && getcookie('cookienum')) {
//     var s = getcookie('cookiesid').split(','); //数组sid
//     var n = getcookie('cookienum').split(','); //数组num
//     $.each(s, function(i, value) {
//         goodslist(s[i], n[i]);
//     });
// }

// //3.如果购物车为空，显示empty-cart盒子(购物车空空的)
// kong();

// function kong() {
//     if (getcookie('cookiesid') && getcookie('cookienum')) {
//         $('.empty-cart').hide(); //cookie存在，购物车有商品，隐藏盒子。
//     } else {
//         $('.empty-cart').show();
//     }
// }

// //4.计算总价和总的商品件数，必须是选中的商品。
// function priceall() {
//     var $sum = 0;
//     var $count = 0;
//     $('.goods-item:visible').each(function(index, element) {
//         if ($(element).find('.cart-checkbox input').prop('checked')) {
//             $sum += parseInt($(element).find('.quantity-form').find('input').val());
//             $count += parseFloat($(element).find('.b-sum').find('strong').html());
//         }
//     });

//     $('.amount-sum').find('em').html($sum);
//     $('.totalprice').html('￥' + $count.toFixed(2));
// }

// //5.全选操作
// $('.allsel').on('change', function() {
//     $('.goods-item:visible').find(':checkbox').prop('checked', $(this).prop('checked'));
//     $('.allsel').prop('checked', $(this).prop('checked'));
//     priceall(); //取消选项，重算总和。
// });

// var $inputs = $('.goods-item:visible').find(':checkbox');
// $('.item-list').on('change', $inputs, function() { //事件的委托的this指向被委托的元素
//     if ($('.goods-item:visible').find('input:checkbox').length == $('.goods-item:visible').find('input:checked').size()) {
//         $('.allsel').prop('checked', true);
//     } else {
//         $('.allsel').prop('checked', false);
//     }
//     priceall(); //取消选项，重算总和。
// });

// //6.数量的改变
// //改变商品数量++
// $('.quantity-add').on('click', function() {
//     var $count = $(this).parents('.goods-item').find('.quantity-form input').val(); //值
//     $count++;
//     if ($count >= 99) {
//         $count = 99;
//     }
//     $(this).parents('.goods-item').find('.quantity-form input').val($count); //赋值回去
//     $(this).parents('.goods-item').find('.b-sum').find('strong').html(singlegoodsprice($(this))); //改变后的价格
//     priceall(); //重新计算总和。
//     setcookie($(this)); //将改变的数量重新添加到cookie

// });

// //改变商品数量--
// $('.quantity-down').on('click', function() {
//     var $count = $(this).parents('.goods-item').find('.quantity-form input').val();
//     $count--;
//     if ($count <= 1) {
//         $count = 1;
//     }
//     $(this).parents('.goods-item').find('.quantity-form input').val($count);
//     $(this).parents('.goods-item').find('.b-sum').find('strong').html(singlegoodsprice($(this))); //改变后的价格
//     priceall();
//     setcookie($(this));
// });

// //直接输入改变数量
// $('.quantity-form input').on('input', function() {
//     var $reg = /^\d+$/g; //只能输入数字
//     var $value = parseInt($(this).val());
//     if ($reg.test($value)) { //是数字
//         if ($value >= 99) { //限定范围
//             $(this).val(99);
//         } else if ($value <= 0) {
//             $(this).val(1);
//         } else {
//             $(this).val($value);
//         }
//     } else { //不是数字
//         $(this).val(1);
//     }
//     $(this).parents('.goods-item').find('.b-sum').find('strong').html(singlegoodsprice($(this))); //改变后的价格
//     priceall();
//     setcookie($(this));
// });

// //7.计算数量改变后单个商品的价格
// function singlegoodsprice(obj) { //obj:当前元素
//     var $dj = parseFloat(obj.parents('.goods-item').find('.b-price').find('strong').html()); //单价
//     var $cnum = parseInt(obj.parents('.goods-item').find('.quantity-form input').val()); //数量
//     return ($dj * $cnum).toFixed(2); //结果
// }

// //8.将改变后的数量的值存放到cookie
// //点击按钮将商品的数量和id存放cookie中
// var arrsid = []; //商品的id
// var arrnum = []; //商品的数量
// //提前获取cookie里面id和num
// function cookietoarray() {
//     if (getcookie('cookiesid') && getcookie('cookienum')) {
//         arrsid = getcookie('cookiesid').split(','); //cookie商品的sid  
//         arrnum = getcookie('cookienum').split(','); //cookie商品的num
//     }
// }

// function setcookie(obj) { //obj:当前操作的对象
//     cookietoarray(); //得到数组
//     var $index = obj.parents('.goods-item').find('img').attr('sid'); //通过id找数量的位置
//     arrnum[$.inArray($index, arrsid)] = obj.parents('.goods-item').find('.quantity-form input').val();
//     addcookie('cookienum', arrnum.toString(), 7);
// }

// //9.删除操作
// //删除cookie
// function delgoodslist(sid, arrsid) { //sid：当前删除的sid，arrsid:cookie的sid的值
//     var $index = -1;
//     $.each(arrsid, function(index, value) { //删除的sid对应的索引位置。 index:数组项的索引
//         if (sid == value) {
//             $index = index; //如果传入的值和数组的值相同，返回值对应的索引。
//         }
//     });
//     arrsid.splice($index, 1); //删除数组对应的值
//     arrnum.splice($index, 1); //删除数组对应的值
//     addcookie('cookiesid', arrsid.toString(), 7); //添加cookie
//     addcookie('cookienum', arrnum.toString(), 7); //添加cookie
// }

// //删除单个商品的函数(委托)
// $('.item-list').on('click', '.b-action a', function(ev) {
//     cookietoarray(); //得到数组,上面的删除cookie需要。
//     if (confirm('你确定要删除吗？')) {
//         $(this).first().parents('.goods-info').remove(); //通过当前点击的元素找到整个一行列表，删除
//     }
//     delgoodslist($(this).first().parents('.goods-info').find('img').attr('sid'), arrsid);
//     priceall();
// });


// //删除全部商品的函数
// $('.operation a:first').on('click', function() {
//     cookietoarray(); //得到数组,上面的删除cookie需要。
//     if (confirm('你确定要全部删除吗？')) {
//         $('.goods-item:visible').each(function() {
//             if ($(this).find('input:checkbox').is(':checked')) { //复选框一定是选中的
//                 $(this).remove();
//                 delgoodslist($(this).find('img').attr('sid'), arrsid);
//             }
//         });
//         priceall();
//     }
// });




define(['config'], function() {
    require(['jquery', 'jqcookie'], function() {

        (function($) {
            //  1.渲染商品列表, 传入两个参数，一个id和数量，根据id和数量渲染整个可见的列表.
            function goodslist(id, count) {
                $.ajax({
                    url: 'http://10.31.163.38/chitem1/changhong/projectname/php/changhongdata.php', //获取所有的接口数据
                    dataType: 'json'
                }).done(function(data) {
                    console.log(data);
                    $.each(data, function(index, value) {

                        // 	<div class="gd">
                        // 	<div class="com-width goods-inner">
                        // 		<div class="ckbox lf"><input type="checkbox"></div>
                        // 		<div class="goods-right rt">
                        // 			<div class="rt-top">
                        // 				<div class="nulll"></div>
                        // 				<div class="null-rt">
                        // 					<a href="javascript:;" class="like"></a>
                        // 					<a href="javascript:;" class="no"></a>
                        // 				</div>
                        // 			</div>
                        // 			<div class="rt-bottom">
                        // 				<div class="lf picc">
                        // 					<a href="#"><img src="http://cn.changhong.com/cpzx/pb_televisions/znyy/201902/P020190228553357380471.jpg" style="width:110px;height:110px;display:block;"></a>
                        // 				</div>
                        // 				<div class="lf jshao"><a href="#">长虹（CHANGHONG）65Q6A 65英寸超薄人工智能4.0OLED有机自发光物联电视</a></div>
                        // 				<div class="lf price">
                        // 					<p class="p1"></p>
                        // 					<p class="now-price">单价<span>21997.00</span>元</p>
                        // 					<p class="p3"></p>
                        // 				</div>
                        // 				<div class="lf num">
                        // 					<label>数量</label>
                        // 					<div class="num-rt">
                        // 						<a href="#" class="jian"></a>
                        // 						<input type="text" value="1">
                        // 						<a href="#" class="jia"></a>
                        // 					</div>
                        // 				</div>
                        // 				<div class="state">
                        // 					<span>有货</span>
                        // 				</div>
                        // 			</div>
                        // 		</div>
                        // 	</div>
                        // </div>

                        if (id == value.sid) { //遍历判断sid和传入的sid是否相同，方便将那条数据设置到渲染的商品列表中。
                            var $clonebox = $('.gd:hidden').clone(true, true);

                            // console.log($('.gd:hidden'));
                            // console.log(value.url);
                            // console.log(value.title);
                            // console.log(value.price);
                            // $('.picc a').find('img').attr('src', data.url);
                            $clonebox.find('.picc a').find('img').attr('src', value.url);
                            // console.log($clonebox.find('.picc a'));
                            $clonebox.find('.picc a').find('img').attr('sid', value.sid);
                            $clonebox.find('.jshao').find('a').html(value.title);
                            $clonebox.find('.price .now-price').find('span').html(value.price);
                            $clonebox.find('.num-rt').find('input').val(count);

                            // $clonebox.find('.car-rt .sum-price').find('span').html((value.price * count).toFixed(2));
                            $clonebox.css('display', 'block');
                            $('.goodss').append($clonebox);
                            //计算每个商品的价格。
                            console.log(count);
                            $('.state span').html((value.price * count).toFixed(2));
                            // 选择商品的数量
                            $('.car-lf .yixuan span').html(count);

                            priceall(); //计算总价的

                        }
                    });
                })
            }
            //2.获取cookie，执行渲染列表的函数
            if (getcookie('cookiesid') && getcookie('cookienum')) {
                var s = getcookie('cookiesid').split(','); //数组sid
                console.log(s);
                console.log(n);
                var n = getcookie('cookienum').split(','); //数组num
                $.each(s, function(i, value) {
                    goodslist(s[i], n[i]);
                });
            }

            function priceall() {
                var $sum = 0;
                var $count = 0;
                $('.gd:visible').each(function(index, element) {
                    if ($(element).find('.goods-inner .ckbox input').prop('checked', true)) {
                        $sum += parseInt($(element).find('.num-rt').find('input').val());
                        $count += parseFloat($(element).find('.state').find('span').html());
                        $('.car-lf .yixuan').find('span').html($sum);
                        $('.car-rt .sum-price span').html($count.toFixed(2));
                    }
                });
            }

        })(jQuery);

    })


})