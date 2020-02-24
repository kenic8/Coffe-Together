"use strict";
import {firebaseDB} from "./firebase.js";
import {beaconsService} from "./beaconService.js";

let olay = document.getElementById("mapoverlay");
var activemarkers;


// MARKER ACTIVE OPSLAGS TÆLLER ////////////////////////////
// class med opslag fra database
class modifyMarksers {
  constructor(cafeer, markers) {
    this.opslag = firebaseDB.collection("opslag")
    this.read(cafeer, markers);
  }

  // updating
  read(cafeer, markers) {
    this.opslag.onSnapshot(snapshotData => {
      let opslag = [];
      snapshotData.forEach(doc => {
        const opslagS = doc.data();
        opslagS.id = doc.id;
        opslag.push(opslagS);
      });
      this.appendBeacon(opslag, cafeer, markers);
    });
  }

  // lav array af active opslags cafe navne
  appendBeacon(opslag, cafeer, markers) {
    var opslagarray = []
    for (var i = 0; i < opslag.length; i++) {
      opslagarray.push(opslag[i].cafe)
    }
    this.compressArray(opslagarray, cafeer, markers);
  }

  // compress arrayet til kun at indholde en version af navnet -> og tæl gentagende navne
  compressArray(opslagarray, cafeer, markers) {
    var compressed = [];
    // make a copy of the input array
    var copy = opslagarray.slice(0);

    // first loop goes over every element
    for (var i = 0; i < opslagarray.length; i++) {

      var myCount = 0;
      // loop over every element in the copy and see if it's the same
      for (var w = 0; w < copy.length; w++) {
        if (opslagarray[i] == copy[w]) {
          // increase amount of times duplicate is found
          myCount++;
          // sets item to undefined
          delete copy[w];
        }
      }

      // nyt object/array med cafe navn og antal gentagelse af cafe navnet
      if (myCount > 0) {
        var a = new Object();
        a.value = opslagarray[i];
        a.count = myCount;
        compressed.push(a);
      }
    }

    // MODIFY MARKERS
    var cafeArray = []
    for (var i = 0; i < cafeer.length; i++) {
      // sæt alle markers gennemsigtige
      markers[i].setOpacity(0.6)
      // opstil nyt array kun med cafe navne
      cafeArray.push(cafeer[i].cafe)
      // for alle cafeer med mindst 1 activt opslag {
      for (var u = 0; u < compressed.length; u++) {
        // sammenligner alle cafeer med cafeer med active opslag {
        if (cafeArray[i] == compressed[u].value) {
          // find (array indexet) af cafeer med active opslag ud fra alle cafeer
          activemarkers = cafeArray.indexOf(cafeArray[i])
          // Modificer markers med active opslag
          markers[activemarkers].setLabel({
            color: 'black',
            fontWeight: 'bold',
            fontSize: '20px',
            text: '' + compressed[u].count + ''
          });
          markers[activemarkers].setOpacity(1)
        }
      }
    }
  };
}

// MAP STUFF ////////////////////////////
let map;
let Mapstyling = [];
// importer map styling fra map.json {
fetch("json/mapstyling.json")
  .then(Response => {
    return Response.json();
  })
  .then(function (json) {
    Mapstyling = json;

    // opset map properties med styling fra map.json "Mapstyling = map.json"
    map = new google.maps.Map(document.getElementById("map"), {
      center: {
        lat: 56.162939,
        lng: 10.203921
      },
      zoom: 15,
      disableDefaultUI: true,
      styles: Mapstyling,
    });
  });



// MARKERS ////////////////////////////
var allMarkers = [];
// Hent koordinater fra beaconpos.json -- skal nok laves om til at hentes fra databasen.
let koordinaterPos = [];
fetch("json/beaconspos.json")
  .then(Response => {
    return Response.json();
  })
  .then(function (json) {
    koordinaterPos = json;

    // placer makers fra json koordinater;
    let marker, i, savedId;
    for (i = 0; i < koordinaterPos.length; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(koordinaterPos[i].coord[0], koordinaterPos[i].coord[1]),
        map: map,
        icon: {
          url: "coffe.png",
          labelOrigin: new google.maps.Point(40, 0)
        }
      });

      // array med alle markers
      allMarkers.push(marker);
      // giv hver marker et id lig deres array position
      marker.set("id", i);


      // klik på markers og find hvilken 
      marker.addListener("click", function () {
        for (var q = 0; q < allMarkers.length; q++) {
          // alle markers usynlig
          allMarkers[q].setOpacity(0);
          // klikket marker 100% tydelig
          allMarkers[this.id].setOpacity(1);
        }
        // gem kliket markers id til class function
        savedId = this.id;
        // hent opslag med class fra beaconService.js
        new beaconsService("" + koordinaterPos[this.id].cafe + "");

        transformstuff(savedId);
      });
    }
    // refere til marker active opslag tæller
    new modifyMarksers(koordinaterPos, allMarkers);
  });


// TRANSFORMATION ON KLIK ////////////////////////////
function transformstuff(savedId) {

  // element style transform
  document.getElementById("mapwrap").style.height = "40%"
  document.getElementById("forsideIndholdWrap").style.overflowY = "initial"

  // overlay properties
  olay.style.opacity = "0.6"
  olay.style.pointerEvents = "initial"

  // ryk map position til klikket marker
  map.setZoom(16);
  map.panTo({
    lat: koordinaterPos[savedId].coord[0],
    lng: koordinaterPos[savedId].coord[1]
  });
}


// RESET TRANSFORMATION ON KLIK ////////////////////////////
olay.addEventListener("click", resetMap);

function resetMap() {

  // Reset marker properties
  new modifyMarksers(koordinaterPos, allMarkers);

  // element style transform reset
  document.getElementById("mapwrap").style.height = "100%"
  document.getElementById("forsideIndholdWrap").style.overflowY = "hidden"

  // overlay properties reset
  olay.style.opacity = "0"
  olay.style.pointerEvents = "none"

  // reset map position til klikket marker
  map.setZoom(15);
}
