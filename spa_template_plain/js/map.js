"use strict";
import { beaconsService } from "./beaconService.js";
const append = new beaconsService();

console.log(append);

let map;

// fucntion som henter mappet fra apien og ned med de valgte lat og lng værdier, her ses århus
//styles arrayet er obejecter som definere stylingen til apien
map = new google.maps.Map(document.getElementById("map"), {
  center: { lat: 56.162939, lng: 10.203921 },
  zoom: 15,
  disableDefaultUI: true,
  styles: [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#ebe3cd"
        }
      ]
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#523735"
        }
      ]
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#f5f1e6"
        }
      ]
    },
    {
      featureType: "administrative",
      elementType: "geometry",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "administrative",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#c9b2a6"
        }
      ]
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#dcd2be"
        }
      ]
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#ae9e90"
        }
      ]
    },
    {
      featureType: "landscape.natural",
      elementType: "geometry",
      stylers: [
        {
          color: "#dfd2ae"
        }
      ]
    },
    {
      featureType: "poi",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [
        {
          color: "#dfd2ae"
        }
      ]
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#93817c"
        }
      ]
    },
    {
      featureType: "poi.park",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#a5b076"
        }
      ]
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#447530"
        }
      ]
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          color: "#f5f1e6"
        }
      ]
    },
    {
      featureType: "road",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [
        {
          color: "#fdfcf8"
        }
      ]
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#f8c967"
        }
      ]
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#e9bc62"
        }
      ]
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry",
      stylers: [
        {
          color: "#e98d58"
        }
      ]
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#db8555"
        }
      ]
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#806b63"
        }
      ]
    },
    {
      featureType: "transit",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "transit.line",
      elementType: "geometry",
      stylers: [
        {
          color: "#dfd2ae"
        }
      ]
    },
    {
      featureType: "transit.line",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#8f7d77"
        }
      ]
    },
    {
      featureType: "transit.line",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#ebe3cd"
        }
      ]
    },
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [
        {
          color: "#dfd2ae"
        }
      ]
    },
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#b9d3c2"
        }
      ]
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#92998d"
        }
      ]
    }
  ]
});
//// lav popups til arrays

/// alle posistionerne på kaffe stederne i et array
let markersPos = [
  [56.162939, 10.204921, 1],
  [56.162939, 10.201921, 2],
  [56.162939, 10.209921, 3]
];

let marker, i;
///et loop som køre over MarkersPos arrayet og sætte Posistionen i marker objectet
// til at være = med indexet and arrayet, som er lokationerne
// sætter imaget i objectet som her hedder icon til at være det valgte billede

for (i = 0; i < markersPos.length; i++) {
  let image = "coffe.png";
  marker = new google.maps.Marker({
    position: new google.maps.LatLng(markersPos[i][0], markersPos[i][1]),
    map: map,
    icon: image
  });
  //bruger metoden set til at give marker et id for at kunne finde ud af hvilken liste der skal åbnes, via index i arrayet fra MarkerPos
  marker.set("id", markersPos[i][2]);
  console.log(marker.id);
  console.log(marker);

  // vis info på markers
  // if statements som skal åbne de releterede lister, hvor der tjekkes om idet passer på markeren der klikkes
  if (marker.id === 1) {
    marker.addListener("click", function() {
      append;
    });
  }
  if (marker.id === 2) {
    marker.addListener("click", function() {
      alert("marker2");
    });
  }
  if (marker.id === 3) {
    marker.addListener("click", function() {
      alert("marker3");
    });
  }
}

//////

function clickshow() {
  document.querySelector("#beacons").style.display = "grid";
}
