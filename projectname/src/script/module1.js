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
define([], function() {
        return {
            lunbo: (function() {
                class lbt {
                    constructor() {
                        this.oBox = document.querySelector(".banner");
                        this.picLi = document.querySelectorAll(".pic-list li");
                        this.dotLi = document.querySelectorAll(".dot li");
                        this.oBtnleft = document.querySelector("#btn-left");
                        this.oBtnright = document.querySelector("#btn-right");
                        this.timer = null;
                        this.num = 0;
                    }

                    init() {
                        var _this = this;
                        this.tabSwitch();
                        this.setInterval();
                        this.dotLi.onmousemove = function() {
                            _this.move();
                        }
                        this.oBtnright.onclick = function() {
                            _this.right();
                        }
                        this.oBtnleft.onclick = function() {
                            _this.left();
                        }
                        this.oBox.onmouseout = function() {
                            _this.out();
                        }
                        this.oBox.onmousemove = function() {
                            _this.boxmove();
                        }

                    }

                    move() {
                        for (var i = 0; i < this.dotLi.length; i++) {
                            this.dotLi[i].index = i;
                            this.num = this.index;
                            this.tabSwitch();

                        }

                    }
                    out() {
                        var _this = this;
                        this.oBtnleft.style.display = 'none';
                        this.oBtnright.style.display = 'none';
                        this.timer = setInterval(function() {
                            _this.oBtnright.onclick();
                        }, 1500)
                    }

                    boxmove() {
                        this.oBtnleft.style.display = 'block';
                        this.oBtnright.style.display = 'block';
                        clearInterval(this.timer);
                    }


                    tabSwitch() {
                        for (var j = 0; j < this.dotLi.length; j++) {
                            this.dotLi[j].className = '';
                            this.picLi[j].style.opacity = 0;

                        }
                        this.dotLi[this.num].className = 'active';
                        this.picLi[this.num].style.opacity = 1;

                    }

                    // 箭头点击
                    right() {

                        this.num++;
                        if (this.num > this.dotLi.length - 1) {
                            this.num = 0;
                        }
                        this.tabSwitch();

                    }
                    left() {

                        this.num--;
                        if (this.num < 0) {
                            this.num = this.dotLi.length - 1;
                        }
                        this.tabSwitch();

                    }

                    setInterval() {
                        var _this = this;
                        this.timer = setInterval(function() {
                            _this.oBtnright.onclick();
                        }, 1500)

                    }


                    // 定时器运动

                }
                var lb = new lbt();
                lb.init();
            })(),
            louti: (function() {
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

            })(),
            loutirt: (function() {
                var $twort = $('.two-rt');
                var $threert = $('.three-rt');
                var $loutiLi = $('.three-rt li').not('.last');
                // var $louceng = $('.tvproduct');

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
            })(),
        }
    })
    //2.define定义模块的案例操作
    // define(['module2'], function () {
    //     return {
    //         tab: (function () { //tab切换效果
    //             var titleBtn = document.querySelectorAll('.tab_title li');
    //             var aItem = document.querySelectorAll('.item');
    //             for (var i = 0; i < titleBtn.length; i++) {
    //                 titleBtn[i].a = i;
    //                 titleBtn[i].onclick = function () {
    //                     for (var j = 0; j < titleBtn.length; j++) {
    //                         titleBtn[j].className = '';
    //                         aItem[j].style.display = 'none';
    //                     }
    //                     this.className = 'active';
    //                     aItem[this.a].style.display = 'block';
    //                 }
    //             }
    //         })(),

//         lunbo: (function () {
//             //1.获取元素
//             var taoBao = document.querySelector('.taobao');
//             var picUl = document.querySelector('.taobao ul');
//             var picLi = document.querySelectorAll('.taobao ul li'); //5
//             var btnLi = document.querySelectorAll('.taobao ol li');
//             var btnLeft = document.querySelector('#left');
//             var btnRight = document.querySelector('#right');
//             var num = 0;
//             var bstop = true;
//             var timer = null;
//             //2.改变布局。
//             //对布局里面首尾图片进行克隆，然后追加
//             var firstPic = picLi[0].cloneNode(true);
//             var lastPic = picLi[picLi.length - 1].cloneNode(true);
//             picUl.appendChild(firstPic);
//             picUl.insertBefore(lastPic, picLi[0]);

//             //3.ul赋值宽度，让所有的li排成一行。
//             picLi = document.querySelectorAll('.taobao ul li'); //7
//             var liWidth = picLi[0].offsetWidth; //1个li的宽度
//             picUl.style.width = liWidth * picLi.length + 'px';
//             picUl.style.left = -liWidth + 'px';


//             //4.给小圆圈添加点击事件。
//             for (var i = 0; i < btnLi.length; i++) {
//                 btnLi[i].index = i; //自定义的索引
//                 btnLi[i].onclick = function () {
//                     num = this.index; //当前按钮的索引
//                     tabSwitch();
//                     btnLi[num].className = 'active';
//                 }
//             }
//             //5.封装切换过程。
//             function tabSwitch() {
//                 for (var i = 0; i < btnLi.length; i++) {
//                     btnLi[i].className = '';
//                 }
//                 bufferMove(picUl, {
//                     left: -(num + 1) * liWidth
//                 }, function () {
//                     //判断是否到最后一张
//                     if (picUl.offsetLeft <= -liWidth * (btnLi.length + 1)) {
//                         picUl.style.left = -liWidth + 'px';
//                         num = 0;
//                     }

//                     //判断是否第一张
//                     if (picUl.offsetLeft >= 0) {
//                         picUl.style.left = -liWidth * btnLi.length + 'px';
//                         num = btnLi.length - 1;
//                     }
//                     bstop = true;
//                 });
//             }

//             //6.左右箭头显示与隐藏
//             taoBao.onmouseover = function () {
//                 btnLeft.style.display = 'block';
//                 btnRight.style.display = 'block';
//                 clearInterval(timer);
//             };
//             taoBao.onmouseout = function () {
//                 btnLeft.style.display = 'none';
//                 btnRight.style.display = 'none';
//                 timer = setInterval(function () {
//                     btnRight.onclick();
//                 }, 2000);
//             };

//             //右箭头添加点击事件
//             btnRight.onclick = function () {
//                 if (bstop) {
//                     bstop = false;
//                     num++;
//                     tabSwitch();
//                     if (num == btnLi.length) {
//                         btnLi[0].className = 'active';
//                     } else {
//                         btnLi[num].className = 'active';
//                     }
//                 }

//             };

//             btnLeft.onclick = function () {
//                 if (bstop) {
//                     bstop = false;
//                     num--;
//                     tabSwitch();
//                     if (num < 0) {
//                         btnLi[btnLi.length - 1].className = 'active';
//                     } else {
//                         btnLi[num].className = 'active';
//                     }
//                 }

//             };

//             timer = setInterval(function () {
//                 btnRight.onclick();
//             }, 2000);
//         })()

//     }
// });