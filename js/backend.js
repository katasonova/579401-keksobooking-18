'use strict';
(function () {
  var SUCCESS_STATUS = 200;
  var TIMEOUT = 10000;
  var URL = {
    SAVE: 'https://js.dump.academy/keksobooking',
    LOAD: 'https://js.dump.academy/keksobooking/data'
  };

  var genericServerInteracttions = function (onLoad, onError, xhr) {
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_STATUS) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = TIMEOUT;
  };

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    genericServerInteracttions(onLoad, onError, xhr);
    xhr.open('GET', URL.LOAD);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    genericServerInteracttions(onLoad, onError, xhr);
    xhr.open('POST', URL.SAVE);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
