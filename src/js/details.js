!function ($) {
    $("footer").load('footer.html', function () { })
    $("header").load('header.html', function () { })


    //渲染数据
    let $sid = location.search.substring(1).split('=')[1];
    console.log($sid);
    $.ajax({
        url: 'http://localhost/1907%20gj/yihaodian/php/details.php',
        data: {
            sid: $sid
        },
        dataType: 'json'
    }).done(function (d) { //获取后端返回的数据。
        let $smallpic = d.urls.split(',');
        $('.proImg_border img').attr('src', d.url);

        $('.proImg img').attr('sid', d.sid); //添加自定义属性sid
        $('.mod_proName .mh').html(d.titile);
        $('#current_price .curp').html(d.price);
        //拼接小图片
        let $htmlstr = ''
        $.each($smallpic, function (index, value) {
            $htmlstr += `
            <b>
            <img width="50" height="50" class="detail_main_pic_class" src="${value}">
            </b>
            `;
        });
        $('.hideBox .mBox').html($htmlstr);

        //加入购物车。
        let sidarr = []; //存放商品的编号数组
        let numarr = []; //存放商品的数量数组
        //cookie添加， 获取， 删除
        let myobj = {
            addcookie: function (key, value, day) {
                let date = new Date();
                date.setDate(date.getDate() + day);
                document.cookie = key + '=' + encodeURIComponent(value) + ';expires=' + date;
            },
            getcookie: function (key) {
                let arr = decodeURIComponent(document.cookie).split('; ');
                for (let value of arr) {
                    let newarr = value.split('=');
                    if (key === newarr[0]) {
                        return newarr[1];
                    }
                }
            },
            delcookie: function (key) {
                addcookie(key, '', -1);
            }
        }

        //将cookie取出转换成数组，利用数组进行判断是否是第一次。
        function cookieToArray() {
            if (myobj.getcookie('cookiesid') && myobj.getcookie('cookienum')) {
                sidarr = myobj.getcookie('cookiesid').split(',') 
                numarr = myobj.getcookie('cookienum').split(',') 
            }
        }
        $('.buy_btn6 span').on('click',function(){
            let $sid = $(this).parents('.main_content').prev().find('.proImg').find('img').attr('sid');
            console.log($sid);
            cookieToArray();
            if ($.inArray($sid, sidarr) !== -1) {
                console.log(numarr);
                console.log(sidarr); 
                let changenum = parseInt(numarr[$.inArray($sid, sidarr)]) + parseInt($('.num').val());
                numarr[$.inArray($sid, sidarr)]=changenum;//数组值改变
                myobj.addcookie('cookienum', numarr.toString(), 10);//继续添加cookie

            }else { //不存在
                sidarr.push($sid); //将编号push进数组
                myobj.addcookie('cookiesid', sidarr.toString(), 10); //存储cookie ，整个数组。
                numarr.push($('.num').val()); //将商品的数量push进数组
                myobj.addcookie('cookienum', numarr.toString(), 10);}
        })
      
            //加的效果
            $(".add").click(function(){
              var n=$(this).parents().prev().find('.num').val();
              var num=parseInt(n)+1;
              if(num==0){ return;}
              $(this).parents().prev().find('.num').val(num);
            });
            //减的效果

            $(".no_reduce").click(function(){
                
              var n=$(this).parents().prev().find('.num').val();
              var num=parseInt(n)-1;
              if(num==0){ return}
              $(this).parents().prev().find('.num').val(num);
            })


        //放大镜
        class fangda {
            constructor() {
                this.wrap = $('.l');
                this.spic = $('.proImg');
                this.sf = $('.sf');
                this.bpic = $('#bpic');
                this.bf = $('#bf');
                this.left = $('.prev');
                this.right = $('.next');
                this.ullist = $('.hideBox .mBox');
                this.list = $('.mBox b');
            }

            init() {
                let _this = this;
                //1.鼠标移入，显示小放，移出消失
                this.spic.hover(function () {
                    $('.sf,#bf').css('visibility', 'visible');
                    //4.鼠标移动，小放跟随鼠标
                    _this.spic.on('mousemove', function (ev) {
                        _this.spicmove(ev);
                    });


                }, function () {
                    $('.sf,#bf').css('visibility', 'hidden');
                })

                //2.求小放的尺寸
                this.sf.css({
                    width: this.spic.width() * this.bf.width() / this.bpic.width(),
                    height: this.spic.height() * this.bf.height() / this.bpic.height(),
                })
                // //3.求比例
                this.bili = this.bpic.width() / this.spic.width();


                //5.给下面的b添加点击事件
                this.list.on('click', function () {
                    _this.change($(this));
                })

                //6.给右箭头添加点击事件

                this.num = 5;
                this.liwidth = this.list.eq(0).outerWidth();
                // console.log(this.list.length);
                if (this.num >= this.list.length) {
                    this.right.css('color', '#fff');
                }
                this.right.on('click', function () {
                    _this.rightclick();
                })
                this.left.on('click', function () {
                    _this.leftclick();
                });
            }

            spicmove(ev) {
                let l = ev.pageX - this.wrap.offset().left - this.sf.width() / 2;
                let t = ev.pageY - this.wrap.offset().top - this.sf.height() / 2;
                if (l < 0) {
                    l = 0;
                } else if (l > this.spic.width() - this.sf.width()) {
                    l = this.spic.width() - this.sf.width();
                }
                if (t < 0) {
                    t = 0;
                } else if (t > this.spic.height() - this.sf.height()) {
                    t = this.spic.height() - this.sf.height();
                }

                this.sf.css({
                    left: l,
                    top: t
                })
                this.bpic.css({
                    left: -l * this.bili,
                    top: -t * this.bili
                })

            }


            change(obj) {
                let $imgurl = obj.find('img').attr('src');
                this.spic.find('img').attr('src', $imgurl);
                this.bpic.attr('src', $imgurl);
                //重新设置小放的尺寸
                this.sf.css({
                    width: this.spic.width() * this.bf.width() / this.bpic.width(),
                    height: this.spic.height() * this.bf.height() / this.bpic.height(),
                })
                this.bili = this.bpic.width() / this.spic.width();
            }

            rightclick() {
                if (this.list.length > this.num) {
                    this.num++;
                    this.left.css('color', '#333');
                    if (this.num === this.list.length) {
                        this.right.css('color', '#fff');
                    }
                    this.ullist.animate({
                        left: -this.liwidth * (this.num - 5)
                    });
                }
            }
            leftclick() {
                if (this.num > 5) {
                    this.num--;
                    this.right.css('color', '#333');
                    if (this.num === 5) {
                        this.left.css('color', '#fff');
                    }
                    this.ullist.animate({
                        left: -this.liwidth * (this.num - 5)
                    });
                }
            }
        }
        new fangda().init();
    });




}(jQuery);