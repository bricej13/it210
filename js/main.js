var current_game;
var current_game_num;
var bracket_data = null;
loadJSON('js/bracket.json');

function fill_bracket(game_num) {
	for (var i=0; i <=6; i++) {
		var matchname = 'match_' + i;
		var match = document.getElementsByClassName(matchname);
		var p1 = bracket_data['Games'][game_num]['Matches'][i].p1;
		var p2 = bracket_data['Games'][game_num]['Matches'][i].p2;

		if (bracket_data['People'][p1]){
			var p1name = bracket_data['People'][p1].name;
			var p1image = bracket_data['People'][p1].image;
			var p1roll = bracket_data['People'][p1].rollover;
			var divname = p1name +'_image_'+i;
			var imageEditUrl = iisurl + "?image=" + p1image
			//image1 = new Image();
			//image1.src = p1image;
			//image2 = new Image();
			//image2.src = p1roll;

			match[0].innerHTML = '<a onMouseOver="document.'+divname+'.src=\''+p1roll+'\'" onMouseOut="document.'+divname+'.src=\''+p1image+'\'"><table><tr><td class="image"><img src="' + p1image + '" name="'+divname+'" alt="User image" /></td><td class="desc">'+ p1name +'</td></tr></table></a>';
			}
		else
			match[0].innerHTML = '<div class="empty"></div>';

		if (bracket_data['People'][p2]){
			var p2name = bracket_data['People'][p2].name;
			var p2image = bracket_data['People'][p2].image;
			var p2roll = bracket_data['People'][p2].rollover;
			var divname = p2name +'_image_'+i;

			match[1].innerHTML = '<a onMouseOver="document.'+divname+'.src=\''+p2roll+'\'" onMouseOut="document.'+divname+'.src=\''+p2image+'\'"><table><tr><td class="image"><img src="' + p2image + '" name="'+divname+'" alt="User image" /></td><td class="desc">'+ p2name +'</td></tr></table></a>';
			//match[1].innerHTML = '<table><tr><td class="image"><a onMouseOver="document.'+divname+'.src=\''+p2roll+'\'" onMouseOut="document.'+divname+'.src=\''+p2image+'\'"><img src="' + p2image + '" name="'+divname+'" alt="User image" /></a></td><td class="desc">'+ p2name +'</td></tr></table>';
			}
		else
			match[1].innerHTML = '<div class="empty"></div>';


		if (bracket_data['People'][p1] && bracket_data['People'][p2] && bracket_data['Games'][game_num]['Matches'][i].winner == null){
			var button_id = 'play_' + i;
			var html = '<button id="button_'+i+'" onClick="play('+game_num+','+i+','+p1+','+p2+')">Play</button>';
			var button_div = document.getElementById(button_id);
			button_div.innerHTML = html;
		}
		else {
			var button_id = 'play_' + i;
			document.getElementById(button_id).innerHTML = "";
		}


	}

	if (bracket_data['Games'][game_num]['Matches'][6].winner != null) {
		var winner = bracket_data['Games'][game_num]['Matches'][6].winner;
		var winner_name = bracket_data['People'][winner].name;
		var winner_image = bracket_data['People'][winner].image;
		var winner_roll = bracket_data['People'][winner].roll;
		document.getElementById('seed_14').innerHTML = '<h3 style="padding: 5px; margin-top:0px; border-bottom: 1px solid #e3e3e3;">Grand<br>Champion</h3><img src="' + winner_image + '" alt="Champion" style="padding-top: 0px;"/><h3 style="margin-bottom: 3px;">'+ winner_name +'</h5>';
	}
	else {
		document.getElementById('seed_14').innerHTML = '<h3 style="padding: 5px; margin-top:0px; border-bottom: 1px solid #e3e3e3;">Grand<br>Champion</h3>';

	}

}

function select_game(game_num) {
	if (bracket_data != null) {
		current_game_num = game_num;

		if (game_num == 0)
			current_game = "Tic-Tac-Toe"
		else
			current_game = "Connect 4";

		document.getElementById('game_chooser').style.display = 'none';
		document.getElementById('bracket').style.display = 'block';
		document.getElementById('banner').innerHTML = current_game;

		fill_bracket(game_num);
	}

}

function play(game_num, match, p1, p2){
	var p1name = bracket_data['People'][p1].name;
	var p2name = bracket_data['People'][p2].name;
	if (game_num == 0)
		document.location = 'ttt.php?p1name='+p1name+'&p2name='+p2name+'&p1='+p1+'&p2='+p2+'&match='+match;
	else
		document.location = 'con4.php?p1name='+p1name+'&p2name='+p2name+'&p1='+p1+'&p2='+p2+'&match='+match;
		
}

function GetXmlHttpObject() {
	if (window.XMLHttpRequest)
		return new XMLHttpRequest();

	if (window.ActiveXObject)
		return new ActiveXObject("Microsoft.XMLHTTP");

	return null;
}

function loadJSON(url)
{
	var jsonAjax = GetXmlHttpObject();
	if (jsonAjax == null) { alert('Your browser is uber lame.  It does not support AJAX.  Upgrade NOW.'); return; }

	jsonAjax.onreadystatechange = function() {
		if (jsonAjax.readyState==4) {
			if (jsonAjax.status==200) {
				bracket_data = eval("(" + jsonAjax.responseText + ")");
				queryGame();
				return true;
			}	
			else {
				alert("Server error returned to AJAX call: " + jsonAjax.status);
				return false;
			}
		}
	};

	var url = url + '?nocache=' + (new Date().getTime());	
	jsonAjax.open("GET", url, true);
	jsonAjax.send(null);
}

function setWinner(match, winner, game)
{
	var jsonAjax = GetXmlHttpObject();
	var winnerResult;
	if (jsonAjax == null) { alert('Your browser is uber lame.  It does not support AJAX.  Upgrade NOW.'); return; }

	jsonAjax.onreadystatechange = function() {
		if (jsonAjax.readyState==4) {
			if (jsonAjax.status==200) {
				if(jsonAjax.responseText == "true"){
					messagePop(winnerName + " is the winner!", 'close');
				}
				else
					alert(jsonAjax.responseText);
			}	
			else {
				alert("Server error returned to AJAX call: " + jsonAjax.status);
				return false;
			}
		}
	};

	jsonAjax.open("POST", "updateWinner.php", true);
	jsonAjax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	jsonAjax.send("match="+match+"&winner="+winner+"&game="+game);
}

function show_game_selection() {
	document.getElementById('game_chooser').style.display = 'block';
	document.getElementById('bracket').style.display = 'none';

}



function get(varname) {
	var value = null;
	var query = window.location.search.substring(1);
	var parms = query.split('&');
	for (var i=0; i<parms.length; i++) {
		var pos = parms[i].indexOf('=');
		if (pos > 0) {
		var key = parms[i].substring(0,pos);
		var val = parms[i].substring(pos+1);
		if (key == varname)
			value = val;
	}
	}
	return value;
}

function queryGame(){
	var game = get('game_num');
	if (game != null)
		select_game(game);
}
