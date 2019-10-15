'use strict';

(function () {
  window.pin = {
    renderMapPin: function (advertElement) {
      var pinElement = pinTemplate.cloneNode(true);
      var pinElementImg = pinElement.querySelector('img');

      pinElement.style.left = advertElement.location.x + 'px';
      pinElement.style.top = advertElement.location.y + 'px';
      pinElementImg.src = advertElement.author.avatar;
      pinElementImg.alt = advertElement.offer.title;
      pinElement.addEventListener('click', function () {
        window.map.renderCard(advertElement);
      });
      pinElement.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.pin.ENTER_KEYCODE) {
          window.map.renderCard(advertElement);
        }
      });

      return pinElement;
    },
    ENTER_KEYCODE: 13,
  };

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
})();
