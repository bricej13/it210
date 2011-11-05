<?
require 'connect.php';
print_r($userinfo);
print_r($_SESSION);
if (!is_logged_in())
	header("Location: login.php");
	?>
	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
	<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
	<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<link href='http://fonts.googleapis.com/css?family=Questrial' rel='stylesheet' type='text/css' />
	<link href='http://fonts.googleapis.com/css?family=Fontdiner+Swanky' rel='stylesheet' type='text/css' />
	<link href='css/style.css' rel='stylesheet' type='text/css' />
	<link rel="SHORTCUT ICON" href="images/tigerhawk.png" />

	<script language='javascript' src='js/main.js'></script>
	<script type='text/javascript'>
	<? echo "iisurl = '$iisurl'"; ?>
	</script>
	<style type="text/css">
	</style>

	<title>Online Gaming</title>
	</head>
	<body>
	<div id="menu">
	<a href="logout.php" style="float: right; "><?echo "Logout <b>" . $userinfo['displayname'] . "</b>";?></a>
	</div>
	<div id="banner">Online Gaming</div>

	<div id="game_chooser" style="text-align:center;">
	<h1 style="text-align: center">What would you like to play?</h1>
	<img src="images/ttt.gif" onClick="select_game(0)" />
	<img src="images/connect4.png" onClick="select_game(1)" height="379"/>
	</div>

	<div id="bracket">
	<h1 style="text-align: center">Championship Bracket</h1>

	<table id="table_bracket">
	<tr><td><div class="seed rd_1 match_0 left" id="seed_0"></div></td>
	<td></td>
	<td></td>
	<td></td>
	<td></td>
	<td></td>
	<td><div class="seed rd_1 match_2 right" id="seed_4"></div></td></tr>

	<tr><td><div class="play" id="play_0"></div></td>
	<td><div class="seed rd_2 match_4 left" id="seed_8"></div></td>
	<td></td>
	<td></td>
	<td></td>
	<td><div class="seed rd_2 match_5 right" id="seed_10"></div></td>
	<td><div class="play" id="play_2"></div></td></tr>

	<tr><td><div class="seed rd_1 match_0 left" id="seed_1"></div></td>
	<td></td>
	<td></td>
	<td rowspan="3"><div class="seed" id="seed_14" ></div></td>
	<td></td>
	<td></td>
	<td><div class="seed rd_1 match_2 right" id="seed_5"></div></td></tr>

	<tr><td></td>
	<td><div class="play" id="play_4"></div></td>
	<td><div class="seed rd_3 match_6 left" id="seed_12"></div></td>
	<!--<td><div class="seed" id="seed_14" ></div></td>-->
	<td><div class="seed rd_3 match_6 right" id="seed_13"></div></td>
	<td><div class="play" id="play_5"></div></td>
	<td></td></tr>

	<tr><td><div class="seed rd_1 match_1 left" id="seed_2"></div></td>
	<td></td>
	<td></td>
	<td></td>
	<td></td>
	<td><div class="seed rd_1 match_3 right" id="seed_6"></div></td></tr>

	<tr><td><div class="play" id="play_1"></div></td>
	<td><div class="seed rd_2 match_4 left" id="seed_9"></div></td>
	<td></td>
	<td><div class="play" id="play_6"></div></td>
	<td></td>
	<td><div class="seed rd_2 match_5 right" id="seed_11"></div></td>
	<td><div class="play" id="play_3"></div></td></tr>

	<tr><td><div class="seed rd_1 match_1 left" id="seed_3"></div></td>
	<td></td>
	<td></td>
	<td></td>
	<td></td>
	<td></td>
	<td><div class="seed rd_1 match_3 right" id="seed_7"></div></td></tr>

	</table>
	<div style="text-align: center;">
	<a href="index.php" class="link" >Choose Game</a>
	<a href="<? echo $iisurl . '?uid=' . $_SESSION['uid'];?>" class="link">Change Avatar</a>
	</div>
	</div>

	</body>

	</html>
