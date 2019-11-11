'use strict';

(function () {
  var filtersForm = document.querySelector('.map__filters');
  var housing = filtersForm.querySelector('#housing-type');
  var price = filtersForm.querySelector('#housing-price');
  var rooms = filtersForm.querySelector('#housing-rooms');
  var guests = filtersForm.querySelector('#housing-guests');
  var features = filtersForm.querySelector('#housing-features');
  var selectedHousing = housing.value;
  var selectedPrice = price.value;
  var selectedRooms = rooms.value;
  var selectedGuests = guests.value;
  var selectedPriceRange;

  var filterHousing = function (array) {
    if (selectedHousing === 'any') {
      return array;
    }

    var properHousings = array.filter(function (element) {
      return element.offer.type === selectedHousing;
    });

    return properHousings;
  };

  var filterPrice = function (array) {
    if (selectedPrice === 'any') {
      return array;
    }

    var properPrice = array.filter(function (element) {
      if (element.offer.price >= 10000 && element.offer.price <= 50000) {
        selectedPriceRange = 'low';
      } else if (element.offer.price < 10000) {
        selectedPriceRange = 'high';
      } else if (element.offer.price > 50000) {
        selectedPriceRange = 'middle';
      }

      return selectedPriceRange === selectedPrice;
    });

    return properPrice;
  };

  var filterRooms = function (array) {
    if (selectedRooms === 'any') {
      return array;
    }

    var properRooms = array.filter(function (element) {
      return element.offer.rooms === parseInt(selectedRooms, 10);
    });

    return properRooms;
  };

  var filterGuests = function (array) {
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

  var updatePinsList = function (array) {
    return filter(array);
  };

  filtersForm.addEventListener('change', window.debounce(function () {
    selectedHousing = housing.value;
    selectedPrice = price.value;
    selectedRooms = rooms.value;
    selectedGuests = guests.value;
    window.map.renderPinsList();
  }));

  window.filters = {
    updatePinsList: updatePinsList
  };
})();