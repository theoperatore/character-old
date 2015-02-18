// used to detect which transition event for which to listen on Panel3ds
exports.findTransitionEvent = function () {
  var div = document.createElement('div');
  var transitions = {
    'transition':'transitionend',
    'OTransition':'oTransitionEnd',
    'MozTransition':'transitionend',
    'WebkitTransition':'webkitTransitionEnd'
  }

  for(var tran in transitions){
    if( div.style[tran] !== undefined ){
      return transitions[tran];
    }
  }
}

// feature detection of css
exports.supports = function(feature) {
  var div = document.createElement('div');
  var prefixes = ("Moz webkit ms").split(" ");

  for (var i = 0; i < prefixes.length; i++) {
    if ((prefixes[i] + feature) in div.style) return true;
  }

  return false;
}