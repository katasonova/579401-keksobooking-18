'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var pinSize = {
    WIDTH: 65,
    HEIGHT: 65,
    POINTY_END_HEIGHT: 22
  };

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinsList = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');

  var renderMapPin = function (advertElement) {
    var pinElement = pinTemplate.cloneNode(true);
    var pinElementImg = pinElement.querySelector('img');

    pinElement.style.left = advertElement.location.x + 'px';
    pinElement.style.top = advertElement.location.y + 'px';
    pinElementImg.src = advertElement.author.avatar;
    pinElementImg.alt = advertElement.offer.title;
    pinElement.addEventListener('click', function () {
      window.card.renderCard(advertElement);
    });
    pinElement.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        window.card.renderCard(advertElement);
      }
    });

    return pinElement;
  };

  window.pin = {
    renderPinsList: function (pinsGeneratedData) {
      var fragment = document.createDocumentFragment();

      pinsGeneratedData.forEach(function (pin) {
        fragment.appendChild(renderMapPin(pin));
      });

      pinsList.appendChild(fragment);
    },
    getAddressX: function () {
      return parseInt(mainPin.style.left, 10) - pinSize.WIDTH / 2;
    },
    getAddressY: function () {
      return parseInt(mainPin.style.top, 10) + pinSize.POINTY_END_HEIGHT;
    },
    getDefaultAddressY: function () {
      return parseInt(mainPin.style.top, 10) - pinSize.HEIGHT / 2;
    }
  };
})();
