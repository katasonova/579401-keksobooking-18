'use strict';

(function () {
  var housing = document.querySelector('#housing-type');
  var selectedHousing = housing.value;

  var updatePinsList = function (array) {
    var properHousings = array.filter(function (element) {
      return element.offer.type === selectedHousing;
    });

    if (selectedHousing === 'any') {
      properHousings = array;
    }

    return properHousings;
  };

  housing.addEventListener('change', function () {
    selectedHousing = housing.value;
    window.map.renderPinsList();
  });

  window.filters = {
    updatePinsList: updatePinsList
  };
})();
