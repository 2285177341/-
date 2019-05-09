;
(function() {
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
})();