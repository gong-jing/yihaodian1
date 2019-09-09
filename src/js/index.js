!function ($) {
    $("footer").load('footer.html', function () { })
    $("header").load('header.html', function () { })
 
    // 轮播图
    class lunbo {
        constructor() {
            this.lunbo =$('.lunbo');
            this.btnli = $('.lunbo-tab ol li');
            this.imgli =$('.lunbo-ul li');
            this.index = 0;
            this.timer = null;
        }
        init() {
            let _this = this;
            this.btnli.on('mouseover', function () {

                _this.index = $(this).index();//存储当前的索引
                _this.tabswitch();

            })
            this.lunbo.on('mouseover', function () {
                clearInterval(_this.timer);
            })
            this.lunbo.on('mouseout', function () {
                _this.timer = setInterval(function () {
                    _this.index++;
                    if (_this.index > _this.btnli.length - 1) {
                        _this.index = 0;
                    }
                    _this.tabswitch();
                }, 2000);
            })
        }

        tabswitch() {
            this.btnli.eq(this.index).addClass('active').siblings().removeClass('active');
            this.imgli.stop(true, true).eq(this.index).animate({
                opacity: 1
            })
            this.imgli.stop(true, true).not(this.imgli.eq(this.index)).animate({
                opacity: 0
            })

        }
    }
    new lunbo().init();

  
   

    // 侧边栏切换
    !function () {
       this.banner = $('.qua-slide-inner');
        this.moveul = $('.qua-top-slide-ul');
        this.left= $('.qua-top-lbtn');
        this.right =$('.qua-top-rbtn');
        this.index = 0;
        this.liwidth=200;
        let _this = this;

        this.left.on('mouseover', function () {
            _this.left.css('background', '#aaa');

        })
        this.left.on('mouseout', function () {
            _this.left.css('background', '#ccc');

        })
        this.right.on('mouseover', function () {
            _this.right.css('background', '#aaa');

        })
        this.right.on('mouseout', function () {
            _this.right.css('background', '#ccc');

        })

        this.right.on('click', function () {
            _this.index++
            if(_this.index<3){
                _this.moveul.css('left',-_this.index*_this.liwidth);
            }
        })
        this.left.on('click', function () {
            _this.index--
            console.log(_this.index)
            if(_this.index>=0){
                _this.moveul.css('left',-_this.index*_this.liwidth);
            }
        })
    }();


    //楼梯
    !function () {
        let $loutinav = $('#loutinav');
        let $loutinavli = $('#loutinav li');
        let $louceng = $('.louceng');

        $(window).on('scroll', function () {
            let $topvalue = $(this).scrollTop();
            // console.log($topvalue);
            if (1000 <= $topvalue && $topvalue <= 2690) {
                $loutinav.show();
            } else {
                $loutinav.hide();
            }

            $louceng.each(function (index, element) {
                let $loucengtop = $(element).offset().top + $(element).height() / 2;
                // console.log($loucengtop);
                if ($loucengtop > $topvalue) {
                    $loutinavli.eq(index).addClass('active').siblings().removeClass('active');
                    return false;
                }
            });
        });
        $loutinavli.on('click', function () {
            $(this).addClass('active').siblings().removeClass('active');
            let $top = $louceng.eq($(this).index()).offset().top;
            $('html,body').animate({
                scrollTop: $top
            });
        });

    }()




    //渲染商品列表
    $.ajax({
        url: 'http://localhost/1907%20gj/yihaodian/php/likedata.php',
        dataType: 'json'
    }).done(function (piclist) {
        let $strhtml = '<ul>';
        // console.log(piclist)
        $.each(piclist, function (index, value) {
            $strhtml += `
                <a href="details.html?sid=${value.sid}">
                <li class="list-single">
                <div class="list-pic">
                    <img class="sing-img" src="${value.url}" alt="">
                </div>
                <p class="sin-title">${value.title}</p>
                <p class="sing-money">
                    ￥<span>${value.price}</span>
                </p>
                <div class="sing-btn-con">
                    <div class="sing-gw sing-hove">
                        <a href="#"><i class="iconfont"></i></a>
                    </div>
                    
                        <div class="sing-hove sing-xs">
                            <a href="#">找相似</a>
                    </div>
                </div>
            </li>
            </a>`

                ;
        });
        $strhtml += '</ul>';

        $('.under-list').html($strhtml);
    });
}(jQuery);
