 var map;
 var geocoder;

function initMap() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(37.422, -122.084058);
  var myOptions = {
    zoom: 10,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  map = new google.maps.Map(document.getElementById("map"), myOptions);

  var request = {
    location: latlng,
    radius: 16090,
    types: ['pharmacy']
  };

  var service = new google.maps.places.PlacesService(map)

  service.nearbySearch(request, callback);

  // return new google.maps.Map(document.getElementById("map"), myOptions);
}

function codeAddress() {
  var address = document.getElementById("zip").value;

  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {

  var request = {
      location: results[0].geometry.location,
      radius: 16090,
      types: ['pharmacy']
    };

    var service = new google.maps.places.PlacesService(map)

    service.nearbySearch(request, callback);
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}

// this is the right codeaddress
// function codeAddress(map) {
//   var address = document.getElementById("zip").value;

//   geocoder.geocode( { 'address': address}, function(results, status) {
//     if (status == google.maps.GeocoderStatus.OK) {
//       map.setCenter(results[0].geometry.location);
//       var marker = new google.maps.Marker({
//         map: map,
//         position: results[0].geometry.location,
//         types: ['pharmacy']
//       });
//     } else {
//       alert("Geocode was not successful for the following reason: " + status);
//     }
//   });
// }

function callback(results, status) {

  if(status == google.maps.places.PlacesServiceStatus.OK){
    for (var i = 0; i < results.length; i++){
        createMarker(results[i])
    }
  }
}

function createMarker(place) {
  map.setCenter(place.geometry.location);
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  })
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
        // map = initMap()
        locate = codeAddress();
        console.log(response)
        $(".main").hide();
        $("#map").append(locate);
      })
    } else {
      alert("Formatted Incorrectly");
    };

  });

});