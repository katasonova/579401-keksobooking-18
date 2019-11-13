'use strict';

(function() {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');

  var propertyImgChooser = document.querySelector('.ad-form__upload input[type=file]');

  var createImg = function() {
    var propertyImg = document.querySelector('.ad-form__photo');
    var img = document.createElement('img');
    //border-color:White; border-style:none; border-width:0;
    //img.src = '';
    img.width = 70;
    img.height = 70;
    // img.style.borderColor = 'white';
    // img.style.borderStyle = 'none';
    // img.style.borderWidth = '0';
    img.style.borderRadius = '5px';
    propertyImg.appendChild(img);

    var propertyImgPreview = document.querySelector('.ad-form__photo img');
    return propertyImgPreview;
  }

  var uploadImg = function(input, img) {
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
    };
}
};

  avatarChooser.addEventListener('change', uploadImg(avatarChooser, avatarPreview));
  propertyImgChooser.addEventListener('change', uploadImg(propertyImgChooser, createImg()));
})();
