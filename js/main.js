'use strict';

var advertData = {
  TITLE: ['Лондон', 'Париж', 'Москва', 'Токио', 'Нью-Йорк', 'Рим', 'Барселона', 'Чикаго'],
  TYPE: {'palace': 'Дворец', 'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало'},
  CHECK_TIME: ['12:00', '13:00', '14:00'],
  FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  DESCRITION: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit', 'Excepteur sint occaecat cupidatat non proident, sunt in culpa', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore'],
  PHOTO: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
  MAX_PROPERTY_PRICE: 5000,
  MAX_PROPERTY_ROOMS: 15,
  MAX_PROPERTY_GUESTS: 10
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
var map = document.querySelector('.map');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var getRandomIndexOutOfArray = function (array) {
  return Math.round(Math.random() * (array.length - 1));
};

var getRandomNumberWithinRange = function (min, max) {
  min = (min === null) ? 1 : Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomObjProperty = function (obj) {
  return Object.keys(obj)[Math.floor(Math.random()*Object.keys(obj).length)];
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
      price: getRandomNumberWithinRange(null, advertData.MAX_PROPERTY_PRICE),
      type: getRandomObjProperty(advertData.TYPE),
      rooms: getRandomNumberWithinRange(null, advertData.MAX_PROPERTY_ROOMS),
      guests: getRandomNumberWithinRange(null, advertData.MAX_PROPERTY_GUESTS),
      checkin: advertData.CHECK_TIME[getRandomIndexOutOfArray(advertData.CHECK_TIME)],
      checkout: advertData.CHECK_TIME[getRandomIndexOutOfArray(advertData.CHECK_TIME)],
      features: getRandomArray(advertData.FEATURES),
      description: advertData.DESCRITION[getRandomIndexOutOfArray(advertData.DESCRITION)],
      photos: getRandomArray(advertData.PHOTO)
    },
    location: {
      x: addressX,
      y: addressY
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

var clearFeaturesList = function (element) {
  var featuresList = element.querySelector('.popup__features');
  var featureListItems = featuresList.children;

  for (var i = featureListItems.length - 1; i >= 0; i--) {
    var elementToRemove = featureListItems[i];

    elementToRemove.parentElement.removeChild(elementToRemove);
  }
};

var generateFeaturesList = function (element, featuresArray) {
  var ul = element.querySelector('.popup__features');
  var content;

  for (var i = 0; i < featuresArray; i++) {
    content += '<li class="popup__feature popup__feature--' + featuresArray[i] + '"></li>';
  }

  ul.innerHTML = content;
};

var generateCard = function (card) {
  var cardElement = cardTemplate.cloneNode(true);
  clearFeaturesList(cardElement);

  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = advertData.TYPE[card.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', ' + 'выезд до ' + card.offer.checkout;
  //generateFeaturesList(card.offer.features);
  generateFeaturesList(cardElement, card.offer.features);
  //cardElement.querySelector('.popup__features').textContent = card.offer.features;
  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  //cardElement.querySelector('.popup__photos').querySelector('img').src =
  cardElement.querySelector('.popup__avatar').src = card.author.avatar;

  return cardElement;
};

var renderCard = function () {
  var dataArray = generateAdvertsList();
  map.insertBefore(generateCard(dataArray[0]), document.querySelector('.map__filters-container'));
};

renderPinsList(generateAdvertsList());
renderCard();

document.querySelector('.map').classList.remove('map--faded');

