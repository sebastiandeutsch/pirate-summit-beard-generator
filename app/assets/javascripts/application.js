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
  var v = document.getElementById('v');
  navigator.getUserMedia = (navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia);
   if (navigator.getUserMedia) {
      navigator.getUserMedia(
         {
            video:true,
            audio:false
         },
         function(stream) {
            var url = window.URL || window.webkitURL;
            v.src = url ? url.createObjectURL(stream) : stream;
            v.play();
         },
         function(error) {
            alert('Something went wrong. (error code ' + error.code + ')');
            return;
         }
      );
   }
   else {
      alert('Sorry, the browser you are using doesn\'t support getUserMedia');
      return;
    }

  $('button#screenshot').on('click', function(event) {
    console.log("fooooo")
     c = document.createElement('canvas')
     c.width = v.videoWidth
     c.height = v.videoHeight
     con = c.getContext('2d');

     con.drawImage(v, 0, 0, v.videoWidth, v.videoHeight);
     document.body.appendChild(c)

     var image = new Image()
     image.src = c.toDataURL()

       if(document.querySelector("div#container")) {
        var container, kit;

        container = document.querySelector("div#container");
        kit = new ImglyKit({
          container: container,
          image: image,
          assetsUrl: "/imglykit/assets", // Change this to where your assets are
          ui: {
            enabled: true // UI is disabled per default
          }
        });

        kit.run();

        var stickersControl = kit.ui.controls.stickers;
        stickersControl.addSticker("laser", "stickers/sticker-laser.png");
        stickersControl.selectStickers({ only: "glasses-nerd, laser" });

        var button = document.querySelector("button#render");
        button.addEventListener("click", function () {
          kit.render("data-url", "image/png")
            .then(function(dataUrl) {
              var formData = new FormData();
              formData.append('data_url', dataUrl);
              formData.append('authenticity_token', $("meta[name='csrf-token']").attr('content'))

              var xhr = new XMLHttpRequest();
              xhr.open('POST', '/upload', true);
              xhr.onload = function(e) {
                if (this.status == 200) {
                  var json = JSON.parse(this.response)
                  window.location.href = json.url;
                }
              };
              xhr.send(formData);
            });
        });
      }
  })
})
