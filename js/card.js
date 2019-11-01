'use strict';

(function () {
  var imgParams = {
    WIDTH: 45,
    HEIGHT: 45,
    ALT: 'Фотография жилья'
  };

  var typePropertyParams = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var map = document.querySelector('.map');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var currentCard;

  var removeCard = function () {
    if (currentCard) {
      currentCard.remove();
    }
  };

  var closeCardButtonClickHandler = function (evt) {
    var ESC_KEYCODE = 27;
    if (evt.keyCode === ESC_KEYCODE) {
      removeCard();
    }

    document.removeEventListener('keydown', closeCardButtonClickHandler);
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

    cardElement.querySelector('.popup__close').addEventListener('click', removeCard);
    document.addEventListener('keydown', closeCardButtonClickHandler);

    return cardElement;
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

  window.card = {
    render: function (advertElement) {
      removeCard();

      currentCard = generateCard(advertElement);
      map.insertBefore(currentCard, document.querySelector('.map__filters-container'));
    },
    remove: removeCard
  };
})();
