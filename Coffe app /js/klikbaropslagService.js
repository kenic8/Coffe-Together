import { firebaseDB } from "./firebase.js";
import { savedimgurl } from "./cameraservice.js";
import { adressejson } from "./map.js";

// let aktivitoplag;
// let searchGroup;
// let htmlTemplate = "";
let aktivitoplag;
let searchGroup;
let htmlTemplate = "";

export default function filterBeacon(beacons, value1, whatpage) {
  aktivitoplag = [];
  let searchInput = document.querySelector("#inputvalue").value;
  searchGroup = [];
  htmlTemplate = "";

  // iq= hvilken page er der vist
  for (var i = 0; i < beacons.length; i++) {
    if (whatpage == 1) {
      klikgennerator(i, beacons, value1, whatpage);
      console.log(whatpage);
    } else {
      console.log(whatpage);
      filtergenerator(i, beacons, searchInput, whatpage);
    }
  }
}

// FILTER PAGE -- search algorithm
function filtergenerator(i, beacons, searchInput, whatpage) {
  let filterinput = beacons[i].name.toLowerCase();
  if (filterinput.includes(searchInput.toLowerCase())) {
    showopslag(i, beacons, whatpage);
  }
  document.getElementById("alleopslag").innerHTML = htmlTemplate;
  aktivitoplag = document.getElementsByClassName("opslagwrap" + whatpage + "");
  klikbareOpslag(aktivitoplag, searchGroup);
}

// MAP PAGE -- klick algorithm
function klikgennerator(i, beacons, value1, whatpage) {
  if (beacons[i].cafe == value1) {
    showopslag(i, beacons, whatpage);
    ////kald json fuction billeder og adresse bruges senere
    jsonmarkers(i);
  }
  document.getElementById("opslagwrapwrap").innerHTML = htmlTemplate;
  aktivitoplag = document.getElementsByClassName("opslagwrap" + whatpage + "");
  klikbareOpslag(aktivitoplag, searchGroup);
}

// Opslag
function showopslag(i, beacons, whatpage) {
  htmlTemplate += `
  <div class="opslagwrap${whatpage}">
  <div id="profilimg" style="background-image: url('${beacons[i].profilimg}')"></div>
  <div id="tekstogshit">
  <h2>${beacons[i].name}    ${beacons[i].alder}</h2>
  <p>${beacons[i].emne}</p>
  </div>
  <div id="infoogshit">
  <p><img id="personer" src="images/account.png">2</p>
  <p><img id="tid" src="images/clock.png">tid</p>
  </div>
  </div>
        `;

  searchGroup.push(beacons[i]);
}

// Opslagsklicks
function klikbareOpslag(ActiveClassList, specificopslagdivs) {
  let htmlTemplate2 = "";
  document.getElementById("opslagklikwrapwrap").innerHTML = htmlTemplate2;
  for (var i = 0; i < ActiveClassList.length; i++) {
    ActiveClassList[i].id = i;
    ActiveClassList[i].addEventListener("click", function() {
      // disablescroll
      document.querySelector("body").style.overflowY = "hidden";
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
                  <p><img id="tid1" src="images/clock.png">${
                    specificopslagdivs[this.id].tid
                  }</p>
                  <p><img id="personer1" src="images/account.png">${
                    specificopslagdivs[this.id].personer
                  }</p>
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
        .addEventListener("click", function() {
          document.querySelector("body").style.overflowY = "initial";
          htmlTemplate2 = "";
          document.getElementById(
            "opslagklikwrapwrap"
          ).innerHTML = htmlTemplate2;
        });
    });
  }
}
function jsonmarkers(i) {
  document.getElementById(
    "imgwrap"
  ).innerHTML = `${adressejson[i].adresse},<img id="wrapperimg"src="${adressejson[i].billedecafe}">
  `;
}

// Create beacon
function createBeacon(cafe, profilimg, name, alder, emne, img, personer, tid) {
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
  firebaseDB.collection("opslag").add(newOpslag);
}

// ========== CREATE ==========

function getopslaginf(savedbruger) {
  let cafeInput = document.querySelector("#dropdowncafe");
  let name = savedbruger.navn;
  let alder = savedbruger.alder;
  let profilimg = savedbruger.profilimg;
  let emneInput = document.querySelector("#emne");
  createBeacon(
    cafeInput.value,
    profilimg,
    name,
    alder,
    emneInput.value,
    savedimgurl,
    "personer",
    "tid"
  );
}

export { getopslaginf };

// const Opslaggenerater2 = new Opslaggenerater();
// export default Opslaggenerater2;
// const filterBeacon2 = new filterBeacon();
// export default filterBeacon2;

// const filterBeacon2 = new filterBeacon();
// export default filterBeacon2;

// export default function filterBeacon(beacons, value1, whatpage) {
//   console.log(value1, beacons)
//   aktivitoplag = [];
//   let searchInput = document.querySelector("#inputvalue").value;
//   searchGroup = [];
//   htmlTemplate = "";

//   // iq= hvilken page er der vist
//   for (var i = 0; i < beacons.length; i++) {
//     if (whatpage == 1) {
//       klikgennerator(i, beacons, value1, whatpage)
//     } else {

