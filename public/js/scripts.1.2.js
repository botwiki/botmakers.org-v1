"use strict";

function ready(fn) {
  if (document.readyState !== 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(function(){
  var shiftedEls = document.getElementsByClassName('shifted');
  if (shiftedEls.length > 0){
    Array.prototype.forEach.call(shiftedEls, function(el, index) {
      setTimeout(
        function(){
          el.classList.remove('shifted');
          el.classList.add('unshifted');
        },
        55*index*index);
    });
  }
});
