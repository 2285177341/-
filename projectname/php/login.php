<?php
require "conn.php";

if(isset($_POST['name'])){//前端ajax传输过来的额
	$tele=$_POST['tel'];
	$email=$_POST['mail'];
	$username=$_POST['name'];
	$password=md5($_POST['pass']);
}else{
	exit('非法操作');
}

$query="select * from user where username='$username' and password='$password' and tele='$tele' and email='$email'";
$result=mysql_query($query);

if(mysql_fetch_array($result)){
	echo true;
}else{
	echo false;
}






	
	
