define(['config'], function() {
    require(['jquery'], function() {
        (function($) {
            class scale {
                constructor() {
                    this.wrap = $('.wrap');
                    this.spic = $('.spic');
                    this.bpic = $('.bpic');
                    this.sf = $('.sf');
                    this.bf = $('.bf');
                    this.list = $('.list li');
                    this.ul = $('.list ul');
                    this.left = $('.left');
                    this.right = $('.right');
                }
                init() {
                    let _this = this;
                    this.spic.hover(function() {
                        _this.over();
                    }, function() {
                        _this.out();
                    });

                    this.list.on('click', function() {
                        _this.liclick(this); //this:当前操作的li元素
                    });

                    //计算ul的宽度
                    this.liwidth = this.list.outerWidth(true);
                    this.ul.width(this.list.length * this.liwidth);

                    //给左右箭头添加点击事件
                    this.showlength = 8;

                    if (this.list.length < this.showlength) {
                        this.right.css('color', '#fff');
                    }

                    this.right.on('click', function() {
                        _this.rightclick();
                    });

                    this.left.on('click', function() {
                        _this.leftclick();
                    });

                }
                over() {
                    let _this = this;
                    this.sf.css('visibility', 'visible');
                    this.bf.css('visibility', 'visible');
                    //计算小放的尺寸和比例
                    this.sf.width(this.spic.width() * this.bf.width() / this.bpic.width());
                    this.sf.height(this.spic.height() * this.bf.height() / this.bpic.height());
                    this.bili = this.bpic.width() / this.spic.width();
                    this.spic.on('mousemove', function(e) {
                        _this.move(e);
                    });
                }
                out() {
                    this.sf.css('visibility', 'hidden');
                    this.bf.css('visibility', 'hidden');
                }
                move(e) {
                    let l = e.pageX - this.wrap.offset().left - this.sf.width() / 2;
                    let t = e.pageY - this.wrap.offset().top - this.sf.height() / 2;
                    if (l <= 0) {
                        l = 0
                    } else if (l >= this.spic.width() - this.sf.width()) {
                        l = this.spic.width() - this.sf.width()
                    }

                    if (t <= 0) {
                        t = 0
                    } else if (t >= this.spic.height() - this.sf.height()) {
                        t = this.spic.height() - this.sf.height()
                    }
                    this.sf.css({
                        left: l,
                        top: t
                    });

                    this.bpic.css({
                        left: -this.bili * l,
                        top: -this.bili * t
                    })
                }
                liclick(li) {
                    let $imgurl = $(li).find('img').attr('src');
                    this.spic.find('img').attr('src', $imgurl);
                    this.bpic.attr('src', $imgurl);
                }
                rightclick() {
                    if (this.list.length > this.showlength) {
                        this.showlength++;
                        this.left.css('color', '#333');
                        if (this.list.length == this.showlength) {
                            this.right.css('color', '#fff');
                        }
                    }
                    this.ul.animate({
                        left: -(this.showlength - 6) * this.liwidth
                    });
                }
                leftclick() {
                    if (this.showlength > 6) {
                        this.showlength--;
                        this.right.css('color', '#333');
                        if (this.showlength == 6) {
                            this.left.css('color', '#fff');
                        }
                    }
                    this.ul.animate({
                        left: -(this.showlength - 6) * this.liwidth
                    });
                }
            }

            new scale().init();
        })(jQuery)

    })


})