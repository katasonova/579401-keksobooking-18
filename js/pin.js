'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

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

  window.pin = {
    renderMapPin: renderMapPin
  };
})();
