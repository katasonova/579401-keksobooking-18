'use strict';

(function () {
  var filters = document.querySelector('.map__filters');
  var filtersForm = document.querySelector('.map__filters');
  var housing = filtersForm.querySelector('#housing-type');
  var price = filtersForm.querySelector('#housing-price');
  var rooms = filtersForm.querySelector('#housing-rooms');
  var guests = filtersForm.querySelector('#housing-guests');
  var features = filtersForm.querySelector('#housing-features');

  var disableFilters = function () {
    filters.classList.add('ad-form--disabled');
    filters.querySelector('.map__features').disabled = true;
    var allSelectors = document.querySelectorAll('.map__filter');
    allSelectors.forEach(function (element) {
      element.disabled = true;
    });
    filtersForm.reset();
  };

  var filterHousing = function (array) {
    var selectedHousing = housing.value;

    if (selectedHousing === 'any') {
      return array;
    }

    var properHousings = array.filter(function (element) {
      return element.offer.type === selectedHousing;
    });

    return properHousings;
  };

  var filterPrice = function (array) {
    var selectedPrice = price.value;
    var selectedPriceRange;

    if (selectedPrice === 'any') {
      return array;
    }

    var properPrice = array.filter(function (element) {
      if (element.offer.price >= 10000 && element.offer.price <= 50000) {
        selectedPriceRange = 'middle';
      } else if (element.offer.price < 10000) {
        selectedPriceRange = 'low';
      } else if (element.offer.price > 50000) {
        selectedPriceRange = 'high';
      }

      return selectedPriceRange === selectedPrice;
    });

    return properPrice;
  };

  var filterRooms = function (array) {
    var selectedRooms = rooms.value;

    if (selectedRooms === 'any') {
      return array;
    }

    var properRooms = array.filter(function (element) {
      return element.offer.rooms === parseInt(selectedRooms, 10);
    });

    return properRooms;
  };

  var filterGuests = function (array) {
    var selectedGuests = guests.value;

    if (selectedGuests === 'any') {
      return array;
    }

    var properGuests = array.filter(function (element) {
      return element.offer.guests <= parseInt(selectedGuests, 10);
    });

    return properGuests;
  };

  var filterFeatures = function (array) {
    var checkedFeatures = Array.from(features.querySelectorAll('input:checked'));

    var properFeatures = array.filter(function (element) {
      return checkedFeatures.every(function (feature) {
        return element.offer.features.includes(feature.value);
      });
    });

    return properFeatures;
  };

  var filter = function (array) {
    var filteredData = filterHousing(array);
    filteredData = filterPrice(filteredData);
    filteredData = filterRooms(filteredData);
    filteredData = filterGuests(filteredData);
    filteredData = filterFeatures(filteredData);

    return filteredData;
  };

  var filterAdvertsHandler = function () {
    window.card.remove();
    window.map.renderPinsList();

    filtersForm.removeEventListener('change', filterAdvertsHandler);
  };

  var init = function () {
    filtersForm.addEventListener('change', window.debounce(function () {
      filterAdvertsHandler();
    }));
  };

  disableFilters();

  window.filters = {
    updatePinsList: filter,
    disable: disableFilters,
    enable: function () {
      filters.classList.remove('ad-form--disabled');
      filters.querySelector('.map__features').disabled = false;
      var allSelectors = document.querySelectorAll('.map__filter');
      allSelectors.forEach(function (element) {
        element.disabled = false;
      });
    },
    init: init
  };
})();
