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
    var ENTER_KEYCODE = 13;
    pinClickHandler();
    window.form.setActiveAddress();

    if (evt.keyCode === ENTER_KEYCODE) {
      pinClickHandler();
    }

    mainPin.removeEventListener('mousedown', buttonPinClickHandler);
    mainPin.removeEventListener('keydown', buttonPinClickHandler);
  };

  mainPin.addEventListener('mousedown', buttonPinClickHandler);
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
