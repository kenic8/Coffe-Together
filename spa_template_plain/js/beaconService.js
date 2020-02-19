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
    let htmlTemplate = "";
      for (let beacon of beacons) {
        if (beacon.cafe == value1) {
        htmlTemplate += `
        <div id="opslagwrap">
        <div id="profilimg" style="background-image: url('${beacon.img}')"></div>
        <div id="tekstogshit">
        <h2>${beacon.name}</h2>
        <p>${beacon.emne}</p>
        </div>
        <div id="infoogshit">
        <p>p 2</p>
        <p>2t 22m</p>
        </div>
        </div>
        `;
      }
      }
    document.getElementById("opslagwrapwrap").innerHTML = htmlTemplate;
    }
  })
}
/// create a beaconpost object

createBeacon(name, emne, img, cafe) {
  let newBeacon = {
    cafe: cafe,
    name: name,
    emne: emne,
    img: img
  };
  this.opslag.add(newBeacon);
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
  //add a new user to firestore (database)

  
  const video = document.querySelector('video');
  const canvas = document.querySelector('canvas');
  const takepicbut = document.querySelector('#takepicbut');
  let imagePreview = document.querySelector('#imagePreview');
  

  let sheet;
  
  takepicbut.addEventListener("click", hello);
  
  
  const constraints = {
  video: true
  };
  var image1;
  var file;
  
  navigator.mediaDevices.getUserMedia(constraints).
  then((stream) => {video.srcObject = stream});
  
  function hello() {
    console.log("virker")
        // $("#imageeditbg").css('display', 'initial');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0);
        imagePreview.style.background = "url("+canvas.toDataURL('image/webp')+")";
        sheet = ""+canvas.toDataURL('image/webp')+""
  };
  
  
let _beaconService = new beaconsService();

window.createBeacon = () => {
  let cafeInput = document.querySelector("#dropdowncafe")
  let nameInput = document.querySelector("#name");
  let emneInput = document.querySelector("#emne");
  let imageInput = document.querySelector("#imagePreview");
  console.log(nameInput.value);
  console.log(emneInput.value);
  console.log(imageInput.src);

  //tager value fra input felter i html også dropdown
  _beaconService.createBeacon(nameInput.value, emneInput.value, sheet, cafeInput.value);
};









// // /image--------------------------------------
// window.previewImage = (previewId) => {
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
