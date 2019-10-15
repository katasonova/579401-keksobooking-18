'use strict';

(function () {

  window.form = {
    checkAvailability: function () {
      var guests = document.querySelector('#capacity');
      var guestsList = guests.querySelectorAll('option');

      var selectedRoom = rooms.value;
      var selectedGuestsNumber = guests.value;

      guestsList.forEach(function (guest) {
        guest.disabled = !roomsAndGuests[selectedRoom].includes(guest.value);
      });

      if (!roomsAndGuests[selectedRoom].includes(selectedGuestsNumber)) {
        guests.value = roomsAndGuests[selectedRoom][0];
      }
    },
    setAddress: function (coords) {
      var addressInput = document.querySelector('#address');
      addressInput.value = coords.x + ', ' + coords.y;
    },
    getAddress: function () {
      return {
        x: parseInt(window.form.mainPin.style.left, 10) - pinSize.WIDTH / 2,
        y: parseInt(window.form.mainPin.style.top, 10) + pinSize.POINTY_END_HEIGHT
      };
    },
    filtersForm: document.querySelector('.map__filters'),
    mainPin: document.querySelector('.map__pin--main')
  };

  var rooms = document.querySelector('#room_number');
  var formCheckInSelector = document.querySelector('#timein');
  var formCheckOutSelector = document.querySelector('#timeout');

  var pinSize = {
    WIDTH: 65,
    HEIGHT: 65,
    POINTY_END_HEIGHT: 22
  };

  var disableFormElements = function () {
    var allFieldsets = document.querySelectorAll('.ad-form__element');

    allFieldsets.forEach(function (element) {
      element.disabled = true;
    });
  };

  var getDefaultAddress = function () {
    return {
      x: parseInt(window.form.mainPin.style.left, 10) - pinSize.WIDTH / 2,
      y: parseInt(window.form.mainPin.style.top, 10) - pinSize.HEIGHT / 2
    };
  };

  var roomsAndGuests = {
    1: ['1'],
    2: ['1', '2'],
    3: ['1', '2', '3'],
    100: ['0']
  };

  window.form.filtersForm.classList.add('ad-form--disabled');

  rooms.addEventListener('change', window.form.checkAvailability);

  var formTitleInput = document.querySelector('#title');
  formTitleInput.required = true;

  var formPriceInput = document.querySelector('#price');
  formPriceInput.required = true;

  var formPropertyTypeSelector = document.querySelector('#type');
  formPriceInput.placeholder = '1000';
  formPropertyTypeSelector.addEventListener('change', function () {
    switch (formPropertyTypeSelector.value) {
      case 'bungalo':
        formPriceInput.min = 0;
        formPriceInput.placeholder = '0';
        break;
      case 'flat':
        formPriceInput.min = 1000;
        formPriceInput.placeholder = '1000';
        break;
      case 'house':
        formPriceInput.min = 5000;
        formPriceInput.placeholder = '5000';
        break;
      case 'palace':
        formPriceInput.min = 10000;
        formPriceInput.placeholder = '10000';
        break;
    }
  });

  var formAddressInput = document.querySelector('#address');
  formAddressInput.readOnly = true;


  var checkInSelectChangeHandler = function () {
    formCheckOutSelector.value = formCheckInSelector.value;
  };

  var checkOutSelectChangeHandler = function () {
    formCheckInSelector.value = formCheckOutSelector.value;
  };

  formCheckInSelector.addEventListener('change', checkInSelectChangeHandler);
  formCheckOutSelector.addEventListener('change', checkOutSelectChangeHandler);

  disableFormElements();
  window.form.setAddress(getDefaultAddress());
})();
