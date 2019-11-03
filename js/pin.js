'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinsList = document.querySelector('.map__pins');
  var LENGTH_OF_RENDERED_PINS = 5;

  var renderMapPin = function (advertElement) {
    var pinElement = pinTemplate.cloneNode(true);
    var pinElementImg = pinElement.querySelector('img');

    pinElement.style.left = advertElement.location.x + 'px';
    pinElement.style.top = advertElement.location.y + 'px';
    pinElementImg.src = advertElement.author.avatar;
    pinElementImg.alt = advertElement.offer.title;
    pinElement.addEventListener('click', function () {
      window.card.render(advertElement);
    });
    pinElement.addEventListener('keydown', function (evt) {
      var ENTER_KEYCODE = 13;
      if (evt.keyCode === ENTER_KEYCODE) {
        window.card.render(advertElement);
      }
    });

    return pinElement;
  };

  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin');
    pins.forEach(function (pin) {
      if (!(pin.className.includes('map__pin--main'))) {
        pin.remove();
      }
    });
  };

  window.pin = {
    renderPinsList: function (pinsGeneratedData) {
      var fragment = document.createDocumentFragment();
      removePins();
      var renderedNumber = pinsGeneratedData.length > LENGTH_OF_RENDERED_PINS ? LENGTH_OF_RENDERED_PINS : pinsGeneratedData.length;

      for (var i = 0; i < renderedNumber; i++) {
        fragment.appendChild(renderMapPin(pinsGeneratedData[i]));
      }

      pinsList.appendChild(fragment);
    },
    remove: removePins
  };
})();
