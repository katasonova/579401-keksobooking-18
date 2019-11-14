'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var defaultAvatar = avatarPreview.src;

  // var container = document.querySelector('.ad-form__photo-container');
  var propertyImgChooser = document.querySelector('.ad-form__upload input[type=file]');
  var propertyImg = document.querySelector('.ad-form__photo');
  propertyImg.style.display = 'flex';


  // container.style.maxWidth = '450px';
  // container.style.maxHeight = '250px';

  propertyImgChooser.multiple = 'multiple';

  var createImg = function (src) {
    var img = document.createElement('img');
    img.src = src;
    img.width = 70;
    img.height = 70;
    img.style.borderRadius = '5px';
    img.style.marginRight = '5px';
    propertyImg.appendChild(img);

    var propertyImgPreview = document.querySelector('.ad-form__photo img');
    return propertyImgPreview;
  };

  var uploadImg = function (input, img) {
    return function () {
      var file = input.files[0];

      if (file) {
        var fileName = file.name.toLowerCase();

        var matches = FILE_TYPES.some(function (expansion) {
          return fileName.endsWith(expansion);
        });

        if (matches) {
          var reader = new FileReader();

          reader.addEventListener('load', function () {
            img.src = reader.result;
          });

          reader.readAsDataURL(file);
        }
      }
    };
  };

  var uploadImgs = function (input) {
    return function () {
      var files = Array.from(input.files);

      if (files) {
        var matches = files.every(function (img) {
          var fileName = img.name.toLowerCase();
          return FILE_TYPES.some(function (expansion) {
            return fileName.endsWith(expansion);
          });
        });

        if (matches) {
          files.forEach(function (file) {
            var reader = new FileReader();

            reader.addEventListener('load', function () {
            // propertyImg.style.maxWidth = '400px';
            // propertyImg.style.maxHeight = '200px';
              createImg(reader.result);
            });

            reader.readAsDataURL(file);
          });

        }
      }
    };
  };

  avatarChooser.addEventListener('change', uploadImg(avatarChooser, avatarPreview));
  propertyImgChooser.addEventListener('change', uploadImgs(propertyImgChooser));

  window.photo = {
    remove: function () {
      avatarPreview.src = defaultAvatar;
      propertyImg.innerHTML = '';
    }
  };
})();
