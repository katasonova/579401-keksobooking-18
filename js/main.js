'use strict';

var ADVERT_DATA = {
  string: ['Лондон', 'Париж', 'Москва', 'Токио', 'Нью-Йорк', 'Рим', 'Барселона', 'Чикаго'],
  type: ['palace', 'flat', 'house', 'bungalo'],
  checkTime: ['12:00', '13:00', '14:00'],
  features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  photo: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
  maxPropertyPrice: 5000,
  maxPropertyRooms: 15,
  AMOUNT_OF_DISTINCT_AVATARS: 8,
  Y_LOCATION: {
    MIN: 130,
    MAX: 630
  }
};

var LENGTH_OF_GENERATED_ARRAY = 8;
var PIN_WIDTH = 40;

var mapsWidth = document.querySelector('.map').offsetWidth;
var pinsList = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var getRandomArrayElement = function (array) {
  return Math.round(Math.random() * (array.length - 1));
};

var getRandomNumber = function (maxNumber) {
  return Math.ceil(Math.random() * maxNumber);
};

// no idea how to make the number without random()
var getAvatarNumber = function () {
  return '0' + Math.ceil(Math.random() * ADVERT_DATA.AMOUNT_OF_DISTINCT_AVATARS);
};

var getRandomArray = function (array) {
  var newArray = [];

  for (var i = 0; i < getRandomNumber(array.length); i++) {
    newArray.push(array[i]);
  }

  return newArray;
};

var getRandomNumberWithinRange = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var generateAnAuthor = function () {
  return {
    avatar: 'img/avatars/user' + getAvatarNumber() + '.png'
  };
};

var generateLocation = function (advertData) {
  return {
    x: getRandomNumberWithinRange(PIN_WIDTH / 2, mapsWidth - PIN_WIDTH).toString(),
    y: getRandomNumberWithinRange(advertData.Y_LOCATION.MIN, advertData.Y_LOCATION.MAX).toString()
  };
};

var generateAnOffer = function (advertData, locationObj) {
  return {
    title: advertData.string[getRandomArrayElement(advertData.string)],
    address: locationObj.x + ', ' + locationObj.y,
    price: getRandomNumber(advertData.maxPropertyPrice),
    type: advertData.type[getRandomArrayElement(advertData.type)],
    rooms: getRandomNumber(advertData.maxPropertyRooms),
    checkin: advertData.checkTime[getRandomArrayElement(advertData.checkTime)],
    checkout: advertData.checkTime[getRandomArrayElement(advertData.checkTime)],
    features: getRandomArray(advertData.features),
    description: advertData.string[getRandomArrayElement(advertData.string)],
    photos: getRandomArray(advertData.photo)
  };
};

var generateOneAdvert = function (advertData, locationObj) {
  return {
    author: generateAnAuthor(),
    offer: generateAnOffer(advertData, locationObj),
    location: generateLocation(advertData)
  };
};

var generateAdvertsList = function () {
  var generatedAdverts = [];

  while (generatedAdverts.length < LENGTH_OF_GENERATED_ARRAY) {
    generatedAdverts.push(generateOneAdvert(ADVERT_DATA, generateLocation(ADVERT_DATA)));
  }

  return generatedAdverts;
};

var renderMapPin = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style.left = pin.location.x + 'px';
  pinElement.style.top = pin.location.y + 'px';
  pinElement.src = pin.author.avatar;
  pinElement.alt = pin.offer.title;

  return pinElement;
};

var reanderPinsList = function (pinsGeneratedData) {
  var fragment = document.createDocumentFragment();

  pinsGeneratedData.forEach(function (pin) {
    fragment.appendChild(renderMapPin(pin));
  });

  pinsList.appendChild(fragment);
};

reanderPinsList(generateAdvertsList());

document.querySelector('.map').classList.remove('map--faded');
