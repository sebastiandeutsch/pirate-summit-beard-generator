// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

jQuery(function($) {
  if(document.querySelector("div#container")) {
    var image, container, kit;

    image = new Image();
    image.src = "/assets/image.jpg";

    image.onload = function () {
      container = document.querySelector("div#container");
      kit = new ImglyKit({
        image: image,
        container: container,
        assetsUrl: "/imglykit/assets", // Change this to where your assets are
        ui: {
          enabled: true // UI is disabled per default
        }
      });
      kit.run();

      var button = document.querySelector("button#render");
      button.addEventListener("click", function () {
        kit.render("image", "image/png")
          .then(function (image) {
            document.body.appendChild(image);
          });
      });
    };
  }
})
