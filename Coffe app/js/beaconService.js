import { firebaseDB } from "./firebase.js";
import { docRef } from "./loginService.js";
import {savedimgurl} from "./cameraservice.js";
// let _selectedImgFile = "";

// vars til opslag knapper på map
let specificopslagdivs = [];
let ActiveClassList;

export class beaconsService {
  constructor(value1) {
    this.userRef = firebaseDB.collection("beacons").doc("" + value1 + "");
    this.opslag = firebaseDB.collection("opslag");
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
        }
      }
      document.getElementById("opslagwrapwrap").innerHTML = htmlTemplate;
      ActiveClassList = document.getElementsByClassName("opslagwrap");

      // klikbare opslag function
      klikbareOpslag(opslagS);
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

// popup når man klikker på et opslag

function klikbareOpslag() {
  let htmlTemplate2 = "";
  for (var i = 0; i < ActiveClassList.length; i++) {
    ActiveClassList[i].id = i;
    ActiveClassList[i].addEventListener("click", function () {
      // console.log(specificopslagdivs[this.id])
      htmlTemplate2 += `
      <div id="klikkedopslagoverlaywrap">
      <div id="userwrapstuff">
      <div id="resetknap"></div>
        <div id="Oimgwrap">
          <div id="placeimg" style="background-image: url('${
        specificopslagdivs[this.id].img
        }')"></div>
        </div>
        <div id="Obutwrap">
        <div id="Jbutton">Join!</div>
        </div>
        <div id="OpslagsInf">
            <div id="OPImg" style="background-image: url('${
        specificopslagdivs[this.id].profilimg
        }')"></div>
            <div id="OPInf">
              <div id="OPInftekstwrap">
                <h2>${specificopslagdivs[this.id].name}    ${
        specificopslagdivs[this.id].alder
        }</h2>
                <p>${specificopslagdivs[this.id].emne}</p>
              </div>
              <div id="OPInfpropertywrap">
                <p><img id="tid1" src="images/clock.png">${specificopslagdivs[this.id].tid}</p>
                <p><img id="personer1" src="images/account.png">${specificopslagdivs[this.id].personer}</p>
              </div>
            </div>
        </div>
        <div id="MoreButwrap">
          <div id="chatbut"><img src="images/chat.png">Gå til chat</div>
          <div id="profilbut"><img src="images/account.png">Gå til profil</div>
        </div>
      </div>
    </div>
      `;
      document.getElementById("opslagklikwrapwrap").innerHTML = htmlTemplate2;
      document
        .getElementById("resetknap")
        .addEventListener("click", function () {
          htmlTemplate2 = "";
          document.getElementById(
            "opslagklikwrapwrap"
          ).innerHTML = htmlTemplate2;
        });
    });
  }
}

// CAMERA SKAL RYKKES
// let video = document.querySelector('video');
// const canvas = document.querySelector('canvas');
// const takepicbut = document.querySelector('#takepicbut');
// let imagePreview = document.querySelector('#imagePreview');

// takepicbut.addEventListener("click", hello);

// let constraints = {
//   video: true
// };

// navigator.mediaDevices.getUserMedia(constraints).
// then((stream) => {
//   video.srcObject = stream
// });

// function hello() {
//   canvas.width = video.videoWidth;
//   canvas.height = video.videoHeight;
//   canvas.getContext('2d').drawImage(video, 0, 0);
//   imagePreview.style.background = "url(" + canvas.toDataURL('image/webp') + ")";
//   sheet = "" + canvas.toDataURL('image/webp') + ""
// };

// const canvas = document.querySelector("canvas");
// let imagePreview = document.querySelector("#imagePreview");

// let profileimagePreview = document.querySelector("#profileimagePreview");

// let sheet;
// function profileimagePreviewFunk(dispic) {
//   profileimagePreview.style.background = "url(" + dispic + ")";
//   sheet = dispic;
// }

// // CAMERA
// let htmlTemplate3 = "";
// window.tagbillede = () => {
//   htmlTemplate3 += `
//   <section id="camerawrap">
//   <video autoplay></video>
//   <div id="butwrapcamera">
//     <div id="stopcaneraknap">Luk</div>
//     <div id="tagbilledeknap">Tag billede</div>
//     <div id="accepterbilledeknap">Accepter billede</div>
//   </div>
//   <div id="darkbg"></div>
// </section>
//   `;
//   document.getElementById("camereholderDiv").innerHTML = htmlTemplate3;

//   let video = document.querySelector("video");
//   var stopcaneraknap = document.getElementById("stopcaneraknap");
//   var tagbiledknap = document.getElementById("tagbilledeknap");
//   var accepterbilledeknap = document.getElementById("accepterbilledeknap");
//   stopcaneraknap.addEventListener("click", lukcamera);
//   tagbiledknap.addEventListener("click", tagbillede);
//   accepterbilledeknap.addEventListener("click", acceptbillede);

//   let constraints = {
//     video: true
//   };


//   // let stream
//   // let tracks
//   let awasawa;
//   navigator.mediaDevices.getUserMedia(constraints).then(stream => {
//     awasawa = stream;
//     video.srcObject = awasawa;
//   });

//   var takepicmode
//   function tagbillede() {
//     console.log()
//     if (takepicmode != 1) {
//       video.pause();
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;
//       canvas.getContext('2d').drawImage(video, 0, 0);
//       imagePreview.style.background = "url(" + canvas.toDataURL('image/webp') + ")";
//       // 
//       tagbiledknap.innerHTML = "Nyt billede?"
//       // 
//       takepicmode = 1;
//     } else {
//       video.play();
//       tagbiledknap.innerHTML = "Tag billede"
//       takepicmode = 2;
//     }
//   };

//   function acceptbillede() {
//     htmlTemplate3 = "";
//     document.getElementById("camereholderDiv").innerHTML = htmlTemplate3;
//     profileimagePreviewFunk(canvas.toDataURL("image/webp"));
//     awasawa.getTracks().forEach(function (track) {
//       track.stop();
//     });
//   }
// };

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

