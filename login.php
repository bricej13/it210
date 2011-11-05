<?
require 'connect.php';
if (is_logged_in()){
	header("Location: index.php");
}
if (isset($_POST['username']) && isset($_POST['password'])){
	$user = mysql_real_escape_string($_POST['username']);
	$pass = mysql_real_escape_string($_POST['password']);

	$query = "SELECT * FROM `users` WHERE `username`='$user'";
	$result = mysql_query($query, $con);
	if (mysql_num_rows($result) < 1){
		unset($_SESSION['user']);
		echo "<p style='color: red'>Login Fail</p>";
		print_login_form();
	}
	else {
		$row = mysql_fetch_array($result);
		if (check_pass($pass, $row)){
			$query = "UPDATE `users` SET `logged_in`=1 WHERE `username`='$user'";
			$result = mysql_query($query);
			if ($result){
				$_SESSION['user'] = $user;
				get_uid($user);
				header('Location: index.php');
			}
			else
				echo "<p>Could not update db</p>";

		}
		else {
			unset($_SESSION['user']);
			echo "<p style='color: red'>Login Fail</p>";
			print_login_form();
		}
	}
}
else
print_login_form();

function check_pass($pass, $row) {
	$salt = $row['username'];
	while (strlen($salt) < 8)
		$salt .= $salt;
	$salt = substr($salt, 0, 8);

	$hash = hash('sha256', $pass . $salt);
	if ($hash == $row['password'])
		return true;
	else
		return false;
}

function print_login_form() {
	echo "<link href='css/style.css' rel='stylesheet' type='text/css' />";
	echo '
		<body>
		<title>Login</title>
		<link href="http://fonts.googleapis.com/css?family=Questrial" rel="stylesheet" type="text/css" />
		<link href="http://fonts.googleapis.com/css?family=Fontdiner+Swanky" rel="stylesheet" type="text/css" />
		<link href="css/style.css" rel="stylesheet" type="text/css" />
		<div id="banner">Login</div>
		<div class="form">
		<form action="login.php" method="POST">
		Username: <input type="text" name="username" autofocus/><br>
		Password: <input type="password" name="password" /><br>
		<input type="submit" value="Login"/>
		</form>
		<a href="register.php">Register</a>
		</div>
		</body>
		';
}

function get_uid($user){
	global $con;
	$JSON = file_get_contents('js/bracket.json');
	$JSON = json_decode($JSON, true);

	$query = "SELECT * FROM `users` WHERE username='$user'";
	$row = mysql_fetch_assoc(mysql_query($query));
	$name = $row['displayname'];

	$i = 0;
	foreach ($JSON['People'] as $person){
		if ($person['name'] == $name){
			$_SESSION['uid'] = $i;
			break;
		}
		$i++;
	}

}

?>
