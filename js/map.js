'use strict';

(function () {
  var pinSize = {
    WIDTH: 65,
    HEIGHT: 65,
    POINTY_END_HEIGHT: 22
  };

  var mainPin = document.querySelector('.map__pin--main');

  var pinClickHandler = function () {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    var allFieldsets = document.querySelectorAll('.ad-form__element');

    window.form.enable();

    allFieldsets.forEach(function (element) {
      element.disabled = false;
    });

    window.form.setAvailability();
    window.pin.renderPinsList(window.data.generateAdvertsList());
  };

  var buttonPinClickHandler = function (evt) {
    evt.preventDefault();

    var ENTER_KEYCODE = 13;
    pinClickHandler();
    window.form.setActiveAddress();

    if (evt.keyCode === ENTER_KEYCODE) {
      pinClickHandler();
    }

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var buttonPinMouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

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
      upEvt.preventDefault();

      //mainPin.removeEventListener('mousedown', buttonPinClickHandler);
      document.removeEventListener('mouseup', buttonPinMouseUpHandler);
      document.removeEventListener('mousemove', buttonPinMouseMoveHandler);

      mainPin.removeEventListener('keydown', buttonPinClickHandler);
    };

    document.addEventListener('mousemove', buttonPinMouseMoveHandler);
    document.addEventListener('mouseup', buttonPinMouseUpHandler);
  };

  mainPin.addEventListener('mousedown', buttonPinClickHandler)
  mainPin.addEventListener('keydown', buttonPinClickHandler);

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
