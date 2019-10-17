'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinsList = document.querySelector('.map__pins');

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
      var ENTER_KEYCODE = 13;
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
    }
  };
})();