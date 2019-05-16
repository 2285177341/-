// define 定义模块，接收二个参数。
// 第1个参数，必须是一个数组，指明该模块的依赖性
// 第2个参数是一个回调函数。

//一个页面就是一个模块，define只能有一个。

//1.define定义模块的两种写法：

// define([],function(){
//     var num=10;
//     function fn(){
//         console.log('我是模块里面的内容');
//     }
//     return {
//         num:num,
//         fn:fn
//     }
// });

// define([], function () {
//     return {
//         num: 10,
//         fn: function () {
//             console.log('我是模块里面的内容');
//         }
//     }
// });
define(['config'], function() {
    require(['jquery'], function() {
        // 首页轮播图效果
        (function($) {


            class banner {
                constructor() {
                    this.oBox = $(".banner");
                    this.picLi = $(".pic-list li");
                    this.dotLi = $(".dot li");
                    this.oBtnleft = $("#btn-left");
                    this.oBtnright = $("#btn-right");
                    this.timer = null;
                    this.num = 0;

                }
                init() {
                    var _this = this;
                    this.autoplay();
                    this.dotLi.on('mouseover', function() {
                        _this.dotli_over(this);
                    })
                    this.oBox.hover(function() {
                        _this.oBox_over();

                    }, function() {
                        _this.oBox_out();
                    });
                    this.oBtnright.on('click', function() {
                        _this.btnRight_click(this);
                    })
                    this.oBtnleft.on('click', function() {
                        _this.btnLeft_click(this);
                    })

                }

                dotli_over(e) {
                    $(e).addClass('active').siblings().removeClass('active');
                    this.picLi.eq($(e).index()).css('opacity', '1').siblings().css('opacity', '0');

                }
                oBox_over() {
                    this.oBtnleft.show();
                    this.oBtnright.show();
                    clearInterval(this.timer);
                }
                oBox_out() {
                    this.oBtnleft.hide();
                    this.oBtnright.hide();
                    this.autoplay();
                }
                btnRight_click(e) {
                    this.num++;

                    if (this.num > this.picLi.length - 1) {
                        this.num = 0;
                    }
                    this.dotLi.eq(this.num).addClass('active').siblings().removeClass('active');
                    this.picLi.eq(this.num).css('opacity', '1').siblings().css('opacity', '0');

                }
                btnLeft_click(e) {
                    this.num--;
                    if (this.num < 0) {
                        this.num = this.picLi.length - 1;
                    }
                    this.dotLi.eq(this.num).addClass('active').siblings().removeClass('active');
                    this.picLi.eq(this.num).css('opacity', '1').siblings().css('opacity', '0');

                }
                autoplay() {
                    var _this = this;
                    this.timer = setInterval(function() {
                        _this.btnRight_click(this);
                    }, 1500)
                }
            }

            new banner().init();
        })(jQuery);
        // 首页左边楼梯效果
        (function($) {
            //1.添加滚轮事件，显示隐藏楼梯导航
            var $loutinav = $('.stairs');
            var $loutiLi = $('.stairs li').not('.last');
            var $louceng = $('.tvproduct');

            $(window).on('scroll', function() {
                var $top = $(window).scrollTop(); //滚动条的距离
                if ($top >= 600) {
                    $loutinav.show();
                } else {
                    $loutinav.hide();
                }

                //4.拖动滚动条，对应的楼梯添加类名，楼梯到了那块区域。
                //思路：楼层的top值和滚动条距离进行比较
                $louceng.each(function(index, element) {
                    var $loucengTop = $(element).offset().top; //每个楼层的top值。
                    if ($loucengTop > $top) {
                        $loutiLi.removeClass('active'); //每次触发滚轮事件，移除所有楼梯的类。
                        $loutiLi.eq(index).addClass('active');
                        return false; //遍历一次，终止循环。
                    }
                });



            });

            //2.点击楼梯导航,楼层跳到对应的位置。

            $loutiLi.on('click', function() {
                //$(this).index():当前点击的楼梯的索引。
                $(this).addClass('active').siblings().removeClass('active'); //当前的元素添加类，其他的兄弟元素移除类。
                var $top = $louceng.eq($(this).index()).offset().top;
                //document.documentElement.scrollTop
                //document.body.scrollTop
                $('html,body').animate({ //赋值注意内部的属性。
                    scrollTop: $top
                });
            });

            //3.回到顶部
            $('.last').on('click', function() {
                $('html,body').animate({ //赋值注意内部的属性。
                    scrollTop: 0
                });
            });

        })(jQuery);
        // 首页右边楼梯效果
        (function($) {
            var $twort = $('.two-rt');
            var $threert = $('.three-rt');
            var $loutiLi = $('.three-rt li').not('.last');


            $(window).on('scroll', function() {
                var $top = $(window).scrollTop(); //滚动条的距离
                if ($top <= 200) {
                    $twort.show();
                    $threert.hide();
                } else {
                    $threert.show();
                    $twort.hide();
                }
            });
            //3.回到顶部
            $('.last').on('click', function() {
                $('html,body').animate({ //赋值注意内部的属性。
                    scrollTop: 0
                });
            });
        })(jQuery);

    })

})