'use strict';

(function () {
  var roomsAndGuests = {
    1: ['1'],
    2: ['1', '2'],
    3: ['1', '2', '3'],
    100: ['0']
  };

  var rooms = document.querySelector('#room_number');
  var formCheckInSelector = document.querySelector('#timein');
  var formCheckOutSelector = document.querySelector('#timeout');
  var filtersForm = document.querySelector('.map__filters');
  var formAddressInput = document.querySelector('#address');
  var formTitleInput = document.querySelector('#title');
  var formPriceInput = document.querySelector('#price');
  var formPropertyTypeSelector = document.querySelector('#type');

  formAddressInput.readOnly = true;
  formTitleInput.required = true;
  formPriceInput.required = true;
  formPriceInput.placeholder = '1000';

  var getDefaultAddress = function () {
    return window.map.calculateDefualtAddress();
  };

  var setAddress = function (coords) {
    var addressInput = document.querySelector('#address');
    addressInput.value = coords.x + ', ' + coords.y;
  };

  var getAddress = function () {
    return window.map.calculateCurrentAddress();
  };

  var disableFormElements = function () {
    var allFieldsets = document.querySelectorAll('.ad-form__element');

    allFieldsets.forEach(function (element) {
      element.disabled = true;
    });
  };

  var setAvailability = function () {
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
  };

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

  var checkInSelectChangeHandler = function () {
    formCheckOutSelector.value = formCheckInSelector.value;
  };

  var checkOutSelectChangeHandler = function () {
    formCheckInSelector.value = formCheckOutSelector.value;
  };

  filtersForm.classList.add('ad-form--disabled');
  rooms.addEventListener('change', setAvailability);
  formCheckInSelector.addEventListener('change', checkInSelectChangeHandler);
  formCheckOutSelector.addEventListener('change', checkOutSelectChangeHandler);
  disableFormElements();
  setAddress(getDefaultAddress());

  window.form = {
    setAvailability: setAvailability,
    setActiveAddress: function () {
      setAddress(getAddress());
    },
    enable: function () {
      filtersForm.classList.remove('ad-form--disabled');
    }
  };
})();
