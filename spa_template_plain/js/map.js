"use strict";
import { firebaseDB } from "./firebase.js";
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
    zoom: 14,
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


  console.log(koordinaterPos[1].coord)
  // placer makers fra json koordinater med Id relativt til array nr
  let marker, i;
  for (i = 0; i < koordinaterPos.length; i++) {
    let image = "coffe.png";
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(koordinaterPos[i].coord[0], koordinaterPos[i].coord[1]),
      map: map,
      icon: image
    });
    marker.set("id", i);


    var personer = 0;
    // klik på markers og find hvilken 
    marker.addListener("click", function() {
      personer += 1;
      // console.log(koordinaterPos[this.id].cafe)
      firebaseDB.collection("beacons").doc(""+koordinaterPos[this.id].cafe+"").set({
        name: "personer"
      });
      
      new beaconsService(""+koordinaterPos[this.id].cafe+"");
      });

  }
});


