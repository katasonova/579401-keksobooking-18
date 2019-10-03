'use strict';

var advertData = {
  TITLE: ['Лондон', 'Париж', 'Москва', 'Токио', 'Нью-Йорк', 'Рим', 'Барселона', 'Чикаго'],
  TYPE: ['palace', 'flat', 'house', 'bungalo'],
  CHECK_TIME: ['12:00', '13:00', '14:00'],
  FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  DESCRIPTION: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit', 'Excepteur sint occaecat cupidatat non proident, sunt in culpa', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore'],
  PHOTO: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
};

var propertyParams = {
  MAX_PRICE: 5000,
  MAX_ROOMS: 15,
  MAX_GUESTS: 10
};

var LENGTH_OF_GENERATED_ARRAY = 8;
var PIN_WIDTH = 40;
var Y_LOCATION = {
  MIN: 130,
  MAX: 630
};

var ENTER_KEYCODE = 13;

var pinSize = {
  WIDTH: 65,
  HEIGHT: 65,
  POINTY_END_HEIGHT: 22
};

var typePropertyParams = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};

var imgParams = {
  WIDTH: 45,
  HEIGHT: 45,
  ALT: 'Фотография жилья'
};

var mapsWidth = document.querySelector('.map').offsetWidth;
var pinsList = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var map = document.querySelector('.map');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var filtersForm = document.querySelector('.map__filters')
var mainPin = document.querySelector('.map__pin--main');


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

var clearElementsList = function (element, elementSelector) {
  var listToClean = element.querySelector(elementSelector);
  listToClean.innerHTML = '';
};

var generateFeatureElement = function (el) {
  var li = document.createElement('li');
  li.classList.add('popup__feature');
  li.classList.add('popup__feature--' + el);

  return li;
};

var generateFeaturesList = function (element, featuresArray) {
  var ul = element.querySelector('.popup__features');

  for (var i = 0; i < featuresArray.length; i++) {
    ul.appendChild(generateFeatureElement(featuresArray[i]));
  }

  return ul;
};

var generatePhotoElement = function (el) {
  var img = document.createElement('img');
  img.classList.add('popup__photo');
  img.src = el;
  img.width = imgParams.WIDTH;
  img.height = imgParams.HEIGHT;
  img.alt = imgParams.ALT;

  return img;
};

var generatePhotosList = function (element, photosArray) {
  var imgList = element.querySelector('.popup__photos');

  for (var i = 0; i < photosArray.length; i++) {
    imgList.appendChild(generatePhotoElement(photosArray[i]));
  }

  return imgList;
};

var generateCard = function (card) {
  var cardElement = cardTemplate.cloneNode(true);
  clearElementsList(cardElement, '.popup__features');
  clearElementsList(cardElement, '.popup__photos');

  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = typePropertyParams[card.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', ' + 'выезд до ' + card.offer.checkout;
  generateFeaturesList(cardElement, card.offer.features);
  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  generatePhotosList(cardElement, card.offer.photos);
  cardElement.querySelector('.popup__avatar').src = card.author.avatar;

  return cardElement;
};

var renderCard = function () {
  var dataArray = generateAdvertsList();
  map.insertBefore(generateCard(dataArray[0]), document.querySelector('.map__filters-container'));
};

var disableFormElements = function () {
  var allFieldsets = document.querySelectorAll('.ad-form__element');

  allFieldsets.forEach(function (element) {
    element.disabled = true;;
  })
};

filtersForm.classList.add('ad-form--disabled');

disableFormElements();

var pinClickHandler = function () {
  document.querySelector('.map').classList.remove('map--faded');
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  filtersForm.classList.remove('ad-form--disabled');
  var allFieldsets = document.querySelectorAll('.ad-form__element');

  allFieldsets.forEach(function (element) {
    element.disabled = false;;
  })
};

var getDefaultAddress = function () {
  //var position = mainPin.getBoundingClientRect();
 return {
  x: parseInt(mainPin.style.left) - pinSize.WIDTH / 2,
  y: parseInt(mainPin.style.top) - pinSize.HEIGHT / 2
  // x: position.left - pinSize.WIDTH / 2,
  // y: position.top - pinSize.HEIGHT / 2
 };
};

var setAddress = function (coords) {
  var addressInput = document.querySelector('#address');
  addressInput.value = coords.x + ', ' + coords.y;
};

setAddress(getDefaultAddress());


var getAddress = function () {
  return {
    x: parseInt(mainPin.style.left) - pinSize.WIDTH / 2,
    y: parseInt(mainPin.style.top) + pinSize.POINTY_END_HEIGHT
  };
};

mainPin.addEventListener('mousedown', function() {
  pinClickHandler();
  setAddress(getAddress());
});

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    pinClickHandler();
  }
});


// //var roomsList = document.querySelector('#room_number').querySelectorAll('option');

var deselectAllOptions = function (array) {
  array.forEach(function (element) {
    element.selected = false;;
  })
};

var disableAllOptions = function (array) {
  array.forEach(function (element) {
    element.disabled = true;;
  })
};

var roomsAndGuests = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0']
};

var rooms = document.querySelector('#room_number');

var checkAvailability = function () {
  var roomsList = rooms.querySelectorAll('option');
  var guestsList = document.querySelector('#capacity').querySelectorAll('option');

  var selectedRoom;
  var selectedGuestsNumber;

  roomsList.forEach(function (room) {
    if (room.selected) {
      selectedRoom = room.value;
    }
  });

  guestsList.forEach(function (guest) {
    if (guest.selected) {
      selectedGuestsNumber = guest.value;
    }
  });

  for (var i = 0; i < roomsAndGuests[selectedRoom].length; i++) {
    roomsAndGuests[selectedRoom][i].disabled = !(roomsAndGuests[selectedRoom].includes(roomsAndGuests[selectedRoom][i].value));
  }
  // roomsAndGuests[selectedRoom].forEach(function (guest) {
  //   guest.disabled = !roomsAndGuests[selectedRoom].includes(guest.value);
  // })


  if (!roomsAndGuests[selectedRoom].includes(selectedGuestsNumber)) {
    selectedGuestsNumber = roomsAndGuests[selectedRoom][0];
  }
};

rooms.addEventListener('change', checkAvailability);

//renderPinsList(generateAdvertsList());
//renderCard();
