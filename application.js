 var map;
 var geocoder;

//I would implememt tests in rspec here to make sure the initial latlng is correct.
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
    radius: 16093,
    types: ['pharmacy']
  };
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

//I would implement testing here to make sure the zip code was correct, the status of Geocoder was 'OK' and the locations are being pulled from the right spot in the results.
function codeAddress() {
  var address = document.getElementById("zip").value;
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var request = {
        location: results[0].geometry.location,
        radius: 16093,
        types: ['pharmacy']
      };
      var service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, callback);
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}

//I would implement test in jasmine for this function to make sure it is going through each item in the results.
function callback(results, status) {
  if(status == google.maps.places.PlacesServiceStatus.OK){
    for (var i = 0; i < results.length; i++){
        createMarker(results[i])
    }
  }
}

//I would implement test in jasmine for this function to make sure it is looking in the right area for the location of each result.
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

    //I would test here to make sure reg_zip and reg_state are working correctly and that this function returns true if validation is good.
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

    //I would test to make sure the status of the ajax request comes back.
    if (validation()) {
      $.ajax({
        url: form.attr("action"),
        type: form.attr("method"),
        data: form.serialize()
      })
      .fail(function(response){
        locate = codeAddress();
        $(".main").hide();
        $("#map").append(locate);
      })
    } else {
      alert("Formatted Incorrectly");
    };
  });
});