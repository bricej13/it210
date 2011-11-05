var current_game;
var current_game_num;
var bracket_data = { 
"People" : [
	{"name": "Bill",
	"image": "images/player1.png",
	"rollover": "images/player1_roll.png"},
	{"name": "Robert",
	"image": "images/player2.png",
	"rollover": "images/player2_roll.png"},
	{"name": "Larry",
	"image": "images/player3.png",
	"rollover": "images/player3_roll.png"},
	{"name": "Moe",
	"image": "images/player4.png",
	"rollover": "images/player4_roll.png"},
	{"name": "Curly",
	"image": "images/player5.png",
	"rollover": "images/player5_roll.png"},
	{"name": "John",
	"image": "images/player6.png",
	"rollover": "images/player6_roll.png"},
	{"name": "Paul",
	"image": "images/player7.png",
	"rollover": "images/player7_roll.png"},
	{"name": "Ringo",
	"image": "images/player8.png",
	"rollover": "images/player8_roll.png"},
	],
"Games" : [
	{"Matches" : [
		{"match": 0,
		"p1": 0,
		"p2": 1,
		"winner": 1},
		{"match": 1,
		"p1": 2,
		"p2": 3,
		"winner": 3},
		{"match": 2,
		"p1": 4,
		"p2": 5,
		"winner": 5},
		{"match": 3,
		"p1": 6,
		"p2": 7,
		"winner": 6},
		{"match": 4,
		"p1": 1,
		"p2": 3,
		"winner": null},
		{"match": 5,
		"p1": 5,
		"p2": 6,
		"winner": null},
		{"match": 6,
		"p1": null,
		"p2": null,
		"winner": null}
		]},
	{"Matches" : [
		{"match": 0,
		"p1": 0,
		"p2": 1,
		"winner": 1},
		{"match": 1,
		"p1": 2,
		"p2": 3,
		"winner": 3},
		{"match": 2,
		"p1": 4,
		"p2": 5,
		"winner": 5},
		{"match": 3,
		"p1": 6,
		"p2": 7,
		"winner": 7},
		{"match": 4,
		"p1": 1,
		"p2": 3,
		"winner": null},
		{"match": 5,
		"p1": 5,
		"p2": 7,
		"winner": null},
		{"match": 6,
		"p1": null,
		"p2": null,
		"winner": null}
		]},
	{"Matches" : [		//Set 2 - Only 7 players
        {"match": 0,
        "p1": 0,
        "p2": 1,
        "winner": null},
        {"match": 1,
        "p1": 2,
        "p2": 3,
        "winner": null},
        {"match": 2,
        "p1": 4,
        "p2": 5,
        "winner": null},
        {"match": 3,
        "p1": 6,
        "p2": null,
        "winner": null},
        {"match": 4,
        "p1": null,
        "p2": null,
        "winner": null},
        {"match": 5,
        "p1": null,
        "p2": null,
        "winner": null},
        {"match": 6,
        "p1": null,
        "p2": null,
        "winner": null}
        ]},
	{"Matches" : [		//Set 3 - Completely Empty
        {"match": 0,
        "p1": null,
        "p2": null,
        "winner": null},
        {"match": 1,
        "p1": null,
        "p2": null,
        "winner": null},
        {"match": 2,
        "p1": null,
        "p2": null,
        "winner": null},
        {"match": 3,
        "p1": null,
        "p2": null,
        "winner": null},
        {"match": 4,
        "p1": null,
        "p2": null,
        "winner": null},
        {"match": 5,
        "p1": null,
        "p2": null,
        "winner": null},
        {"match": 6,
        "p1": null,
        "p2": null,
        "winner": null}
        ]},
	{"Matches" : [		//Set 4 - 1 match has no p1, and another has no p2
        {"match": 0,
        "p1": 0,
        "p2": 1,
        "winner": 1},
        {"match": 1,
        "p1": 2,
        "p2": 3,
        "winner": 3},
        {"match": 2,
        "p1": 4,
        "p2": 5,
        "winner": 5},
        {"match": 3,
        "p1": 6,
        "p2": 7,
        "winner": 7},
        {"match": 4,
        "p1": 1,
        "p2": null,
        "winner": null},
        {"match": 5,
        "p1": null,
        "p2": 7,
        "winner": null},
        {"match": 6,
        "p1": null,
        "p2": null,
        "winner": null}
        ]},
	{"Matches" : [		//Set 5 - Completed Bracket
        {"match": 0,
        "p1": 0,
        "p2": 1,
        "winner": 1},
        {"match": 1,
        "p1": 2,
        "p2": 3,
        "winner": 3},
        {"match": 2,
        "p1": 4,
        "p2": 5,
        "winner": 5},
        {"match": 3,
        "p1": 6,
        "p2": 7,
        "winner": 7},
        {"match": 4,
        "p1": 1,
        "p2": 3,
        "winner": 3},
        {"match": 5,
        "p1": 5,
        "p2": 7,
        "winner": 7},
        {"match": 6,
        "p1": 3,
        "p2": 7,
        "winner": 3}
        ]}
]
};

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
			var html = '<button id="button_'+i+'" onClick="play('+game_num+','+p1+','+p2+')">Play</button>';
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
		document.getElementById('seed_14').innerHTML = '<table><tr><td class="image"><img src="' + winner_image + '" alt="User image" /></td><td class="desc">'+ winner_name +'</td></tr></table>';
	}
	else {
		document.getElementById('seed_14').innerHTML = '<div class="empty"></div>';

	}

}

function select_game(game_num) {
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

function play(game_num, p1, p2){
	var p1name = bracket_data['People'][p1].name;
	var p2name = bracket_data['People'][p2].name;
	if (game_num == 0)
		document.location = 'ttt.php?p1name='+p1name+'&p2name='+p2name+'&p1='+p1+'&p2='+p2;
	else
		document.location = 'con4.php?p1name='+p1name+'&p2name='+p2name+'&p1='+p1+'&p2='+p2;
		
}

function GetXmlHttpObject() {
	if (window.XMLHttpRequest)
		return new XMLHttpRequest();

	if (window.ActiveXObject)
		return new ActiveXObject("Microsoft.XMLHTTP");

	return null;
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
