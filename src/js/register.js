$(document).ready(function () {
    const $username = $('#username');
    const $phonenum = $('#phonenum');
    const $phonecode = $('#phonecode');
    const $password = $('#password');
    const $pass = $('#pass');
    const $aTip = $('.regist-tip');
    const $oForm = $('form');
    const $oI = $('.same-code-btn i');
    const $em = $('em')

    $username.on('blur', function () {
        $.ajax({
            url: 'http://localhost/1907%20gj/yihaodian/php/register.php',
            dataType: 'json',
            data: {
                checkname: $username.val()
            },
            success: function (d) {
                if (!d) {
                    $username.parents().next().next().show();
                } else {
                    $username.parents().next().find('.tip-word').show().html('用户名已存在');
                    $username.parents().next().next().hide();
                }
            }
        })
    })

    //    表单验证
   
    let flagUser = true;
    let flagphone = true;
    let flagyzm = true;
    let flagPwd = true;
    let flagCpwd = true;
  
    // 用户名
    $username.on('focus', function () {
        if ($username.val() === '')
        // $username.parents().next().find('i').html('111')
        $username.parents().next().find('.tip-word').show().html('请输入6-20位数字、字母和下划线的用户名');
        $aTip.eq(0).css('opacity', '1');
        $aTip.css('top', '6px');
        $username.next().css('left', '-50px');
        $username.parents('.same-item').next().next().hide();
        flagUser = false;
    })
    $username.blur(function () {
        var vals = $username.val();
        if (vals !== '') {
            let userid = /^\w{6,20}$/;
           
            if (userid.test(vals)) {
                $username.parents().next().next().show();
                // console.log( $username.parents().next().next())
                $aTip.eq(0).css('opacity', '0');
                flagUser = true;
            } else {
                $username.parents().next().find('.tip-word').show().html('用户名输入错误');
                flagUser = false;
            }

        } else {
            $username.parents().next().find('.tip-word').show().html('用户名不能为空');
            flagUser = false;
        }
    });
    // 手机号
    $phonenum.on('focus', function () {
        if ($phonenum.val() === '')
            // $username.parents().next().find('i').html('111')
            $phonenum.parents().next().find('.tip-word').show().html('请输入手机号');
        $aTip.eq(1).css('opacity', '1');
        $aTip.css('top', '6px');
        $phonenum.next().css('left', '-50px');
        $phonenum.parents('.same-item').next().next().hide();
        flagphone = false;
    })
    $phonenum.blur(function () {
        var vals = $phonenum.val();
        if (vals !== '') {
            let telid = /^1[34578]\d{9}$/;
            if (telid.test(vals)) {
                $phonenum.parents().next().next().show();
                // console.log( $username.parents().next().next())
                $aTip.eq(1).css('opacity', '0');
                flagphone = true;
            } else {
                $phonenum.parents().next().find('.tip-word').show().html('格式错误，请输入正确的手机号码');
                flagphone = false;
            }

        } else {
            $phonenum.parents().next().find('.tip-word').show().html('手机号不能为空');
            flagphone = false;
        }
    });
    //验证码
    $phonecode.on('focus', function () {
        if ($phonecode.val() === '')
            $em.css('display', 'inline-block');
        $phonecode.parents().next().next('.regist-tip').show();
        $phonecode.parents().next().next().next().find('.tip-word').html('请输入验证码');
        $aTip.eq(2).css('opacity', '1');
        //     $aTip.css('top','6px');
        $phonecode.next().css('left', '-50px');
        $phonecode.parents('.same-item').next().next().next().next().hide();
        flagyzm = false;
    })
    $phonecode.blur(function () {

        if (vals !== '') {
            var oIvalue = $oI.html();
            var vals = $phonecode.val();
            console.log(oIvalue);
            console.log(vals);
            if (vals === oIvalue) {
                $phonecode.parents().next().next().next().next().show();
                // console.log( $username.parents().next().next())
                $aTip.eq(2).css('opacity', '0');
                flagyzm = true;
            } else {
                $phonecode.parents().next().next().next().find('.tip-word').show().html('输入错误');
                flagyzm = false;
            }

        } else {
            $phonecode.parents().next().next().next().find('.tip-word').show().html('验证码不能为空');
            flagyzm = false;
        }
    });
    $em.on('click', function () {
        $oI.html(yzm());
    })

    //随机获取验证码
    var arr = [];
    for (var i = 48; i <= 57; i++) {
        arr.push(String.fromCharCode(i));
    }
    for (var i = 97; i <= 122; i++) {
        arr.push(String.fromCharCode(i));
    }
    // console.log(arr.length);
    function yzm() {
        var str = '';
        for (var i = 0; i < 6; i++) {
            var index = parseInt(Math.random() * arr.length);
            if (arr[index] <= 9) {
                str += arr[index];
            } else {
                if (Math.random() > 0.5) {
                    str += arr[index].toUpperCase();
                }
                else {
                    str += arr[index];
                }
            }
        }
        return str;
    }

    //   设置密码
    $password.on('focus', function () {
        if ($password.val() === '')
            // $username.parents().next().find('i').html('111')
            $password.parents().next().find('.tip-word').show().html('请输入6-20位密码');

        $aTip.eq(3).css('opacity', '1');
        $aTip.css('top', '6px');
        $password.next().css('left', '-60px');
        $password.parents('.same-item').next().next().hide();
        flagPwd = false;
    })
    $password.on('input', function () {
        var vals = $password.val();
        let num = 0; //记录字符串中字符的种类
        let numreg = /\d+/;
        let uppercase = /[A-Z]+/;
        let lowercase = /[a-z]+/;
        let othercase = /[\W\_]+/;
        if (numreg.test(vals)) {
            num++;
        }
        if (uppercase.test(vals)) {
            num++;
        }
        if (lowercase.test(vals)) {
            num++;
        }
        if (othercase.test(vals)) {
            num++;
        }
        switch (num) {
            case 1:
                $password.parents().next().find('.tip-word').show().html('低');

                flagPwd = false;
                break;
            case 2:
            case 3:
                $password.parents().next().find('.tip-word').show().html('中');
                flagPwd = true;
                break;
            case 4:
                $password.parents().next().find('.tip-word').show().html('高');
                flagPwd = true;
                break;

        }

    })
    $password.blur(function () {
        var vals = $password.val();
        if (vals !== '') {
            $password.parents().next().next().show();
            // console.log( $username.parents().next().next())
            $aTip.eq(3).css('opacity', '0');
            flagPwd = true;

        } else {
            $password.parents().next().find('.tip-word').show().html('密码不能为空');
            flagPwd = false;
        }
    });

    // 确认密码
    $pass.on('focus', function () {
        if ($pass.val() === '')
            // $pass.parents().next().find('i').html('111')
            $pass.parents().next().find('.tip-word').show().html('请再次输入密码');
        $aTip.eq(4).css('opacity', '1');
        $aTip.css('top', '6px');
        $pass.next().css('left', '-60px');
        $pass.parents('.same-item').next().next().hide();
        flagCpwd = false;
    })
    $pass.blur(function () {
        var vals = $pass.val();
        if (vals !== '') {
            if (vals === $password.val()) {
                $pass.parents().next().next().show();
                // console.log( $pass.parents().next().next())
                $aTip.eq(4).css('opacity', '0');
                flagCpwd = true;
            } else {
                $pass.parents().next().find('.tip-word').show().html('两次密码不一致');
                flagCpwd = false;
            }

        } else {
            $pass.parents().next().find('.tip-word').show().html('密码不能为空');
            flagCpwd = false;
        }
    });

    //控制提交
    // let flagUser = true;
    // let flagphone=true;
    // let flagyzm=true;
    // let flagPwd = true;
    // let flagCpwd =true;
    // let flagAllow = true;
    $oForm.on('submit', function () {
        if ($username.val() === '') {
            $username.parents().next().find('.tip-word').show().html('用户名不能为空');
            flagUser = false;
        }
        if ($phonenum.val() === '') {
            $phonenum.parents().next().find('.tip-word').show().html('手机号不能为空');
            flagphone = false;
        }
        if ($phonecode.val() === '') {
            $phonecode.parents().next().next().next().find('.tip-word').html('验证码不能为空');
            flagyzm = false;
        }
        if ($password.val() === '') {
            $password.parents().next().find('.tip-word').show().html('密码不能为空');
            flagPwd = false;
        }
        if ($pass.val() === '') {
            $pass.parents().next().find('.tip-word').show().html('确认密码不能为空');
            flagCpwd = false;
        }
        if (!flagUser || !flagphone || !flagyzm || !flagPwd || !flagCpwd) {
            return false;
        }

    })


})



