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
    var properHousings = array.filter(function (element) {
      return element.offer.type === selectedHousing;
    });

    if (selectedHousing === 'any') {
      properHousings = array;
    }

    return properHousings;
  };

  var filterPrice = function (array) {
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

    if (selectedPrice === 'any') {
      properPrice = array;
    }

    return properPrice;
  };

  var filterRooms = function (array) {
    var properRooms = array.filter(function (element) {
      return element.offer.rooms === parseInt(selectedRooms, 10);
    });

    if (selectedRooms === 'any') {
      properRooms = array;
    }

    return properRooms;
  };

  var filterGuests = function (array) {
    var properGuests = array.filter(function (element) {
      return element.offer.guests === parseInt(selectedGuests, 10);
    });

    if (selectedGuests === 'any') {
      properGuests = array;
    }

    return properGuests;
  };

  var filterFeatures = function (array) {
    var checkedFeatures = features.querySelectorAll('input:checked');
    // var properFeatures = array.filter(function (element) {
    //   return element.offer.features.contains.every(checkedFeatures)
    // })
    var properFeatures = array.forEach(function (element) {
      return element.offer.features.forEach(function (feature) {
        return checkedFeatures.defaultValue === feature;
      })
    })

    if (checkedFeatures.length === 0) {
      properFeatures = array;
    }
    // var properFeatures = array.filter(function (element) {
    //   element.offer.features.some(function(feature) {
    //   return checkedFeatures.contains(feature);
    // })});
    // var properFeatures = array.filter(function (element) {
    //   return element.offer.guests === parseInt(selectedGuests, 10);
    // });

    // if (selectedGuests === 'any') {
    //   properFeatures = array;
    // }

    return properFeatures;
  }

  var filter = function(array) {
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

  filtersForm.addEventListener('change', function () {
    selectedHousing = housing.value;
    selectedPrice = price.value;
    selectedRooms = rooms.value;
    selectedGuests = guests.value;
    window.map.renderPinsList();
  });

  window.filters = {
    updatePinsList: updatePinsList
  };
})();
