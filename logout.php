<?
require 'connect.php';
	$user = $_SESSION['user'];
	$query = "UPDATE `users` SET `logged_in`=0 WHERE `username`='$user'";
	if (session_destroy() && mysql_query($query)){
		header('Location: login.php');
	}
	else
		echo "<p style='color: red'>logout fail :(</p>";
		
?>
