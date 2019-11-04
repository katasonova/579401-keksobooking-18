'use strict';

(function () {
  var updatePinsList = function (array, selectedHousing) {
    var properHousings = array.filter(function (element) {
      return element.offer.type === selectedHousing;
    });

    if (selectedHousing === 'any') {
      properHousings = array;
    }

    window.map.renderPinsList(properHousings);
  };

  window.filter = {
    updatePinsList: updatePinsList
  };
})();
