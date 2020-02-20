import {firebaseDB} from "./firebase.js";
// let _selectedImgFile = "";


// vars til opslag knapper på map
let specificopslagdivs = []
let ActiveClassList;


export class beaconsService {
  constructor(value1) {
    this.userRef = firebaseDB.collection("beacons").doc("" + value1 + "");
    this.opslag = firebaseDB.collection("opslag")
    this.read(value1);
  }

  read(value1) {
    // ========== READ ==========
    // watch the database ref for changes
    this.opslag.onSnapshot(snapshotData => {
      let opslag = [];

      snapshotData.forEach(doc => {
        const opslagS = doc.data();
        opslagS.id = doc.id;
        opslag.push(opslagS);
      });
      this.appendBeacon(opslag, value1);
    });
  }

  // append users to the DOM via template string syntax

  appendBeacon(opslagS, value1) {
    this.userRef.get().then(function (doc) {
      // reset array
      specificopslagdivs = []
      // if (doc.id == ""+value1+"") {  SLET?
      let htmlTemplate = "";
      for (let opslag of opslagS) {
        // hvus cafen fra databasen passer med cafen for den marker der bliver trykket i map/js
        if (opslag.cafe == value1) {
          htmlTemplate += `
        <div class="opslagwrap">
        <div id="profilimg" style="background-image: url('${opslag.img}')"></div>
        <div id="tekstogshit">
        <h2>${opslag.name}</h2>
        <p>${opslag.emne}</p>
        </div>
        <div id="infoogshit">
        <p>p 2</p>
        <p>2t 22m</p>
        </div>
        </div>
        `;
          // lav array med opslag der passer den marker der er trykket på
          specificopslagdivs.push(opslag);
        }
      }
      document.getElementById("opslagwrapwrap").innerHTML = htmlTemplate;
      ActiveClassList = document.getElementsByClassName("opslagwrap");

      // klikbare opslag function
      klikbareOpslag();
    })
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
      tid: tid,
    };
    this.opslag.add(newOpslag);
  }
}

function klikbareOpslag() {
  for (var i = 0; i < ActiveClassList.length; i++) {
    ActiveClassList[i].id = i;
    ActiveClassList[i].addEventListener("click", function () {
      console.log(specificopslagdivs[this.id])
    })
  }
}

let sheet;

// CAMERA SKAL RYKKES
const video = document.querySelector('video');
const canvas = document.querySelector('canvas');
const takepicbut = document.querySelector('#takepicbut');
let imagePreview = document.querySelector('#imagePreview');

takepicbut.addEventListener("click", hello);

const constraints = {
  video: true
};


navigator.mediaDevices.getUserMedia(constraints).
then((stream) => {
  video.srcObject = stream
});

function hello() {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);
  imagePreview.style.background = "url(" + canvas.toDataURL('image/webp') + ")";
  sheet = "" + canvas.toDataURL('image/webp') + ""
};



// ========== CREATE ==========
//add a new user to firestore (database)
window.createBeacon = () => {
  let _beaconService = new beaconsService();
  let cafeInput = document.querySelector("#dropdowncafe")
  let nameInput = document.querySelector("#name");
  let emneInput = document.querySelector("#emne");
  let imageInput = document.querySelector("#imagePreview");
  let dwawadw = "hejhej"
  // console.log(nameInput.value);
  // console.log(emneInput.value);
  // console.log(imageInput.src);

  //tager value fra input felter i html også dropdown
  _beaconService.createBeacon(cafeInput.value, sheet, nameInput.value, "alder", emneInput.value, sheet, "personer", "tid");
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
