define(['config'], function() {
    require(['jquery', 'lazyload'], function() {

        (function($) {
            //1.拼接数据
            $.ajax({
                url: 'http://10.31.163.38/chitem1/changhong/projectname/php/changhongdata.php',
                dataType: 'json'
            }).done(function(data) {
                var $html = '<ul class="eight-pic">';
                console.log(data);
                $.each(data, function(index, value) {
                    $html += `
				<li>
					<a href="details.html?sid=${value.sid}" target="_blank">
                        <img src="${value.url}" style="display:block;width:160px;height:160px;" />
                        </a> 
                    <p class="TVdetail"><a href="details.html?sid=${value.sid}" target="_blank">${value.title}</a></p>
                    <p class="TVxj">${value.stitle}</p>
                    <h3 class="price">¥${value.price}</h3>
				</li>
			`;
                });
                $html += '</ul>';
                $('.tv-right-pic').html($html);
            });
        })(jQuery);
    })

})