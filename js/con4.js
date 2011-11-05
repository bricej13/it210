var vals = new Array();
var gameActive = 0;
var redPlayer;
var blackPlayer;
var whosFirst;
var placeLoc;
var matchMade = 0;

var redSpot = new Image();
var blackSpot = new Image();
var emptySpot = new Image();
var emptyChecker = new Image();
var redChecker = new Image();
var blackChecker = new Image();
var winnerName;
redSpot.src = "images/fillred.gif";
blackSpot.src = "images/fillblack.gif";
emptySpot.src = "images/fillempty.gif";
emptyChecker.src = "images/clearness.gif";
redChecker.src = "images/redchecker.gif";
blackChecker.src = "images/blackchecker.gif";

var whosTurn = "red";
var whosTurnSpot = new Image();
var whosTurnChecker = new Image();
whosTurnSpot.src = redSpot.src;
whosTurnChecker.src = redChecker.src;

var lookForSrc;
var someOneWon;
var rowsFull = 0;

function rePlay() {
	if (gameActive == 1) {
		clearBoard();
	}
	for (var c1 = 0; c1 <= 6; c1++) {
		vals[c1] = 0;
	}
	document.getElementById('message').style.display = 'none';
}

function clearBoard() {
	for (var a = 7; a <= 48; a++) {
		document.images[a].src = emptySpot.src;
	}
}

function placeTop(picToPlace) {
	if (gameActive == 1) {
		document.images[picToPlace].src = whosTurnChecker.src;
	}
}

function unPlaceTop(picToUnplace) {
	if (gameActive == 1) {
		document.images[picToUnplace].src = emptyChecker.src;
	}
}

function dropIt(whichRow) {
	if (gameActive == 1) {
		//alert("func dropIt")
		placeLoc = (7 - vals[whichRow]) * 7 -7 + whichRow;
		if (vals[whichRow] < 6) {
			document.images[placeLoc].src = whosTurnSpot.src;
			vals[whichRow] = vals[whichRow] + 1;
			checkForWinner(whosTurn);
			switchTurns();
			placeTop(whichRow);
		}
	}
}

function whoGoesFirst() {
	whosTurn = whosFirst;
	switchTurns();
	if (whosFirst == "red") {
		whosFirst = "black";
	} 
	else {
		whosFirst = "red";
	}
}

function switchTurns() {
	if (gameActive == 1) {
		if (whosTurn == "red") {
			whosTurn = "black"
			whosTurnSpot.src = blackSpot.src
			whosTurnChecker.src = blackChecker.src
			document.getElementById('hud').innerHTML = blackPlayer + "'s turn";
		} else {
			whosTurn = "red"
			whosTurnSpot.src = redSpot.src
			whosTurnChecker.src = redChecker.src
			document.getElementById('hud').innerHTML = redPlayer + "'s turn";
		}
	}
}

function askForNames() {
	if (gameActive == 1) {
		matchMade = 1
		redPlayer = unescape(get('p1name'));
		blackPlayer = unescape(get('p2name'));

		document.getElementById('hud').innerHTML = redPlayer + "'s turn";
		whosTurn = "black"
		switchTurns()
		whosFirst = "red"
		
	}
}

function checkForWinner(colorToCheck) {
	if (gameActive == 1) {
		//alert("func checkForWinner")
		someOneWon = 0
		if (colorToCheck == "red") {
			lookForSrc = redSpot.src
		}
		if (colorToCheck == "black") {
			lookForSrc = blackSpot.src
		}
		rowsFull = 0
		//alert("LookForSrc = " + lookForSrc + ".  And document.images[7].src = " + document.images[7].src)
		for (var counter = 7; counter <= 48; counter++) {
			if (document.images[counter].src == lookForSrc) {
				if ((counter + 3 <= 48 
				&& counter != 11 && counter != 12 && counter != 13 
				&& counter != 18 && counter != 19 && counter != 20 
				&& counter != 25 && counter != 26 && counter != 27 
				&& counter != 32 && counter != 33 && counter != 34 
				&& counter != 39 && counter != 40 && counter != 41
				&& document.images[counter + 1].src == lookForSrc
				&& document.images[counter + 2].src == lookForSrc
				&& document.images[counter + 3].src == lookForSrc) 
				|| (counter + 3 * 7 <= 48
				&& document.images[counter + 7].src == lookForSrc
				&& document.images[counter + 7*2].src == lookForSrc
				&& document.images[counter + 7*3].src == lookForSrc)
				|| (counter + 3 * 7 <= 48
				&& counter != 11 && counter != 12 && counter != 13 
				&& counter != 18 && counter != 19 && counter != 20 
				&& counter != 25 && counter != 26 && counter != 27 
				&& document.images[counter + 7 + 1].src == lookForSrc
				&& document.images[counter + 7*2 + 2].src == lookForSrc
				&& document.images[counter + 7*3 + 3].src == lookForSrc)
				|| (counter - 3 * 7 >= 7
				&& counter != 32 && counter != 33 && counter != 34 
				&& counter != 39 && counter != 40 && counter != 41
				&& counter != 46 && counter != 47 && counter != 48
				&& document.images[counter - 7 + 1].src == lookForSrc
				&& document.images[counter - 7*2 + 2].src == lookForSrc
				&& document.images[counter - 7*3 + 3].src == lookForSrc)) {
					for (var c2 = 0; c2<= 6; c2++) {
						unPlaceTop(c2)
					}
					if (colorToCheck == "red") {
						var winner = get('p1');
						winnerName = redPlayer;
						theWinner(winner);
					} else if (colorToCheck == "black") {
						var winner = get('p2');
						winnerName = blackPlayer;
						theWinner(winner);
					}
					gameActive = 0
					someOneWon = 1
					counter = 49
					//setTimeout("window.close()", 3000);;
				}
			}
		}
		if (someOneWon != 1) {
			for (var poo = 0; poo <= 6; poo++) {
				if (vals[poo] == 6) {
					rowsFull += 1
				}
			}
			if (rowsFull == 7) {
				for (var c3 = 0; c3<= 6; c3++) {
					unPlaceTop(c3)
				}
				gameActive = 0
				messagePop("This game has reached a draw, you'll have to try again", 'replay')
			}
		}
	}
}

function newGame() {
	if (matchMade == 1) {
		gameActive = 1
		rePlay()
		whoGoesFirst()
	}
}

function newMatchUp() {
	gameActive = 1
	rePlay()
	askForNames()
}

function setMsg(whatToSay) {
	window.status = whatToSay
	return true
}

function get(varname) {
	var value;
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

function messagePop(message, action) {
	var mBox = document.getElementById('message')
	if (action == 'close')
		mBox.innerHTML = message + "<p><button id='message_button' onclick='window.location = \"index.php?game_num=1\"' style='height: 3em; width: 7em;'>Done</button></p>";
	else if (action == 'replay')
		mBox.innerHTML = message + "<p><button id='message_button' onclick='newMatchUp()' style='height: 3em; width: 7em;'>Again!</button></p>";
	mBox.style.display = 'block';
}

function theWinner(winner) {
	var mBox = document.getElementById('message')
	mBox.innerHTML = "<img src='images/ajax-loader.gif' />";
	mBox.style.display='block';
	var match = get('match');
	setWinner(match, winner, 1);
}

