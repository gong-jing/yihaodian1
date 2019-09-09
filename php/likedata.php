<?php  
	header('content-type:text/html;charset=utf-8');//设置字符编码
    require("conn.php");
    $result=$conn->query("select * from likepic");
    
    $arrdata=array();
    for($i=0;$i<$result->num_rows;$i++){
    $arrdata[$i]=$result->fetch_assoc();//将数组给$arrdata的每一项
    }

    echo json_encode($arrdata);
    // echo json_encode($result->fetch_assoc());

?>