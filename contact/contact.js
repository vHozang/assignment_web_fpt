(function ($) {
  "use strict";

  // Form
  var contactForm = function () {
    if ($("#contactForm").length > 0) {
      $("#contactForm").validate({
        rules: {
          name: "required",
          subject: "required",
          email: {
            required: true,
            email: true,
          },
          message: {
            required: true,
            minlength: 5,
          },
        },
        messages: {
          name: "Please enter your name",
          subject: "Please enter your subject",
          email: "Please enter a valid email address",
          message: "Please enter a message",
        },
        /* submit via ajax */

        submitHandler: function (form) {
          var $submit = $(".submitting"),
            waitText = "Submitting...";

          $.ajax({
            type: "POST",
            url: "php/sendEmail.php",
            data: $(form).serialize(),

            beforeSend: function () {
              $submit.css("display", "block").text(waitText);
            },
            success: function (msg) {
              if (msg == "OK") {
                $("#form-message-warning").hide();
                setTimeout(function () {
                  $("#contactForm").fadeIn();
                }, 1000);
                setTimeout(function () {
                  $("#form-message-success").fadeIn();
                }, 1400);

                setTimeout(function () {
                  $("#form-message-success").fadeOut();
                }, 8000);

                setTimeout(function () {
                  $submit.css("display", "none").text(waitText);
                }, 1400);

                setTimeout(function () {
                  $("#contactForm").each(function () {
                    this.reset();
                  });
                }, 1400);
              } else {
                $("#form-message-warning").html(msg);
                $("#form-message-warning").fadeIn();
                $submit.css("display", "none");
              }
            },
            error: function () {
              $("#form-message-warning").html(
                "Something went wrong. Please try again."
              );
              $("#form-message-warning").fadeIn();
              $submit.css("display", "none");
            },
          });
        }, // end submitHandler
      });
    }
  };
  contactForm();
})(jQuery);

var google;

function init() {
  // Basic options for a simple Google Map
  // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
  // var myLatlng = new google.maps.LatLng(40.71751, -73.990922);
  var myLatlng = new google.maps.LatLng(40.69847032728747, -73.9514422416687);
  // 39.399872
  // -8.224454

  var mapOptions = {
    // How zoomed in you want the map to start at (always required)
    zoom: 7,

    // The latitude and longitude to center the map (always required)
    center: myLatlng,

    // How you would like to style the map.
    scrollwheel: false,
    styles: [
      {
        featureType: "administrative.country",
        elementType: "geometry",
        stylers: [
          {
            visibility: "simplified",
          },
          {
            hue: "#ff0000",
          },
        ],
      },
    ],
  };

  // Get the HTML DOM element that will contain your map
  // We are using a div with id="map" seen below in the <body>
  var mapElement = document.getElementById("map");

  // Create the Google Map using out element and options defined above
  var map = new google.maps.Map(mapElement, mapOptions);

  var addresses = ["New York"];

  for (var x = 0; x < addresses.length; x++) {
    $.getJSON(
      "http://maps.googleapis.com/maps/api/geocode/json?address=" +
        addresses[x] +
        "&sensor=false",
      null,
      function (data) {
        var p = data.results[0].geometry.location;
        var latlng = new google.maps.LatLng(p.lat, p.lng);
        new google.maps.Marker({
          position: latlng,
          map: map,
          icon: "images/loc.png",
        });
      }
    );
  }
}
google.maps.event.addDomListener(window, "load", init);
