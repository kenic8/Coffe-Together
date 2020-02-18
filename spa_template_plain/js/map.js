"use strict";
// import { firebaseDB } from "./firebase.js";
import { beaconsService } from "./beaconService.js";
let map;

  // Hent mapstyling fra map.json
  let Mapstyling = [];
  fetch("json/mapstyling.json")
    .then(Response => {
      return Response.json();
    })
    .then(function(json) {
      Mapstyling = json;

  // opset map properties med styling fra map.json "Mapstyling = map.json"
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 56.162939, lng: 10.203921 },
    zoom: 12,
    disableDefaultUI: true,
    styles: Mapstyling

  });
});

  // Hent koordinater fra beaconpos.json
  let koordinaterPos = [];
  fetch("json/beaconspos.json")
    .then(Response => {
      return Response.json();
    })
    .then(function(json) {
      koordinaterPos = json;

  // placer makers fra json koordinater med Id relativt til array nr
  let marker, i;
  for (i = 0; i < koordinaterPos.length; i++) {
    let image = "coffe.png";
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(koordinaterPos[i].coord[0], koordinaterPos[i].coord[1]),
      map: map,
      icon: image,
    });
    marker.set("id", i);
    // var personer = 0;
    // klik på markers og find hvilken 
    marker.addListener("click", function() {
      var savedId = this.id;
      transformstuff(savedId);
      
      new beaconsService(""+koordinaterPos[this.id].cafe+"");
      });

  }
});


let olay = document.getElementById("mapoverlay");
olay.addEventListener("click", randofunction);

// MAKE SHIT HAPPEND ON CLICK

function transformstuff(savedId) {

  // container stuff
  olay.style.display = "initial"
  document.getElementById("mapwrap").style.height = "40%"
  document.getElementById("forsideIndholdWrap").style.overflowY = "initial"

  // map stuff
  map.setZoom(14);
  map.panTo({ lat: koordinaterPos[savedId].coord[0], lng: koordinaterPos[savedId].coord[1]});
  let Mapstylingdark = [];
  fetch("json/mapstylingdark.json")
    .then(Response => {
      return Response.json();
    })
    .then(function(json) {
      Mapstylingdark = json;
  map.setOptions({styles: Mapstylingdark
});
});
}

// MAKE SHIT RESET ON CLICK

function randofunction() {
    // container stuff
    olay.style.display = "none"
    document.getElementById("mapwrap").style.height = "100%"
    document.getElementById("forsideIndholdWrap").style.overflowY = "hidden"
  
    // map stuff
    map.setZoom(12);
    map.panTo({ lat: 56.162939, lng: 10.203921 });
    let Mapstylingdark = [];
    fetch("json/mapstyling.json")
      .then(Response => {
        return Response.json();
      })
      .then(function(json) {
        Mapstylingdark = json;
    map.setOptions({styles: Mapstylingdark
  });
  });
}
