/**
* Static Class
* Manage Events
*/
Events = function(){}

/**
* Add Event
*
* Source and full credits to:
* http://www.quirksmode.org/blog/archives/2005/10/_and_the_winner_1.html
*
* @param Object
* @param Object
* @param Object
*/
Events.AddEvent = function(obj, type, fn){
  if(!obj) return;

  this.RemoveEvent(obj, type, fn);
  if (obj.addEventListener) {obj.addEventListener(type, fn, false);}
  else {
    if (obj.attachEvent) {
      obj["e" + type + fn] = fn;
      obj[type + fn] = function(){
      obj["e" + type + fn](window.event);
      }
      obj.attachEvent("on" + type, obj[type + fn]);
    }
  }
}

/**
* Remove Event
*
* Source and full credits to:
* http://www.quirksmode.org/blog/archives/2005/10/_and_the_winner_1.html
*
* @param Object
* @param Object
* @param Object
*/
Events.RemoveEvent = function(obj, type, fn){
  if (obj.removeEventListener) {
    try{obj.removeEventListener(type, fn, false);}catch(e){}
  }
  else{
    if (obj.detachEvent) {
      obj.detachEvent("on" + type, fn);
      obj[type + fn] = null;
      obj["e" + type + fn] = null;
    }
  }
}