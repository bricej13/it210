<?
$db = "it210";
//$db_user = "byujoh0_it210";
//$db_pass = "PI)=lm5;98@(";
$db_user = "it210";
$db_pass = "UmANEZv2rmxHrRKA";
$userinfo;
$iisurl = "http://192.169.210.159/";

$con = mysql_connect('localhost', $db_user, $db_pass);
if (!$con)
	die('Could not connect: ' . mysql_error());
	mysql_select_db($db, $con);
	session_start();


	function is_logged_in(){
		global $userinfo;
		if (isset($_SESSION['user'])){
			return true;
		}
		else
			return false;
	}

function get_userinfo(){
	if (is_logged_in()){

	}
}

?>
