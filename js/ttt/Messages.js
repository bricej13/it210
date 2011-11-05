/**
* Static Class
*
* Language file
*
* @author: pedrocorreia.net
*/
Messages = function(){}

/**
* Where game's already finished
*
* @param String Player Name
* @param Int Who won the game
*/
Messages.AlreadyFinished = function (name, number){
  var str="";
  switch (number){
    case 0:
      str="Draw.";
    break;
    default:
      str=name+" "+number+"'s the winner!";
    break;
  
  }
  return "Game already finished. "+str+"\n\Please press \"New Game\"";
}

/**
* Square already filled
*/
Messages.SquareFilled = function(){
  return "Esta Casa já se encontra preenchida";
}

/**
* Who won the game
*/
Messages.Winner = function(clss, name, number, path){
  return "<span class='"+clss+"'>"+name+": "+number+", won the game<span> | Squares: "+path;
}

/**
* Draw message
*/
Messages.Draw = function(clss){
  return "<span class='"+clss+"'>The game finished tied up!</span>"
}

/**
* Trace move
*
* @param String Player Name
* @param Int Player Id
* @param Int Square filled
*/
Messages.TraceMove = function(name, number, square){
  return "<b>"+name+":</b> "+number+" | <b>Square:</b> "+square;
}