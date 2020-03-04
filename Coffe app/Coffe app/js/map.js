"use strict";
// import { beaconsService } from "./beaconService.js";
import { modifyMarksers } from "./modifyMarksers.js";
import { opslag } from "./liveupdatestuff.js";
import Opslaggenerater from "./klikbaropslagService.js";
export let adressejson;

export default function mapService() {
  let olay = document.getElementById("mapoverlay");
  // MAP STUFF ////////////////////////////
  let map;
  let Mapstyling = [];
  // importer map styling fra map.json {
  fetch("json/mapstyling.json")
    .then(Response => {
      return Response.json();
    })
    .then(function(json) {
      Mapstyling = json;

      // opset map properties med styling fra map.json "Mapstyling = map.json"
      map = new google.maps.Map(document.getElementById("map"), {
        center: {
          lat: 56.162939,
          lng: 10.203921
        },
        zoom: 15,
        disableDefaultUI: true,
        styles: Mapstyling
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
    .then(function(json) {
      koordinaterPos = json;

      adressejson = koordinaterPos;
      ///

      // placer makers fra json koordinater;
      let marker, i, savedId;
      for (i = 0; i < koordinaterPos.length; i++) {
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(
            koordinaterPos[i].coord[0],
            koordinaterPos[i].coord[1]
          ),
          map: map,
          icon: {
            url: "coffe.png",
            labelOrigin: new google.maps.Point(40, 0),
            anchor: new google.maps.Point(20, 20),
            labelOrigin: new google.maps.Point(40, 0)
          }
        });

        // array med alle markers
        allMarkers.push(marker);
        // giv hver marker et id lig deres array position
        marker.set("id", i);

        // klik på markers og find hvilken
        marker.addListener("click", function() {
          for (var q = 0; q < allMarkers.length; q++) {
            // alle markers usynlig
            allMarkers[q].setOpacity(0);
            // klikket marker 100% tydelig
            allMarkers[this.id].setOpacity(1);
          }
          // gem kliket markers id til class function
          savedId = this.id;
          console.log("" + koordinaterPos[this.id].cafe + "");
            document.getElementById("imgwrap").innerHTML = `${koordinaterPos[this.id].cafe} </br> ${koordinaterPos[this.id].adresse} <img id="wrapperimg"src="${koordinaterPos[this.id].billedecafe}">
            `;

          // new beaconsService("" + koordinaterPos[this.id].cafe + "");
          // console.log(opslag[this.id].cafe)
          let whatpage = 1;

          Opslaggenerater(opslag, koordinaterPos[this.id].cafe, whatpage);
          // Opslaggenerater2.checksideforrender(opslag, koordinaterPos[this.id].cafe, whatpage);
          transformstuff(savedId);
        });
      }
      // refere til marker active opslag tæller
      new modifyMarksers(koordinaterPos, allMarkers);
    });

  // TRANSFORMATION ON KLIK ////////////////////////////
  function transformstuff(savedId) {
    let olay = document.getElementById("mapoverlay");
    // element style transform
    document.getElementById("mapwrap").style.height = "40%";
    document.getElementById("forsideIndholdWrap").style.overflowY = "initial";

    // overlay properties
    olay.style.opacity = "1";
    olay.style.pointerEvents = "initial";

    // ryk map position til klikket marker
    map.setZoom(16);
    map.panTo({
      lat: koordinaterPos[savedId].coord[0],
      lng: koordinaterPos[savedId].coord[1]
    });
  }

  // RESET TRANSFORMATION ON KLIK ////////////////////////////

  window.skiftnavn = () => {
    let olay = document.getElementById("mapoverlay");

    // Reset marker properties
    new modifyMarksers(koordinaterPos, allMarkers);

    // element style transform reset
    document.getElementById("mapwrap").style.height = "100%";
    document.getElementById("home").style.overflowY = "hidden";

    // overlay properties reset
    olay.style.opacity = "0";
    olay.style.pointerEvents = "none";

    // reset map position til klikket marker
    map.setZoom(15);
  };
}
