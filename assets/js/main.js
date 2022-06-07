// mi localizacion
navigator.geolocation.getCurrentPosition(success);
function success(geolocationPosition) {
  let myCoords = geolocationPosition.coords;
  document.getElementById(
    "resultMyCoords"
  ).innerHTML = `<p>${myCoords.latitude}, ${myCoords.longitude}</p>`;
  console.log(geolocationPosition);
}

// iniciador de mapa
function initMap() {
  let latitud = 19.249263782810928;
  let longitud = -103.69737661551251;

  coords = {
    lat: latitud,
    lng: longitud,
  };

  generarMap(coords);
}

// funcion que genera el mapa
function generarMap(coords) {
  let map = new google.maps.Map(document.getElementById("map"), {
    zoom: 16,
    center: new google.maps.LatLng(coords.lat, coords.lng),
  });

  marker = new google.maps.Marker({
    position: new google.maps.LatLng(coords.lat, coords.lng),
    map: map,
    draggable: true,
  });

  marker.addListener("dragend", function (event) {
    document.getElementById(
      "coordsLatLng"
    ).value = `${this.getPosition().lat()}, ${this.getPosition().lng()}`;
  });

  // coords a direccion
  let geocoder = new google.maps.Geocoder();

  let infoWindow = new google.maps.InfoWindow();

  document.getElementById("btnUbi").addEventListener("click", () => {
    geocodeLatLng(geocoder, map, infoWindow);
  });
}

// funcion crear direccion con coordenas
function geocodeLatLng(geocoder, map, infoWindow) {
  let input = document.getElementById("coordsLatLng").value;

  let latlngStr = input.split(",", 2);

  let coordsLatLng = {
    lat: parseFloat(latlngStr[0]),
    lng: parseFloat(latlngStr[1]),
  };

  geocoder
    .geocode({ location: coordsLatLng })
    .then((response) => {
      if (response.results[0]) {
        // cambiar el punto
        coords = {
          lat: parseFloat(latlngStr[0]),
          lng: parseFloat(latlngStr[1]),
        };

        generarMap(coords);

        marker = new google.maps.Marker({
          position: coordsLatLng,
          map: map,
        });

        infoWindow.setContent(response.results[0].formatted_address);
        document.getElementById(
          "result"
        ).innerHTML = `<p>${response.results[0].formatted_address}</p>`;
      }
    })
    .catch((e) => console.log(e));
}
window.initMap = initMap;
