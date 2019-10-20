'use strict';

(function () {
  var pinSize = {
    WIDTH: 65,
    HEIGHT: 65,
    POINTY_END_HEIGHT: 22
  };

  var mainPin = document.querySelector('.map__pin--main');

  var pinClickHandler = function () {
    if (document.querySelector('.map').classList.contains('map--faded')) {
      window.pin.renderPinsList(window.data.generateAdvertsList());
    };

    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    var allFieldsets = document.querySelectorAll('.ad-form__element');

    window.form.enable();

    allFieldsets.forEach(function (element) {
      element.disabled = false;
    });

    window.form.setAvailability();
  };

  var buttonPinKeyDownHandler = function (evt) {
    var ENTER_KEYCODE = 13;
    if (evt.keyCode === ENTER_KEYCODE) {
      pinClickHandler();
    }

    mainPin.removeEventListener('keydown', buttonPinKeyDownHandler);
  };

  var buttonPinClickHandler = function (evt) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var buttonPinMouseMoveHandler = function (moveEvt) {
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
    };

    var buttonPinMouseUpHandler = function (upEvt) {

      pinClickHandler();
      window.form.setActiveAddress();

      document.removeEventListener('mouseup', buttonPinMouseUpHandler);
      document.removeEventListener('mousemove', buttonPinMouseMoveHandler);
    };

    document.addEventListener('mousemove', buttonPinMouseMoveHandler);
    document.addEventListener('mouseup', buttonPinMouseUpHandler);
  };

  mainPin.addEventListener('mousedown', buttonPinClickHandler)
  mainPin.addEventListener('keydown', buttonPinKeyDownHandler);

  window.map = {
    calculateDefualtAddress: function () {
      return {
        x: parseInt(mainPin.style.left, 10) - pinSize.WIDTH / 2,
        y: parseInt(mainPin.style.top, 10) - pinSize.HEIGHT / 2
      };
    },
    calculateCurrentAddress: function () {
      return {
        x: parseInt(mainPin.style.left, 10) - pinSize.WIDTH / 2,
        y: parseInt(mainPin.style.top, 10) + pinSize.POINTY_END_HEIGHT
      };
    }
  };
})();
