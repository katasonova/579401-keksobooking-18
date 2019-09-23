'use strict';

var advertData = {
  STRING: ['Лондон', 'Париж', 'Москва', 'Токио', 'Нью-Йорк', 'Рим', 'Барселона', 'Чикаго'],
  TYPE: ['palace', 'flat', 'house', 'bungalo'],
  CHECK_TIME: ['12:00', '13:00', '14:00'],
  FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  PHOTO: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
  MAX_PROPERTY_PRICE: 5000,
  MAX_PROPERTY_ROOMS: 15,
};

var LENGTH_OF_GENERATED_ARRAY = 8;
var PIN_WIDTH = 40;
var Y_LOCATION = {
  MIN: 130,
  MAX: 630
};

var mapsWidth = document.querySelector('.map').offsetWidth;
var pinsList = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

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
  return {
    author: {
      avatar: 'img/avatars/user0' + (index + 1) + '.png'
    },
    offer: {
      title: advertData.STRING[getRandomIndexOutOfArray(advertData.STRING)],
      address: location.x + ', ' + location.y,
      price: getRandomNumberWithinRange(null, advertData.MAX_PROPERTY_PRICE),
      type: advertData.TYPE[getRandomIndexOutOfArray(advertData.TYPE)],
      rooms: getRandomNumberWithinRange(null, advertData.MAX_PROPERTY_ROOMS),
      checkin: advertData.CHECK_TIME[getRandomIndexOutOfArray(advertData.CHECK_TIME)],
      checkout: advertData.CHECK_TIME[getRandomIndexOutOfArray(advertData.CHECK_TIME)],
      features: getRandomArray(advertData.FEATURES),
      description: advertData.STRING[getRandomIndexOutOfArray(advertData.STRING)],
      photos: getRandomArray(advertData.PHOTO)
    },
    location: {
      x: getRandomNumberWithinRange(PIN_WIDTH / 2, mapsWidth - PIN_WIDTH).toString(),
      y: getRandomNumberWithinRange(Y_LOCATION.MIN, Y_LOCATION.MAX).toString()
    }
  };
};

var generateAdvertsList = function () {
  var generatedAdverts = [];

  for (var i = 0; i < LENGTH_OF_GENERATED_ARRAY; i++) {
    generatedAdverts.push(generateAdvert(i));
  }

  return generatedAdverts;
};

var renderMapPin = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);
  var pinElementImg = pinElement.querySelector('img');

  pinElement.style.left = pin.location.x + 'px';
  pinElement.style.top = pin.location.y + 'px';
  pinElementImg.src = pin.author.avatar;
  pinElementImg.alt = pin.offer.title;

  return pinElement;
};

var renderPinsList = function (pinsGeneratedData) {
  var fragment = document.createDocumentFragment();

  pinsGeneratedData.forEach(function (pin) {
    fragment.appendChild(renderMapPin(pin));
  });

  pinsList.appendChild(fragment);
};

renderPinsList(generateAdvertsList());

document.querySelector('.map').classList.remove('map--faded');
