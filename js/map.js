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

  var MAX_AMOUNT_RENDERED_PINS = 5;

  var receivedArray = [];
  var pinsList = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      pin.remove();
    });
  };

  var renderPinsList = function () {
    var pinsGeneratedData = window.filters.updatePinsList(receivedArray);
    var fragment = document.createDocumentFragment();
    removePins();
    var renderedNumber = pinsGeneratedData.length > MAX_AMOUNT_RENDERED_PINS ? MAX_AMOUNT_RENDERED_PINS : pinsGeneratedData.length;

    for (var i = 0; i < renderedNumber; i++) {
      fragment.appendChild(window.pin.render(pinsGeneratedData[i]));
    }

    pinsList.appendChild(fragment);
  };

  var disableMap = function () {
    window.filters.disable();
    document.querySelector('.map').classList.add('map--faded');
  };

  var movePinToDefaultPosition = function (xPosition, yPosition) {
    mainPin.style.top = yPosition + pinSize.HEIGHT / 2 + 'px';
    mainPin.style.left = xPosition + pinSize.WIDTH / 2 + 'px';
  };

  var successHandler = function (response) {
    receivedArray = response;

    mainPin.addEventListener('mousedown', buttonPinClickHandler);
    mainPin.addEventListener('keydown', buttonPinKeyDownHandler);
  };

  var errorHandler = function () {
    var errorElement = errorTemplate.cloneNode(true);
    errorElement.querySelector('p').innerHTML = 'Не получилось загрузить данные с сервера';

    document.body.insertAdjacentElement('afterbegin', errorElement);
  };

  var pinClickHandler = function () {
    if (document.querySelector('.map').classList.contains('map--faded')) {
      renderPinsList();
    }

    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    document.querySelector('#avatar').disabled = false;
    var allFieldsets = document.querySelectorAll('.ad-form__element');

    window.form.enable();
    window.filters.enable();

    allFieldsets.forEach(function (element) {
      element.disabled = false;
    });

    window.form.setAvailability();
    window.filters.init();
  };

  var buttonPinKeyDownHandler = function (evt) {
    if (window.utils.isEnterEvt(evt.keyCode)) {
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

  window.map = {
    calculateDefualtAddress: function () {
      return {
        x: Math.round(parseInt(mainPin.style.left, 10) - pinSize.WIDTH / 2),
        y: Math.round(parseInt(mainPin.style.top, 10) - pinSize.HEIGHT / 2)
      };
    },
    calculateCurrentAddress: function () {
      return {
        x: parseInt(mainPin.style.left, 10) + Math.floor(pinSize.WIDTH / 2),
        y: parseInt(mainPin.style.top, 10) + pinSize.POINTY_END_HEIGHT + pinSize.HEIGHT
      };
    },
    movePinToDefaultPosition: movePinToDefaultPosition,
    disable: disableMap,
    renderPinsList: renderPinsList,
    removePins: removePins,
    update: pinClickHandler
  };
})();
