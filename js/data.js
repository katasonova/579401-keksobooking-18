'use strict';

(function () {
  var advertData = {
    TITLE: ['Лондон', 'Париж', 'Москва', 'Токио', 'Нью-Йорк', 'Рим', 'Барселона', 'Чикаго'],
    TYPE: ['palace', 'flat', 'house', 'bungalo'],
    CHECK_TIME: ['12:00', '13:00', '14:00'],
    FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    DESCRIPTION: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit', 'Excepteur sint occaecat cupidatat non proident, sunt in culpa', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore'],
    PHOTO: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
  };

  var Y_LOCATION = {
    MIN: 130,
    MAX: 630
  };

  var propertyParams = {
    MAX_PRICE: 5000,
    MAX_ROOMS: 15,
    MAX_GUESTS: 10
  };

  var LENGTH_OF_GENERATED_ARRAY = 8;
  var PIN_WIDTH = 40;

  var mapsWidth = document.querySelector('.map').offsetWidth;

  var getRandomIndexOutOfArray = function (array) {
    return Math.round(Math.random() * (array.length - 1));
  };

  var getRandomNumberWithinRange = function (min, max) {
    min = (min === null) ? 1 : Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var shuffleArray = function (array) {
    var elementsInArray = array.length;
    var temp;
    var index;

    while (elementsInArray > 0) {
      index = Math.floor(Math.random() * elementsInArray);
      elementsInArray--;
      temp = array[elementsInArray];
      array[elementsInArray] = array[index];
      array[index] = temp;
    }

    return array;
  };

  var getRandomArray = function (array) {
    var newArray = [];

    for (var i = 0; i < getRandomNumberWithinRange(null, array.length); i++) {
      newArray.push(array[i]);
    }

    return shuffleArray(newArray);
  };

  var generateAdvert = function (index) {

    var addressX = getRandomNumberWithinRange(PIN_WIDTH / 2, mapsWidth - PIN_WIDTH).toString();
    var addressY = getRandomNumberWithinRange(Y_LOCATION.MIN, Y_LOCATION.MAX).toString();

    return {
      author: {
        avatar: 'img/avatars/user0' + (index + 1) + '.png'
      },
      offer: {
        title: advertData.TITLE[getRandomIndexOutOfArray(advertData.TITLE)],
        address: addressX + ', ' + addressY,
        price: getRandomNumberWithinRange(null, propertyParams.MAX_PRICE),
        type: advertData.TYPE[getRandomIndexOutOfArray(advertData.TYPE)],
        rooms: getRandomNumberWithinRange(null, propertyParams.MAX_ROOMS),
        guests: getRandomNumberWithinRange(null, propertyParams.MAX_GUESTS),
        checkin: advertData.CHECK_TIME[getRandomIndexOutOfArray(advertData.CHECK_TIME)],
        checkout: advertData.CHECK_TIME[getRandomIndexOutOfArray(advertData.CHECK_TIME)],
        features: getRandomArray(advertData.FEATURES),
        description: advertData.DESCRIPTION[getRandomIndexOutOfArray(advertData.DESCRIPTION)],
        photos: getRandomArray(advertData.PHOTO)
      },
      location: {
        x: addressX,
        y: addressY
      }
    };
  };

  window.data = {
    generateAdvertsList: function () {
      var generatedAdverts = [];

      for (var i = 0; i < LENGTH_OF_GENERATED_ARRAY; i++) {
        generatedAdverts.push(generateAdvert(i));
      }

      return generatedAdverts;
    }
  };
})();
