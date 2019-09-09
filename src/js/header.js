$(document).ready(function () {
    // 全部类目下拉菜单
    function Head() {
        this.shopcar = $('.hd-shop-car a')
        this.aList = $('.all-list-title');
        this.hList = $('.all-list');

    }

    Head.prototype.init = function () {
        let _this = this;
        this.aList.on('mouseover', function () {
            _this.hList.show();
        })
        this.aList.on('mouseout', function () {
            _this.hList.hide();
        })
        this.shopcar.on('mouseover', function () {
            _this.shopcar.css('background', '#eee');
        })
        this.shopcar.on('mouseout', function () {
            _this.shopcar.css('background', '#fff');
        })
    }
    new Head().init();

    //头部登录切换
    function login() {
        var $unlogin = $('#header-top-unlogin');
        var $login = $('#header-login');
         var   $name = $('.hd-login-name');
       var  $close = $('.close');
        if (localStorage.getItem('loname')) {
            console.log(1);
            $unlogin.hide();
            $login.show();
            $name.html(localStorage.getItem('loname'));
        }
        $close.on('click', function () {
            localStorage.removeItem('loname');
            $unlogin.show();
            $login.hide();
        })

    }
    login();

    // 顶部悬浮
    $(window).on('scroll', function () {
        var $top = $(window).scrollTop();
        console.log($top);
        // if ($top >= 800) {
        //     $('.header-top-bar').css('position','fixed')
       
        // }
        if ($top > 700) {
            $('.head-hide').stop(true).animate({
                top: 0
            });
        } else {
            $('.head-hide').stop(true).animate({
                top: -60
            });
        }
    });



});
