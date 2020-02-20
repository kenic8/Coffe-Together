"use strict";
import { firebaseDB } from "./firebase.js";
import { beaconsService } from "./beaconService.js";
var activemarkers;

class someClass {
  constructor(tester, markers) {
    this.opslag = firebaseDB.collection("opslag");
    this.read(tester, markers);
  }

  read(tester, markers) {
    // ========== READ ==========
    // watch the database ref for changes
    this.opslag.onSnapshot(snapshotData => {
      let beacon = [];
      snapshotData.forEach(doc => {
        const beacons = doc.data();
        beacons.id = doc.id;
        beacon.push(beacons);
      });
      this.appendBeacon(beacon, tester, markers);
    });
  }

  appendBeacon(beacons, tester, markers) {
    var testarrey = [];
    for (var i = 0; i < beacons.length; i++) {
      testarrey.push(beacons[i].cafe);
    }
    this.compressArray(testarrey, tester, markers);
  }

  compressArray(testarrey, tester, markers) {
    var compressed = [];
    // make a copy of the input array
    var copy = testarrey.slice(0);

    // first loop goes over every element
    for (var i = 0; i < testarrey.length; i++) {
      var myCount = 0;
      // loop over every element in the copy and see if it's the same
      for (var w = 0; w < copy.length; w++) {
        if (testarrey[i] == copy[w]) {
          // increase amount of times duplicate is found
          myCount++;
          // sets item to undefined
          delete copy[w];
        }
      }

      if (myCount > 0) {
        var a = new Object();
        a.value = testarrey[i];
        a.count = myCount;
        compressed.push(a);
      }
    }

    var testerSimple = [];
    for (var i = 0; i < tester.length; i++) {
      testerSimple.push(tester[i].cafe);
      for (var u = 0; u < compressed.length; u++) {
        if (testerSimple[i] == compressed[u].value) {
          activemarkers = testerSimple.indexOf(testerSimple[i]);
          markers[activemarkers].setLabel({
            color: "black",
            fontWeight: "bold",
            fontSize: "20px",
            text: "" + compressed[u].count + ""
          });
        } else {
          markers[i].setOpacity(0.6);
        }
      }
    }
    // console.log(compressed.length)

    return compressed;
  }
}

let map;

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
      zoom: 15,
      disableDefaultUI: true,
      styles: Mapstyling
    });
  });

var allMarkers = [];

// Hent koordinater fra beaconpos.json
let koordinaterPos = [];
fetch("json/beaconspos.json")
  .then(Response => {
    return Response.json();
  })
  .then(function(json) {
    koordinaterPos = json;

    // placer makers fra json koordinater med Id relativt til array nr

    let marker, i, savedId;
    for (i = 0; i < koordinaterPos.length; i++) {
      let image = "coffe.png";
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(
          koordinaterPos[i].coord[0],
          koordinaterPos[i].coord[1]
        ),
        map: map,
        icon: {
          url: "coffe.png",
          labelOrigin: new google.maps.Point(40, 0)
        }
      });

      allMarkers.push(marker);
      marker.set("id", i);

      // klik på markers og find hvilken
      marker.addListener("click", function() {
        for (var q = 0; q < allMarkers.length; q++) {
          allMarkers[q].setOpacity(0);
          allMarkers[this.id].setOpacity(1);
        }
        savedId = this.id;
        transformstuff(savedId);
        new beaconsService("" + koordinaterPos[this.id].cafe + "");
      });
    }
    new someClass(koordinaterPos, allMarkers);
  });

let olay = document.getElementById("mapoverlay");
olay.addEventListener("click", randofunction);

// MAKE SHIT HAPPEND ON CLICK

function transformstuff(savedId) {
  // container stuff
  olay.style.opacity = "0.6";
  olay.style.pointerEvents = "initial";
  document.getElementById("mapwrap").style.height = "40%";
  document.getElementById("forsideIndholdWrap").style.overflowY = "initial";

  // map stuff
  map.setZoom(16);
  map.panTo({
    lat: koordinaterPos[savedId].coord[0],
    lng: koordinaterPos[savedId].coord[1]
  });
}

// MAKE SHIT RESET ON CLICK

function randofunction() {
  // container stuff

  for (var q = 0; q < allMarkers.length; q++) {
    allMarkers[q].setOpacity(1);
    new someClass(koordinaterPos, allMarkers);
  }
  olay.style.opacity = "0";
  olay.style.pointerEvents = "none";
  document.getElementById("mapwrap").style.height = "100%";
  document.getElementById("forsideIndholdWrap").style.overflowY = "hidden";

  // map stuff
  map.setZoom(15);
}
