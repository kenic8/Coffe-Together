import { firebaseDB } from "./firebase.js";
let _selectedImgFile = "";

export class beaconsService {
  constructor() {
    this.userRef = firebaseDB.collection("beacons");
    this.read();
  }

  read() {
    // ========== READ ==========
    // watch the database ref for changes
    this.userRef.onSnapshot(snapshotData => {
      let beacon = [];

      snapshotData.forEach(doc => {
        const beacons = doc.data();
        beacons.id = doc.id;
        beacon.push(beacons);
      });
      this.appendBeacon(beacon);
      console.log(beacon);
    });
  }

  // append users to the DOM via template string syntax
  appendBeacon(beacons) {
    let htmlTemplate = "";
    for (let beacon of beacons) {
      htmlTemplate += `
      <article>
        <h2>${beacon.name}</h2>
        <h2>${beacon.emne}</h2>
        <img src="${beacon.img}">
      </article>
      `;
    }
    document.querySelector("#user-container").innerHTML = htmlTemplate;
  }

  // ========== CREATE ==========
  // add a new user to firestore (database)
  createBeacon(name, emne, img) {
    let newBeacon = {
      name: name,
      emne: emne,
      img: img
    };

    this.userRef.add(newBeacon);
  }
}

////firebase create users

let _beaconService = new beaconsService();

window.createBeacon = () => {
  let nameInput = document.querySelector("#name");
  let emneInput = document.querySelector("#emne");
  let imageInput = document.querySelector("#imagePreview");
  console.log(nameInput.value);
  console.log(emneInput.value);
  console.log(imageInput.src);
  _beaconService.createBeacon(nameInput.value, emneInput.value, imageInput.src);
};
///image
window.previewImage = (file, previewId) => {
  if (file) {
    _selectedImgFile = file;
    let reader = new FileReader();
    reader.onload = event => {
      document
        .querySelector("#" + previewId)
        .setAttribute("src", event.target.result);
    };
    reader.readAsDataURL(file);
  }
};
