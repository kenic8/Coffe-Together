import { firebaseDB } from "./firebase.js";
import { docRef } from "./loginService.js";
import {savedimgurl} from "./cameraservice.js";
import klikbareOpslag from './klikbaropslagService.js';

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
      appendBeacon(opslag, value1);
    });
  }

  // append users to the DOM via template string syntax
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

function appendBeacon(opslagS, value1) {
  // userRef.get().then(function (doc) {
    // reset array
    specificopslagdivs = [];
    // if (doc.id == ""+value1+"") {  SLET?
    let htmlTemplate = "";
    for (let opslag of opslagS) {
      // hvus cafen fra databasen passer med cafen for den marker der bliver trykket i map/js
      if (opslag.cafe == value1) {
        htmlTemplate += `
      <div class="opslagwrap">
      <div id="profilimg" style="background-image: url('${opslag.profilimg}')"></div>
      <div id="tekstogshit">
      <h2>${opslag.name}    ${opslag.alder}</h2>
      <p>${opslag.emne}</p>
      </div>
      <div id="infoogshit">
      <p><img id="personer" src="images/account.png">2</p>
      <p><img id="tid" src="images/clock.png">tid</p>
      </div>
      </div>
      `;
        // lav array med opslag der passer den marker der er trykket på
        specificopslagdivs.push(opslag);

        // console.log(specificopslagdivs)
      }
    }
    document.getElementById("opslagwrapwrap").innerHTML = htmlTemplate;
    ActiveClassList = document.getElementsByClassName("opslagwrap");

    // klikbare opslag function
    klikbareOpslag(ActiveClassList, specificopslagdivs);
  // });
}

// popup når man klikker på et opslag

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

