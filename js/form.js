'use strict';

(function () {
  var roomsAndGuests = {
    1: ['1'],
    2: ['1', '2'],
    3: ['1', '2', '3'],
    100: ['0']
  };

  var Price = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  var rooms = document.querySelector('#room_number');
  var formCheckInSelector = document.querySelector('#timein');
  var formCheckOutSelector = document.querySelector('#timeout');
  var filtersForm = document.querySelector('.map__filters');
  var formAddressInput = document.querySelector('#address');
  var formTitleInput = document.querySelector('#title');
  var formPriceInput = document.querySelector('#price');
  var formPropertyTypeSelector = document.querySelector('#type');
  var form = document.querySelector('.ad-form');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var defaultAddress;

  form.querySelector('#avatar').disabled = true;
  formAddressInput.readOnly = true;
  formTitleInput.required = true;
  formPriceInput.required = true;
  formPriceInput.placeholder = '1000';

  var getDefaultAddress = function () {
    defaultAddress = window.map.calculateDefualtAddress();
    return defaultAddress;
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
        formPriceInput.min = Price.BUNGALO;
        formPriceInput.placeholder = Price.BUNGALO + '';
        break;
      case 'flat':
        formPriceInput.min = Price.FLAT;
        formPriceInput.placeholder = Price.FLAT + '';
        break;
      case 'house':
        formPriceInput.min = Price.HOUSE;
        formPriceInput.placeholder = Price.HOUSE + '';
        break;
      case 'palace':
        formPriceInput.min = Price.PALACE;
        formPriceInput.placeholder = Price.PALACE + '';
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

  var revertPageState = function () {
    form.classList.add('ad-form--disabled');
    form.querySelector('#avatar').disabled = true;
    form.reset();
    disableFormElements();
    window.card.remove();
    window.map.disable();
    window.map.removePins();
    window.filters.disable();
    window.photo.remove();
    setAddress(defaultAddress);
    window.map.movePinToDefaultPosition(defaultAddress.x, defaultAddress.y);
  };

  var successHandler = function () {
    var successElement = successTemplate.cloneNode(true);

    successElement.addEventListener('click', function () {
      successElement.remove();
    });

    if (successElement) {
      document.addEventListener('keydown', function (evt) {
        if (window.utils.isEscEvt(evt.keyCode)) {
          successElement.remove();
        }
      });
    }
    document.body.insertAdjacentElement('afterbegin', successElement);

    revertPageState();
  };

  var errorHandler = function () {
    var errorElement = errorTemplate.cloneNode(true);

    errorElement.addEventListener('click', function () {
      errorElement.remove();
    });

    errorElement.querySelector('.error__button').addEventListener('click', function () {
      errorElement.remove();
    });

    if (errorElement) {
      document.addEventListener('keydown', function (evt) {
        if (window.utils.isEscEvt(evt.keyCode)) {
          errorElement.remove();
        }
      });
    }

    document.body.insertAdjacentElement('afterbegin', errorElement);
  };

  var invalidInputHandler = function (evt) {
    if (evt.target.validity) {
      evt.target.style.border = '2px dotted red';
    }
  };

  var revertInvalidInputState = function (input) {
    if (input.style.border === '2px dotted red') {
      input.style.border = 'none';
    }
  };

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), successHandler, errorHandler);
    evt.preventDefault();
    revertInvalidInputState(formTitleInput);
    revertInvalidInputState(formPriceInput);
  });

  form.querySelector('.ad-form__reset').addEventListener('click', function () {
    revertPageState();
  });

  formTitleInput.addEventListener('invalid', invalidInputHandler);
  formPriceInput.addEventListener('invalid', invalidInputHandler);

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
