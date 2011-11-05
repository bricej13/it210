/**
* This class implements the popular game Tic-Tac-Toe
*
* @author: pedrocorreia.net
*/
TicTacToe = function (players){

  //needed to allow private functions to call public methods
  var self=this;

  //saves all board moves
  var _board_moves;
  
  //all possible winning moves
  var _win_moves = {
    1: {pos1: 0, pos2: 1, pos3: 2},
    2: {pos1: 3, pos2: 4, pos3: 5},
    3: {pos1: 6, pos2: 7, pos3: 8},
    4: {pos1: 2, pos2: 4, pos3: 6},
    5: {pos1: 0, pos2: 3, pos3: 6},
    6: {pos1: 1, pos2: 4, pos3: 7},
    7: {pos1: 2, pos2: 5, pos3: 8},
    8: {pos1: 0, pos2: 4, pos3: 8}
  }

  //game settings
  var _settings = {
    num_squares: 9,
    min_plays_check: 5,
    player: "Player",//generic player name
    prefix_square: "square",
    class_player1: "player1",
    class_player2: "player2",
    name_player1: players['players']['player1'].name,
    name_player2: players['players']['player2'].name,
    lbl_points_player1: "lbl_player1",
    lbl_points_player2: "lbl_player2",
    lbl_points_draw: "lbl_draw",
    class_winning: "win",
    class_draw: "draw",
    console: "board_console"
  }
  
  //game statistics
  var _stats = {
    current_player: 1,
    num_plays: 1,
    winning_player: -1,
    points_player1: 0,
    points_player2: 0,
    points_draw: 0
  }

  /**
  * Next move
  */
  var _NextPlayer = function(){
    _stats.current_player=(_stats.current_player==1)?2:1;
    _stats.num_plays++;
    $class("next_player",_CurPlayerClass());
  }

  /**
  * Get current player css class
  */
  var _CurPlayerClass = function(){
    return (_stats.current_player==1)?_settings.class_player1:_settings.class_player2;  
  }

  /**
  * Add Events
  */
  var _EventHandlers = function(){
    var fn;
    for (var i=0;i<_settings.num_squares;i++){
      fn=(function(i){return function(){ _Select (i);}})(i);
      Events.AddEvent($(_settings.prefix_square+i),"click",fn);
    }

    Events.AddEvent($("bt_new_game"),"click",self.NewGame);
    Events.AddEvent($("bt_reset"),"click",_Reset);
  }
  
  /**
  * Check if the selected square is filled or not and check if the 
  * current player has a winning path.
  *
  * @param Int Número da Casa
  */
  var _Select = function(i){

    //check if the game ended, having or not a winner
    if(_stats.winning_player>-1 || _stats.num_plays>_settings.num_squares){
      alert(Messages.AlreadyFinished(_settings.player,_stats.winning_player));
      return;
    }

    if(_IsSquareEmpty(i)){ //check id the selected square is already filled
      $class(_settings.prefix_square+i,_CurPlayerClass());
      _MarkSquare(i,_stats.current_player);
      _TraceValidMove(i);
      _CheckBoard(_stats.current_player);
      _NextPlayer(); //next move
    }
    else{
      alert(Messages.SquareFilled()); //square already filled
    }
  }
  
  /**
  * Check if the selected square is available
  *
  * @param Int Square number
  * @return Bool
  */
  var _IsSquareEmpty = function(pos){return (_board_moves[pos]==0);}
  
  /**
  * Fill the squre, making it unavailable.
  *
  * @param Int Square number
  * @param Int Player number
  */
  var _MarkSquare = function(pos, player){_board_moves[pos]=player;}
  
  /**
  * Log move
  *
  * @param Int Square number
  */
  var _TraceValidMove = function(square){
    var str=Messages.TraceMove(_settings.player,_stats.current_player,square+1);
    $(_settings.console).innerHTML+=str+"<br/>";
  }

  /**
  * Check if in the current move, the player has a winning path 
  *
  * @param Int Player number
  */
  var _CheckBoard = function(player){
    if(_stats.num_plays<_settings.min_plays_check){return;}

    var count=0;
    var square="";

    for (var move in _win_moves){
      for (var i=1;i<=3;i++){
        square=_board_moves[_win_moves[move]["pos"+i]];
        if(square==player){count++;}
      }

      if (count==3){
        var path="";
        for (var i=1;i<=3;i++){
          square=_settings.prefix_square+_win_moves[move]["pos"+i];
          $class(square,_settings.class_winning,1);
          path+=(_win_moves[move]["pos"+i]+1)+";";
        }

        _stats.winning_player = player;
        $(_settings.console).innerHTML+=Messages.Winner(_CurPlayerClass(),_settings.player,player,path);

        _stats["points_player"+player]++;
        $(_settings["lbl_points_player"+player]).innerHTML=_stats["points_player"+player];
        return;
      }

      count=0;
    }

    if(_stats.num_plays==_settings.num_squares){
      _stats.points_draw++;
      _stats.winning_player = 0;
      $(_settings.lbl_points_draw).innerHTML=_stats.points_draw;
      $(_settings.console).innerHTML+=Messages.Draw(_settings.class_draw);
    }    
  }
  
  /**
  * Reset
  */
  var _Reset = function(){
    _stats.points_player1=0;
    _stats.points_player2=0;
    _stats.points_draw=0;
    $(_settings.lbl_points_player1).innerHTML=_stats.points_player1;
    $(_settings.lbl_points_player2).innerHTML=_stats.points_player2;
    $(_settings.lbl_points_draw).innerHTML=_stats.points_draw;

    self.NewGame();
  }

  /**
  * Start a new Game
  */
  this.NewGame = function(){
    for (var i=0;i<_settings.num_squares;i++){
      $class(_settings.prefix_square+i,"clear");
      $(_settings.prefix_square+i).innerHTML=(i+1);
    }

    _stats.num_plays=1;
    _stats.current_player=1;
    _stats.winning_player=-1;
    _board_moves = new Array(0,0,0,0,0,0,0,0,0);
    $(_settings.console).innerHTML="";
    $class("next_player",_settings.class_player1);
  }
  
  //EventHandlers
  _EventHandlers();
}
