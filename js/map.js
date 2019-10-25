'use strict';

(function () {
  var pinSize = {
    WIDTH: 65,
    HEIGHT: 65,
    POINTY_END_HEIGHT: 16
  };

  var searchArea = {
    Y: {
      MIN: 130 - pinSize.POINTY_END_HEIGHT - pinSize.HEIGHT,
      MAX: 630 - pinSize.POINTY_END_HEIGHT - pinSize.HEIGHT
    },
    X: {
      MIN: 0 - pinSize.WIDTH / 2,
      MAX: 1200 - pinSize.WIDTH / 2,
    }
  };

  var receivedArray = [];
  var mainPin = document.querySelector('.map__pin--main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var successHandler = function (response) {
    receivedArray = response;
  };

  var errorHandler = function () {
    var errorElement = errorTemplate.cloneNode(true);
    errorElement.querySelector('p').innerHTML = 'Не получилось загрузить данные с сервера';

    document.body.insertAdjacentElement('afterbegin', errorElement);
  };

  var pinClickHandler = function () {
    if (document.querySelector('.map').classList.contains('map--faded')) {
      window.pin.renderPinsList(receivedArray);
    }

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
      window.form.setActiveAddress();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPin.style.top = Math.round(Math.max(searchArea.Y.MIN, Math.min(mainPin.offsetTop - shift.y, searchArea.Y.MAX))) + 'px';
      mainPin.style.left = Math.round(Math.max(searchArea.X.MIN, Math.min(mainPin.offsetLeft - shift.x, searchArea.X.MAX))) + 'px';
    };

    var buttonPinMouseUpHandler = function () {

      pinClickHandler();
      window.form.setActiveAddress();

      document.removeEventListener('mouseup', buttonPinMouseUpHandler);
      document.removeEventListener('mousemove', buttonPinMouseMoveHandler);
    };

    document.addEventListener('mousemove', buttonPinMouseMoveHandler);
    document.addEventListener('mouseup', buttonPinMouseUpHandler);
  };

  window.backend.load(successHandler, errorHandler);

  mainPin.addEventListener('mousedown', buttonPinClickHandler);
  mainPin.addEventListener('keydown', buttonPinKeyDownHandler);

  window.map = {
    errorHandler: errorHandler,
    calculateDefualtAddress: function () {
      return {
        x: parseInt(mainPin.style.left, 10) - pinSize.WIDTH / 2,
        y: parseInt(mainPin.style.top, 10) - pinSize.HEIGHT / 2
      };
    },
    calculateCurrentAddress: function () {
      return {
        x: parseInt(mainPin.style.left, 10) + Math.floor(pinSize.WIDTH / 2),
        y: parseInt(mainPin.style.top, 10) + pinSize.POINTY_END_HEIGHT + pinSize.HEIGHT
      };
    }
  };
})();
