<?php  
	header('content-type:text/html;charset=utf-8');

	define('HOST','localhost');
	define('NAME','root');
	define('PASSWORD','123456');
	define('DBNAME','yihaodian');
	$conn=@new mysqli(HOST,NAME,PASSWORD,DBNAME);
	if($conn->connect_error){
		die('数据库连接失败'.$conn->connect_error);
	}
	$conn->query('SET NAMES UTF8');
?>