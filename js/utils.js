'use strict';

(function () {
  var Keycode = {
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13
  };

  var isEscEvt = function (code) {
    return code === Keycode.ESC_KEYCODE;
  };

  var isEnterEvt = function (code) {
    return code === Keycode.ENTER_KEYCODE;
  };

  window.utils = {
    isEscEvt: isEscEvt,
    isEnterEvt: isEnterEvt
  };
})();
