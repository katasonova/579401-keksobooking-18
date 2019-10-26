'use strict';
(function () {
  var SUCCESS_STATUS = 200;
  var TIMEOUT = 10000;
  var url = {
    SAVE: 'https://js.dump.academy/keksobooking',
    LOAD: 'https://js.dump.academy/keksobooking/data'
  };

  var getServerData = function (onLoad, onError, xhr) {
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

  var createXHR = function () {
    return new XMLHttpRequest();
  };

  var load = function (onLoad, onError) {
    var xhr = createXHR();
    getServerData(onLoad, onError, xhr);
    xhr.open('GET', url.LOAD);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = createXHR();
    getServerData(onLoad, onError, xhr);
    xhr.open('POST', url.SAVE);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
