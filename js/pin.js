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
      pinElement.classList.add('map__pin--active');
    });
    pinElement.addEventListener('keydown', function (evt) {
      if (window.utils.isEnterEvt(evt.keyCode)) {
        window.card.render(advertElement);
        pinElement.classList.add('map__pin--active');
      }
    });

    return pinElement;
  };

  var removeActivePinClass = function () {
    var activePin = document.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  window.pin = {
    render: renderMapPin,
    removeActiveClass: removeActivePinClass
  };
})();
