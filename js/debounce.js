'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 300; // ms

  var lastTimeout;
  var debounce = function (cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  }

  window.debounce = {
    enable: debounce
  }
})();
