import { firebaseDB } from "./firebase.js";
import { docRef } from "./loginService.js";
import {savedimgurl} from "./cameraservice.js";
import filterBeacon from './klikbaropslagService.js';

// let _selectedImgFile = "";

// vars til opslag knapper på map
let specificopslagdivs = [];
let ActiveClassList;

export class beaconsService {
  constructor(value1) {
    // this.userRef = firebaseDB.collection("beacons").doc("" + value1 + "");
    this.opslag = firebaseDB.collection("opslag");
    this.read(value1);
  }

  read(value1) {
    // ========== READ ==========
    // watch the database ref for changes
    this.opslag.onSnapshot(snapshotData => {
      let opslag = [];
      // let userRef = this.userRef;

      snapshotData.forEach(doc => {
        const opslagS = doc.data();
        opslagS.id = doc.id;
        opslag.push(opslagS);
      });

      var whatpage = 1;
      filterBeacon(opslag, value1, whatpage);
      // appendBeacon(opslag, value1);
    });
  }

  /// create a beaconpost object

  createBeacon(cafe, profilimg, name, alder, emne, img, personer, tid) {
    let newOpslag = {
      cafe: cafe,
      profilimg: profilimg,
      name: name,
      alder: alder,
      emne: emne,
      img: img,
      personer: personer,
      tid: tid
    };
    this.opslag.add(newOpslag);
  }
}

// ========== CREATE ==========

window.createBeacon = () => {
  docRef.get().then(function(doc) {
  let _beaconService = new beaconsService();
  let cafeInput = document.querySelector("#dropdowncafe")
  let name = doc.data().navn;
  let alder = doc.data().alder;
  let profilimg = doc.data().profilimg;
  let emneInput = document.querySelector("#emne");
  _beaconService.createBeacon(cafeInput.value, profilimg, name, alder, emneInput.value, savedimgurl, "personer", "tid");
}).catch(function(error) {
  console.log("Error getting document:", error);
});
};

