/**
* Static Class
*
* A few basic DOM manipulations
* 
* @author: pedrocorreia.net
*/
Dom = function(){}

/**
* Get Html Object reference
*
* @param String Id Object
*/
$=function(id){return document.getElementById(id);}

/**
* Get, set or append html object css class
*
* @param Object Html Object
* @param Optional String Class Name
* @param Optional Int Append Class?
*/
$class=function(obj /**, css_class**/ /**, append*/){
  if(arguments[1] && arguments[2]){$(obj).className+=" "+arguments[1];}
  else if(arguments[1]){$(obj).className=arguments[1];}
  else{return $(obj).className;}
}