// MARKER ACTIVE OPSLAGS TÆLLER ////////////////////////////
// class med opslag fra database

import { firebaseDB } from "./firebase.js";

var activemarkers;
export class modifyMarksers {
  constructor(cafeer, markers) {
    this.opslag = firebaseDB.collection("opslag");
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
    var opslagarray = [];
    for (var i = 0; i < opslag.length; i++) {
      opslagarray.push(opslag[i].cafe);
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
    var cafeArray = [];
    for (var i = 0; i < cafeer.length; i++) {
      // sæt alle markers gennemsigtige
      markers[i].setOpacity(0.6);
      // opstil nyt array kun med cafe navne
      cafeArray.push(cafeer[i].cafe);
      // for alle cafeer med mindst 1 activt opslag {
      for (var u = 0; u < compressed.length; u++) {
        // sammenligner alle cafeer med cafeer med active opslag {
        if (cafeArray[i] == compressed[u].value) {
          // find (array indexet) af cafeer med active opslag ud fra alle cafeer
          activemarkers = cafeArray.indexOf(cafeArray[i]);
          // Modificer markers med active opslag
          markers[activemarkers].setLabel({
            color: "black",
            fontWeight: "bold",
            fontSize: "20px",
            text: "" + compressed[u].count + ""
          });
          markers[activemarkers].setOpacity(1);
        }
      }
    }
  }
}
