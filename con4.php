<?
	require 'connect.php';
	if (!is_logged_in())
		header('Location: login.php')
?>
<HEAD>

<link href='css/style.css' rel='stylesheet' type='text/css' />
<link href='css/con4.css' rel='stylesheet' type='text/css' />
<script type="text/javascript" src="js/con4.js"></script>
<script type="text/javascript" src="js/main.js"></script>
<link href='http://fonts.googleapis.com/css?family=Questrial' rel='stylesheet' type='text/css' />
<link href='http://fonts.googleapis.com/css?family=Fontdiner+Swanky' rel='stylesheet' type='text/css' />
<link rel="SHORTCUT ICON" href="images/tigerhawk.png" />

</HEAD>
<BODY OnLoad="newMatchUp()">
<a href="logout.php" style="float: right; "><?echo "Logout <b>" . $userinfo['displayname'] . "</b>";?></a>
<div id="banner">Connect 4</div>

<div id="message" style="height: 40px; width: 20%;  left: 40%; top: 100px; position: absolute; text-align: center; font-size: 32px; font-family: sans-serif; text-shadow: #fff 0px 0px 3px; color: black; display: none;">text</div>
<div id="game_container">
<div id="con4_board">
<table cellspacing="0" cellpadding="0" border="0">
<tr>
<td><a href="javascript:void dropIt(0)" onMouseOver="placeTop(0); setMsg(''); return true" onMouseOut="unPlaceTop(0)"><img border="0" src="images/clearness.gif" height="50" width="50"></a></td>
<td><a href="javascript:void dropIt(1)" onMouseOver="placeTop(1); setMsg(''); return true" onMouseOut="unPlaceTop(1)"><img border="0" src="images/clearness.gif" height="50" width="50"></a></td>
<td><a href="javascript:void dropIt(2)" onMouseOver="placeTop(2); setMsg(''); return true" onMouseOut="unPlaceTop(2)"><img border="0" src="images/clearness.gif" height="50" width="50"></a></td>
<td><a href="javascript:void dropIt(3)" onMouseOver="placeTop(3); setMsg(''); return true" onMouseOut="unPlaceTop(3)"><img border="0" src="images/clearness.gif" height="50" width="50"></a></td>
<td><a href="javascript:void dropIt(4)" onMouseOver="placeTop(4); setMsg(''); return true" onMouseOut="unPlaceTop(4)"><img border="0" src="images/clearness.gif" height="50" width="50"></a></td>
<td><a href="javascript:void dropIt(5)" onMouseOver="placeTop(5); setMsg(''); return true" onMouseOut="unPlaceTop(5)"><img border="0" src="images/clearness.gif" height="50" width="50"></a></td>
<td><a href="javascript:void dropIt(6)" onMouseOver="placeTop(6); setMsg(''); return true" onMouseOut="unPlaceTop(6)"><img border="0" src="images/clearness.gif" height="50" width="50"></a></td>
</tr>
<tr>
<td><a href="javascript:void dropIt(0)" onMouseOver="placeTop(0); setMsg(''); return true" onMouseOut="unPlaceTop(0)"><img border="0" src="images/fillempty.gif" height="50" width="50"></A></td>
<td><a href="javascript:void dropIt(1)" onMouseOver="placeTop(1); setMsg(''); return true" onMouseOut="unPlaceTop(1)"><img border="0" src="images/fillempty.gif" height="50" width="50"></A></td>
<td><a href="javascript:void dropIt(2)" onMouseOver="placeTop(2); setMsg(''); return true" onMouseOut="unPlaceTop(2)"><img border="0" src="images/fillempty.gif" height="50" width="50"></A></td>
<td><a href="javascript:void dropIt(3)" onMouseOver="placeTop(3); setMsg(''); return true" onMouseOut="unPlaceTop(3)"><img border="0" src="images/fillempty.gif" height="50" width="50"></A></td>
<td><a href="javascript:void dropIt(4)" onMouseOver="placeTop(4); setMsg(''); return true" onMouseOut="unPlaceTop(4)"><img border="0" src="images/fillempty.gif" height="50" width="50"></A></td>
<td><a href="javascript:void dropIt(5)" onMouseOver="placeTop(5); setMsg(''); return true" onMouseOut="unPlaceTop(5)"><img border="0" src="images/fillempty.gif" height="50" width="50"></A></td>
<td><a href="javascript:void dropIt(6)" onMouseOver="placeTop(6); setMsg(''); return true" onMouseOut="unPlaceTop(6)"><img border="0" src="images/fillempty.gif" height="50" width="50"></A></td>
</tr>
<tr>
<td><a href="javascript:void dropIt(0)" onMouseOver="placeTop(0); setMsg(''); return true" onMouseOut="unPlaceTop(0)"><img border="0" src="images/fillempty.gif" height="50" width="50"></A></td>
<td><a href="javascript:void dropIt(1)" onMouseOver="placeTop(1); setMsg(''); return true" onMouseOut="unPlaceTop(1)"><img border="0" src="images/fillempty.gif" height="50" width="50"></A></td>
<td><a href="javascript:void dropIt(2)" onMouseOver="placeTop(2); setMsg(''); return true" onMouseOut="unPlaceTop(2)"><img border="0" src="images/fillempty.gif" height="50" width="50"></A></td>
<td><a href="javascript:void dropIt(3)" onMouseOver="placeTop(3); setMsg(''); return true" onMouseOut="unPlaceTop(3)"><img border="0" src="images/fillempty.gif" height="50" width="50"></A></td>
<td><a href="javascript:void dropIt(4)" onMouseOver="placeTop(4); setMsg(''); return true" onMouseOut="unPlaceTop(4)"><img border="0" src="images/fillempty.gif" height="50" width="50"></A></td>
<td><a href="javascript:void dropIt(5)" onMouseOver="placeTop(5); setMsg(''); return true" onMouseOut="unPlaceTop(5)"><img border="0" src="images/fillempty.gif" height="50" width="50"></A></td>
<td><a href="javascript:void dropIt(6)" onMouseOver="placeTop(6); setMsg(''); return true" onMouseOut="unPlaceTop(6)"><img border="0" src="images/fillempty.gif" height="50" width="50"></A></td>

