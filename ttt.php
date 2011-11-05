<?
	require 'connect.php';
	if (!is_logged_in())
		header("Location: login.php");
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" 
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
  <head>
    <title>Tic-Tac-Toe</title>
    <link rel="stylesheet" href="css/ttt_style.css" />
    <script type="text/javascript" src="js/ttt/Events.js"></script>  
    <script type="text/javascript" src="js/ttt/Dom.js"></script>  
    <script type="text/javascript" src="js/ttt/Messages.js"></script>  
    <script type="text/javascript" src="js/ttt/TicTacToe.js"></script>
    <script type="text/javascript" src="js/ttt/Init.js"></script>  
	 <script type="text/javascript">

		var player_data = {"players": {
				"player1": {
					"name": "Bill",
					"image": "../images/player1.png",
					"rollover": "../images/roll.png"
				},
				"player2": {
					"name": "Robert",
					"image": "../images/player2.png",
					"rollover": "../images/roll.png"
				}
			}
		};
		function start_game(){
			Init(player_data);
		}

	 </script>
  </head>

  <body onload="start_game()">
    <div id="board_title">Tic-Tac-Toe</div>

    <div id="board">
      <div id="square0"></div>
      <div id="square1"></div>
      <div id="square2"></div>
      <div id="square3"></div>
      <div id="square4"></div>
      <div id="square5"></div>
      <div id="square6"></div>
      <div id="square7"></div>
      <div id="square8"></div>
    </div>

    <div id="info">

      <div id="board_console"></div>

      <div id="board_control">
        <span id="player_1_name">Stats Player 1:</span> <label id="lbl_player1" class="player one">0</label>
        <br />
        <span id="player_2_name">Stats Player 2:</span> <label id="lbl_player2" class="player two">0</label>
        <br />
        <span>Draws:</span> <label id="lbl_draw" class="player draw">0</label>
        <br /><br />
        <input type="button" value="New Game" id="bt_new_game" />
        <input type="button" value="Reset" id="bt_reset" />
      </div>

      <div id="board_info">Next move<div id="next_player"></div></div>

    </div>
  </body>

</html>
