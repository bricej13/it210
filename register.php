<?
require 'connect.php';

$message = "";
$success = true;
$debug = false;

if (is_logged_in()){
	header("Location: index.php");
}
else if (mysql_num_rows(mysql_query("SELECT * FROM `users` WHERE 1"))>= 8){		//Check for max amount of players
	$JSON = file_get_contents('js/bracket.json');
	$JSON = json_decode($JSON, true);

	if ($debug){
		echo '<pre>';
		print_r($JSON);
		echo '</pre>';
	}
	$message .= '<span style="color: red">Registration closed - 8 player max reached</span><br>';
	echo "
	<title>Online Gaming Registration</title>
	<link href='http://fonts.googleapis.com/css?family=Questrial' rel='stylesheet' type='text/css' />
	<link href='http://fonts.googleapis.com/css?family=Fontdiner+Swanky' rel='stylesheet' type='text/css' />
	<link href='css/style.css' rel='stylesheet' type='text/css' />
	<div id='banner'>Registration</div>
	<div class='form'>
		<div class='message'>$message</div>
		<a href='login.php'>Login</a>
	</div>
	";
}
else if (isset($_POST['submit'])){

		if ($_POST['fullName'] != ""){
		}
		else {
			$message .= '<span style="color: red">Full name required</span><br>';
			$success = false;	
		}

		if ($_POST['userName'] != ""){
			if (check_username($_POST['userName'])){
			}
			else {
				$message .= '<span style="color: red">Username already taken</span><br>';
				$success = false;
			}
		}
		else {
			$message .= '<span style="color: red">Username required</span><br>';
			$success = false;	
		}

		if ($_POST['password'] != ""){
			if (strlen($_POST['password']) > 5){
			}
			else {
				$message .= '<span style="color: red">Password must be 6 characters or greater</span><br>';
				$success = false;	
			}
		}
		else {
			$message .= '<span style="color: red">Password required</span><br>';
			$success = false;	

		}

	if ($success){
		$hash = get_pass_hash($_POST);	
		$query = "INSERT INTO `users` (username, displayname, `password`, picture, rollover, game, mymatch, player, mymove, myturn, logged_in) VALUES ('{$_POST['userName']}', '{$_POST['fullName']}', '$hash', 'images/player1.png', 'images/player1_roll.png', 1, 1, 1, 1, 1, 0)";

		if (!mysql_query($query)){
			$message .= '<span style="color: red">Error adding user to database</span><br>';
			print_registration();
		}
		else {
			$message .= '<span style="color: green">Successfully added '.$POST['fullName'].'<br><a href="login.php">Login to continue</a></span>';
			print_registration();
			add_to_json();
		}
	}
	else {
		print_registration();
	}

}
else {
	reset_json();
	print_registration();
}

function print_registration(){
global $message;
echo "
	<title>Online Gaming Registration</title>
	<link href='http://fonts.googleapis.com/css?family=Questrial' rel='stylesheet' type='text/css' />
	<link href='http://fonts.googleapis.com/css?family=Fontdiner+Swanky' rel='stylesheet' type='text/css' />
	<link href='css/style.css' rel='stylesheet' type='text/css' />
	<div id='banner'>Registration</div>
	<div class='form'>
		<div class='message'>$message</div>
		<form action='register.php' method='POST'>
		<label for='fullName'>Full Name</label>
		<input type='text' id='fullName' name='fullName' /><br>

		<label for='userName'>Username</label>
		<input type='text' id='userName' name='userName' /><br>

		<label for='password'>Password</label>
		<input type='password' id='password' name='password' /><br>

		<input type='submit' id='submit' name='submit' /><br>

		</form>
		<a href='login.php'>Login</a>
	</div>


";
}

function check_username($user) {
	$query = "SELECT * from `users` WHERE `username`='$user'";
	$result = mysql_query($query);
	if (mysql_num_rows($result))
		return false;
	else
		return true;
}

function get_pass_hash($post) {
	$salt = $post['userName'];
	while (strlen($salt) < 8)
		$salt .= $salt;
	$salt = substr($salt, 0, 8);

	$hash = hash('sha256', $post['password'] . $salt);
	return $hash;
}

function updateJSON(){
	echo '<pre>';
	$JSON = file_get_contents('js/bracket.json');
	$JSON = json_decode($JSON, true);
	print_r($JSON['People']);
	echo '</pre>';
}

function update_json_users() {
	$JSON = file_get_contents('js/bracket.json');
	$JSON = json_decode($JSON, true);

	if ($debug){
		echo '<pre>';
		print_r($JSON);
		echo '</pre>';
	}

	$query = "SELECT * FROM `users` WHERE 1";
	$result = mysql_query($query);
	for ($i=0; $i < 8; $i++){
		$match = (int)($i / 2);
		$player = $i % 2;
		//echo "match: $match, player: $player<br>";
		if ($row = mysql_fetch_array($result)){
			$JSON['People'][$i]['name'] = $row['displayname'];
			$JSON['People'][$i]['image'] = $row['picture'];
			$JSON['People'][$i]['rollover'] = $row['rollover'];
			$JSON['Games'][1]['Matches'][$match]['match'] = $match;
			if ($player)
				$JSON['Games'][1]['Matches'][$match]['p2'] = $i;
			else
				$JSON['Games'][1]['Matches'][$match]['p1'] = $i;

		}
		else {
			$JSON['People'][$i]['name'] = null;
			$JSON['People'][$i]['image'] = null;
			$JSON['People'][$i]['rollover'] = null;
			$JSON['Games'][1]['Matches'][$match]['match'] = $match;
		}
	}
		if ($debug){
			echo '<pre>';
			print_r($JSON);
			echo '</pre>';
		}
	file_put_contents('js/bracket.json', json_encode($JSON));
}

function reset_json(){
	global $debug;
	$JSON = file_get_contents('js/blank.json');
	$JSON = json_decode($JSON, true);

	$query = "SELECT * FROM `users` WHERE 1";
	$result = mysql_query($query);
	for ($i=0; $i < 8; $i++){
		$match = (int)($i/2);
		if ($row = mysql_fetch_array($result)){
			$JSON['People'][$i]['name'] = $row['displayname'];
			$JSON['People'][$i]['image'] = $row['picture'];
			$JSON['People'][$i]['rollover'] = $row['rollover'];
			if ($i%2)
				$JSON['Games'][1]['Matches'][$match]['p2'] = $i;
			else
				$JSON['Games'][1]['Matches'][$match]['p1'] = $i;

		}
	}
	if ($debug){
		echo '<pre>';
		print_r($JSON);
		echo '</pre>';
	}
	file_put_contents('js/bracket.json', json_encode($JSON));

}

function add_to_json(){
}

?>