</tr>
<tr>
<td><a href="javascript:void dropIt(0)" onMouseOver="placeTop(0); setMsg(''); return true" onMouseOut="unPlaceTop(0)"><img border="0" src="images/fillempty.gif" height="50" width="50"></A></td>
<td><a href="javascript:void dropIt(1)" onMouseOver="placeTop(1); setMsg(''); return true" onMouseOut="unPlaceTop(1)"><img border="0" src="images/fillempty.gif" height="50" width="50"></A></td>
<td><a href="javascript:void dropIt(2)" onMouseOver="placeTop(2); setMsg(''); return true" onMouseOut="unPlaceTop(2)"><img border="0" src="images/fillempty.gif" height="50" width="50"></A></td>
<td><a href="javascript:void dropIt(3)" onMouseOver="placeTop(3); setMsg(''); return true" onMouseOut="unPlaceTop(3)"><img border="0" src="images/fillempty.gif" height="50" width="50"></A></td>
<td><a href="javascript:void dropIt(4)" onMouseOver="placeTop(4); setMsg(''); return true" onMouseOut="unPlaceTop(4)"><img border="0" src="images/fillempty.gif" height="50" width="50"></A></td>
<td><a href="javascript:void dropIt(5)" onMouseOver="placeTop(5); setMsg(''); return true" onMouseOut="unPlaceTop(5)"><img border="0" src="images/fillempty.gif" height="50" width="50"></A></td>
<td><a href="javascript:void dropIt(6)" onMouseOver="placeTop(6); setMsg(''); return true" onMouseOut="unPlaceTop(6)"><img border="0" src="images/fillempty.gif" height="50" width="50"></A></td>
</tr>
<tr>
<td><a href="javascript:void dropIt(0)" onMouseOver="placeTop(0); setMsg(''); return true" onMouseOut="unPlaceTop(0)"><img border="0" src="images/fillempty.gif" height="50" width="50"></A></td>
<td><a href="javascript:void dropIt(1)" onMouseOver="placeTop(1); setMsg(''); return true" onMouseOut="unPlaceTop(1)"><img border="0" src="images/fillempty.gif" height="50" width="50"></A></td>
<td><a href="javascript:void dropIt(2)" onMouseOver="placeTop(2); setMsg(''); return true" onMouseOut="unPlaceTop(2)"><img border="0" src="images/fillempty.gif" height="50" width="50"></A></td>
<td><a href="javascript:void dropIt(3)" onMouseOver="placeTop(3); setMsg(''); return true" onMouseOut="unPlaceTop(3)"><img border="0" src="images/fillempty.gif" height="50" width="50"></A></td>
<td><a href="javascript:void dropIt(4)" onMouseOver="placeTop(4); setMsg(''); return true" onMouseOut="unPlaceTop(4)"><img border="0" src="images/fillempty.gif" height="50" width="50"></A></td>
<td><a href="javascript:void dropIt(5)" onMouseOver="placeTop(5); setMsg(''); return true" onMouseOut="unPlaceTop(5)"><img border="0" src="images/fillempty.gif" height="50" width="50"></A></td>
<td><a href="javascript:void dropIt(6)" onMouseOver="placeTop(6); setMsg(''); return true" onMouseOut="unPlaceTop(6)"><img border="0" src="images/fillempty.gif" height="50" width="50"></A></td>
</tr>
<tr>
<td><a href="javascript:void dropIt(0)" onMouseOver="placeTop(0); setMsg(''); return true" onMouseOut="unPlaceTop(0)"><img border="0" src="images/fillempty.gif" height="50" width="50"></A></td>
<td><a href="javascript:void dropIt(1)" onMouseOver="placeTop(1); setMsg(''); return true" onMouseOut="unPlaceTop(1)"><img border="0" src="images/fillempty.gif" height="50" width="50"></A></td>
<td><a href="javascript:void dropIt(2)" onMouseOver="placeTop(2); setMsg(''); return true" onMouseOut="unPlaceTop(2)"><img border="0" src="images/fillempty.gif" height="50" width="50"></A></td>
<td><a href="javascript:void dropIt(3)" onMouseOver="placeTop(3); setMsg(''); return true" onMouseOut="unPlaceTop(3)"><img border="0" src="images/fillempty.gif" height="50" width="50"></A></td>
<td><a href="javascript:void dropIt(4)" onMouseOver="placeTop(4); setMsg(''); return true" onMouseOut="unPlaceTop(4)"><img border="0" src="images/fillempty.gif" height="50" width="50"></A></td>
<td><a href="javascript:void dropIt(5)" onMouseOver="placeTop(5); setMsg(''); return true" onMouseOut="unPlaceTop(5)"><img border="0" src="images/fillempty.gif" height="50" width="50"></A></td>
<td><a href="javascript:void dropIt(6)" onMouseOver="placeTop(6); setMsg(''); return true" onMouseOut="unPlaceTop(6)"><img border="0" src="images/fillempty.gif" height="50" width="50"></A></td>
</tr>
<tr>
<td><a href="javascript:void dropIt(0)" onMouseOver="placeTop(0); setMsg(''); return true" onMouseOut="unPlaceTop(0)"><img border="0" src="images/fillempty.gif" height="50" width="50"></A></td>
<td><a href="javascript:void dropIt(1)" onMouseOver="placeTop(1); setMsg(''); return true" onMouseOut="unPlaceTop(1)"><img border="0" src="images/fillempty.gif" height="50" width="50"></A></td>
<td><a href="javascript:void dropIt(2)" onMouseOver="placeTop(2); setMsg(''); return true" onMouseOut="unPlaceTop(2)"><img border="0" src="images/fillempty.gif" height="50" width="50"></A></td>
<td><a href="javascript:void dropIt(3)" onMouseOver="placeTop(3); setMsg(''); return true" onMouseOut="unPlaceTop(3)"><img border="0" src="images/fillempty.gif" height="50" width="50"></A></td>
<td><a href="javascript:void dropIt(4)" onMouseOver="placeTop(4); setMsg(''); return true" onMouseOut="unPlaceTop(4)"><img border="0" src="images/fillempty.gif" height="50" width="50"></A></td>
<td><a href="javascript:void dropIt(5)" onMouseOver="placeTop(5); setMsg(''); return true" onMouseOut="unPlaceTop(5)"><img border="0" src="images/fillempty.gif" height="50" width="50"></A></td>
<td><a href="javascript:void dropIt(6)" onMouseOver="placeTop(6); setMsg(''); return true" onMouseOut="unPlaceTop(6)"><img border="0" src="images/fillempty.gif" height="50" width="50"></A></td>
</tr>
</table>

<div id='hud'></div>

</div>
</div>

