import { firebaseDB } from "./firebase.js";
let _selectedImgFile = "";

// this.read();
export class beaconsService {
  constructor(value1) {
    // this.userRef = firebaseDB.collection("beacons").doc().emne(fafafaf);
    this.userRef = firebaseDB.collection("beacons").doc(""+value1+"");
    this.opslag = firebaseDB.collection("opslag")
    this.read(value1);
}

read(value1) {
  // ========== READ ==========
  // watch the database ref for changes
  this.opslag.onSnapshot(snapshotData => {
    let beacon = [];

    snapshotData.forEach(doc => {
      const beacons = doc.data();
      beacons.id = doc.id;
      beacon.push(beacons);
    });
    this.appendBeacon(beacon, value1);
  });
}

// append users to the DOM via template string syntax

appendBeacon(beacons, value1) {
  this.userRef.get().then(function(doc) {
    if (doc.id == ""+value1+"") {
    console.log(value1)
    let htmlTemplate = "";
      for (let beacon of beacons) {
        if (beacon.cafe == value1) {
        htmlTemplate += `
        <article>
          <h2>${beacon.name}</h2>
        </article>
        `;
      }
      }
    
    document.querySelector("#beacons").innerHTML = htmlTemplate;
    
    
    // else {
    //     // doc.data() will be undefined in this case
    //     console.log("No such document!");
    // }
    }
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });
}

}

//   read() {
//     // ========== READ ==========
//     // watch the database ref for changes
//     this.userRef.onSnapshot(snapshotData => {
//       // snapshotData.forEach(doc => {
//       //   const beacons = doc.data();
//         beacons.id = doc.id;
//         beacon.push(beacons);
//       // });
//       this.appendBeacon(beacon);
//     });
//   }

// }

//   // // append users to the DOM via template string syntax
//   appendBeacon() {
//     let htmlTemplate = "";
//       htmlTemplate += `
//       <article>
//         <h2>${beacon.name}</h2>
//       </article>
//       `;
  
//   document.querySelector("#beacons").innerHTML = htmlTemplate;
//   }
// }
  // <h2>${beacon.emne}</h2>
  // <img src="${beacon.img}">

  // ========== CREATE ==========
  // add a new user to firestore (database)
  // createBeacon(name, emne, img) {
  //   let newBeacon = {
  //     name: name,
  //     emne: emne,
  //     img: img
  //   };

  //   this.userRef.add(newBeacon);
  // }

// }
////firebase create users

// let _beaconService = new beaconsService();

// window.createBeacon = () => {
//   let nameInput = document.querySelector("#name");
//   let emneInput = document.querySelector("#emne");
//   let imageInput = document.querySelector("#imagePreview");
//   console.log(nameInput.value);
//   console.log(emneInput.value);
//   console.log(imageInput.src);
//   _beaconService.createBeacon(nameInput.value, emneInput.value, imageInput.src);
// };
///image
// window.previewImage = (file, previewId) => {
//   if (file) {
//     _selectedImgFile = file;
//     let reader = new FileReader();
//     reader.onload = event => {
//       document
//         .querySelector("#" + previewId)
//         .setAttribute("src", event.target.result);
//     };
//     reader.readAsDataURL(file);
//   }
// };
