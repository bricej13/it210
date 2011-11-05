/**
* Init function
*
* @author pedrocorreia.net
*/
function Init(players) {
	
	console.log(players);

  document.getElementById('player_1_name').innerHTML = players['players']['player1'].name;
  document.getElementById('player_2_name').innerHTML = players['players']['player2'].name;

	document.styleSheets[0].addRule('div.player1',"background: url('"+players['players']['player1'].image+"') no-repeat center center");
	document.styleSheets[0].addRule('div.player2',"background: url('"+players['players']['player2'].image+"') no-repeat center center");

  var tic_tac_toe=new TicTacToe(players);
  tic_tac_toe.NewGame();
}

