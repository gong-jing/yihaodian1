<?php
header('content-type:text/html;charset=utf-8');
require "conn.php";

//检测用户名
if(isset($_GET['checkname'])){
    $username=$_GET['checkname'];
    
    //通过查询方式来测试是否存在用户名。
    $result=$conn->query("select * from usertable where username='$username'");

    if($result->fetch_assoc()){//存在
        echo true;//1
    }else{//不存在
        echo false;//空隙
    }
}




//前端用户点击了submit按钮。接收前端传入表单的值。
if(isset($_POST['submit'])){
    $name=$_POST['username'];
    $pass=sha1($_POST['password']);//加密
    $phonenum=$_POST['phonenum'];
    $phonecode=$_POST['phonecode'];
  
    //添加数据库
    $conn->query("insert usertable values(null,'$name','$pass','$phonenum','$phonecode',NOW())");

    //php的跳转
    header('location:http://localhost/1907%20gj/yihaodian/src/login.html');
}