'use strict';

(function () {
  window.map = {
    renderCard: function (advertElement) {
      window.map.removeCard();

      currentCard = window.card.generateCard(advertElement);
      map.insertBefore(currentCard, document.querySelector('.map__filters-container'));
    },
    removeCard: function () {
      if (currentCard) {
        currentCard.remove();
      }
    },
    closeCardButtonClickHandler: function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        window.map.removeCard();
      }

      document.removeEventListener('keydown', window.map.closeCardButtonClickHandler);
    }
  };

  var ESC_KEYCODE = 27;

  var map = document.querySelector('.map');
  var pinsList = document.querySelector('.map__pins');
  var currentCard;

  var renderPinsList = function (pinsGeneratedData) {
    var fragment = document.createDocumentFragment();

    pinsGeneratedData.forEach(function (pin) {
      fragment.appendChild(window.pin.renderMapPin(pin));
    });

    pinsList.appendChild(fragment);
  };

  var pinClickHandler = function () {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    window.form.filtersForm.classList.remove('ad-form--disabled');
    var allFieldsets = document.querySelectorAll('.ad-form__element');

    allFieldsets.forEach(function (element) {
      element.disabled = false;
    });

    window.form.checkAvailability();
    renderPinsList(window.data.generateAdvertsList());
  };

  var buttonPinClickHandler = function (evt) {
    pinClickHandler();
    window.form.setAddress(window.form.getAddress());

    if (evt.keyCode === window.pin.ENTER_KEYCODE) {
      pinClickHandler();
    }

    window.form.mainPin.removeEventListener('mousedown', buttonPinClickHandler);
    window.form.mainPin.removeEventListener('keydown', buttonPinClickHandler);
  };

  window.form.mainPin.addEventListener('mousedown', buttonPinClickHandler);
  window.form.mainPin.addEventListener('keydown', buttonPinClickHandler);
})();
