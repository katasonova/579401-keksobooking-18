'use strict';

(function () {
  var ESC_KEYCODE = 27;

  var pinClickHandler = function () {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    window.form.filtersForm.classList.remove('ad-form--disabled');
    var allFieldsets = document.querySelectorAll('.ad-form__element');

    allFieldsets.forEach(function (element) {
      element.disabled = false;
    });

    window.form.setAvailability();
    console.log(window.data.generateAdvertsList());
    window.pin.renderPinsList(window.data.generateAdvertsList());
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

  window.map = {

  };
})();