//       filtergenerator(i, beacons, searchInput, whatpage);
//     }
//   }
// }

// // FILTER PAGE -- search algorithm
//     function filtergenerator(i, beacons, searchInput, whatpage) {
//     let filterinput = beacons[i].name.toLowerCase();
//     if (filterinput.includes(searchInput.toLowerCase()))  {
//     showopslag(i, beacons, whatpage);
//   }
//   document.getElementById("alleopslag").innerHTML = htmlTemplate;
//   aktivitoplag = document.getElementsByClassName("opslagwrap"+whatpage+"");
//   klikbareOpslag(aktivitoplag, searchGroup);
// }

// // MAP PAGE -- klick algorithm
// function klikgennerator(i, beacons, value1, whatpage) {
//    if (beacons[i].cafe == value1) {
//   showopslag(i, beacons, whatpage);
// }
// document.getElementById("opslagwrapwrap").innerHTML = htmlTemplate;
// aktivitoplag = document.getElementsByClassName("opslagwrap"+whatpage+"");
// console.log("jeg køre")
// klikbareOpslag(aktivitoplag, searchGroup);
// }

// // Opslag
// function showopslag(i, beacons, whatpage) {
//   htmlTemplate += `
//   <div class="opslagwrap${whatpage}">
//   <div id="profilimg" style="background-image: url('${beacons[i].profilimg}')"></div>
//   <div id="tekstogshit">
//   <h2>${beacons[i].name}    ${beacons[i].alder}</h2>
//   <p>${beacons[i].emne}</p>
//   </div>
//   <div id="infoogshit">
//   <p><img id="personer" src="images/account.png">2</p>
//   <p><img id="tid" src="images/clock.png">tid</p>
//   </div>
//   </div>
//         `;

//   searchGroup.push(beacons[i]);
// }

// // Opslagsklicks info
// function klikbareOpslag(ActiveClassList, specificopslagdivs) {

//   let htmlTemplate2 = "";
//     document.getElementById("opslagklikwrapwrap").innerHTML = htmlTemplate2;
//     for (var i = 0; i < ActiveClassList.length; i++) {
//      ActiveClassList[i].id = i;
//       ActiveClassList[i].addEventListener("click", function () {
//         // disablescroll
//         document.querySelector("body").style.overflowY = "hidden"
//         htmlTemplate2 += `
//         <div id="klikkedopslagoverlaywrap">
//         <div id="userwrapstuff">
//         <div id="resetknap"></div>
//           <div id="Oimgwrap">
//             <div id="placeimg" style="background-image: url('${specificopslagdivs[this.id].img}')"></div>
//           </div>
//           <div id="Obutwrap">
//           <div id="Jbutton">Join!</div>
//           </div>
//           <div id="OpslagsInf">
//               <div id="OPImg" style="background-image: url('${specificopslagdivs[this.id].profilimg}')"></div>
//               <div id="OPInf">
//                 <div id="OPInftekstwrap">
//                   <h2>${specificopslagdivs[this.id].name}    ${specificopslagdivs[this.id].alder}</h2>
//                   <p>${specificopslagdivs[this.id].emne}</p>
//                 </div>
//                 <div id="OPInfpropertywrap">
//                   <p><img id="tid1" src="images/clock.png">${specificopslagdivs[this.id].tid}</p>
//                   <p><img id="personer1" src="images/account.png">${specificopslagdivs[this.id].personer}</p>
//                 </div>
//               </div>
//           </div>
//           <div id="MoreButwrap">
//             <div id="chatbut"><img src="images/chat.png">Gå til chat</div>
//             <div id="profilbut"><img src="images/account.png">Gå til profil</div>
//           </div>
//         </div>
//       </div>
//         `;
//         document.getElementById("opslagklikwrapwrap").innerHTML = htmlTemplate2;
//         document.getElementById("resetknap").addEventListener("click", function () {
//           document.querySelector("body").style.overflowY = "initial"
//           htmlTemplate2 = "";
//             document.getElementById("opslagklikwrapwrap").innerHTML = htmlTemplate2;
//           });
//       });
//     }
//   }

//   // Create beacon
//   function createBeacon(cafe, profilimg, name, alder, emne, img, personer, tid) {
//     let newOpslag = {
//       cafe: cafe,
//       profilimg: profilimg,
//       name: name,
//       alder: alder,
//       emne: emne,
//       img: img,
//       personer: personer,
//       tid: tid
//     };
//     firebaseDB.collection("opslag").add(newOpslag);
//   }

// // ========== CREATE ==========

// window.createBeacon = () => {
//   docRef.get().then(function(doc) {
//   let cafeInput = document.querySelector("#dropdowncafe")
//   let name = doc.data().navn;
//   let alder = doc.data().alder;
//   let profilimg = doc.data().profilimg;
//   let emneInput = document.querySelector("#emne");
//   createBeacon(cafeInput.value, profilimg, name, alder, emneInput.value, savedimgurl, "personer", "tid");
// }).catch(function(error) {
//   console.log("Error getting document:", error);
// });
// };
