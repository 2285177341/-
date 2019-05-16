define(['config'], function() {
    require(['jquery'], function() {
        //tab 切换效果
        (function($) {
            $titleBtn = $('.tab-title ul li');
            $aItem = $('.tab_content .tab-item');

            $titleBtn.on('click', function() {


                $(this).addClass('active').siblings().removeClass('active');
                $aItem.eq($(this).index()).show().siblings().hide();
            })

        })(jQuery);
        // 详情页导航点击效果
        (function($) {
            $navbtn = $('.banner-nav-btn a');
            $navinner = $('.nav-inner');
            $navbtn.on('click', function() {
                $navinner.show();
            });
            $navinner.on('mouseleave', function() {
                $navinner.hide();
            })
        })(jQuery);

    })


})