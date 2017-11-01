 var map;
 var geocoder;
// var service;
// var infowindow;

// function initMap() {
//   var pyrmont = new google.maps.LatLng(-33.8665433,151.1956316);

//   return new google.maps.Map(document.getElementById('map'), {
//       center: pyrmont,
//       zoom: 14
//     });

//   var request = {
//     location: pyrmont,
//     radius: '500',
//     type: ['pharmacy']
//   };

//   service = new google.maps.places.PlacesService(map);
//   service.nearbySearch(request, callback);
// }

// function callback(results, status) {
//   if (status == google.maps.places.PlacesServiceStatus.OK) {
//     for (var i = 0; i < results.length; i++) {
//       var place = results[i];
//       createMarker(results[i]);
//     }
//   }
// }

 function initMap() {
  return new google.maps.Map(document.getElementById('map'), {
    center: {lat: -25.363, lng: 131.044},
    zoom: 8,
    radius: 500,
  })
};

// function initMap() {
//     geocoder = new google.maps.Geocoder();
//     var latlng = new google.maps.LatLng(-34.397, 150.644);
//     var mapOptions = {
//       zoom: 8,
//       center: latlng
//     }
//     map = new google.maps.Map(document.getElementById('map'), mapOptions);
//   }

 function codeAddress(zip) {
    geocoder.geocode( { 'address': zip}, function(results, status) {
      console.log(results)
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }

$(document).ready(function () {
   $('form').submit(function(e){
    e.preventDefault();
    var form = $(this);

    function validation(){
      var reg_zip = /^\d+$/;
      var zip = $("input[name='zip']").val();
      if (!zip.match(reg_zip)) {
        return false
      };

      var reg_state = /\b([A-Z]{2})\b/
      var state = $("input[name='state']").val()
      if (!state.match(reg_state)) {
        return false
      }

      return true
    };

    if (validation()) {
      $.ajax({
        url: form.attr("action"),
        type: form.attr("method"),
        data: form.serialize()
      })
      .fail(function(response){
        // imap = initMap();
        map = initMap()
        var zip = $("input[name='zip']").val();
        // map = codeAddress(zip);
        console.log(response)
        $(".main").hide();
        $("#map").append(map);
      })
    } else {
      alert("Formatted Incorrectly");
    };

  });

});