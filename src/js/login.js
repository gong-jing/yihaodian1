$(document).ready(function () {
    
    const $username =$('#username');
    const $password = $('#password');

    const $login = $('#login');

    $login.on('click', function () {
        // console.log(1);
        $.ajax({
            type: 'post',
            url: 'http://localhost/1907%20gj/yihaodian/php/login.php',
            data: {
                user: $username.val(),
                pass: $password.val(),
            },
            success: function (d) {
                if (!d) {
                    alert('用户名和密码错误');
                } else {
                    location.href = 'http://localhost/1907%20gj/yihaodian/src/index.html';
                    localStorage.setItem('loname', $username.val());
                }
            }
        });
    })
})



