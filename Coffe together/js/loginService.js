"use strict";
import {firebaseDB} from "./firebase.js";
import {beaconsService} from "./beaconService.js";


class opretbrugerservice {
  constructor() {
    this.bruger = firebaseDB.collection("bruger")
    this.read();
  }

  read() {
    // ========== READ ==========
    // watch the database ref for changes
    this.bruger.onSnapshot(snapshotData => {
      let bruger = [];

      snapshotData.forEach(doc => {
        const brugerS = doc.data();
        brugerS.id = doc.id;
        bruger.push(brugerS);
      });
    });
  }

  createbruger(navn, alder, fkaffe, Omig, profilimgURL) {
    let Nybruger = {
      navn: navn,
      alder: alder,
      fkaffe: fkaffe,
      Omig: Omig,
      profilimg: profilimgURL
    };
    this.bruger.doc(thisuserId).set(Nybruger);
  }
}

let thisuserId;
export let docRef;
  // ========== FIREBASE AUTH ========== //
// Listen on authentication state change
firebase.auth().onAuthStateChanged(function(brugere) {
    if (brugere) { // if user exists and is authenticated
      thisuserId = brugere.uid;
      userAuthenticated();
    } else { // if user is not logged in
      userNotAuthenticated();
    }
  });
  
  function userAuthenticated() {
    docRef = firebaseDB.collection("bruger").doc(thisuserId);
    docRef.get().then(function(doc) {
    if (doc.exists) {
      showPage("home");
    } else {
      showPage("login");
      document.getElementById("opretBruger").style.display = "inherit"
      document.getElementById("firebaseui-auth-container").style.display = "none"
    }

}).catch(function(error) {
    console.log("Error getting document:", error);
});
}
  
  function userNotAuthenticated() {
    showPage("login");
  
    // Firebase UI configuration
    const uiConfig = {
      credentialHelper: firebaseui.auth.CredentialHelper.NONE,
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
      signInSuccessUrl: "#login"
    };
    // Init Firebase UI Authentication
    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', uiConfig);
  }



document.getElementById("butbubtu").addEventListener("click", logout)
  // sign out user
function logout() {
    firebase.auth().signOut();
}





// CAMERA STUFF




const canvas = document.querySelector('canvas');
let imagePreview = document.querySelector('#imagePreview');

let profileimagePreview = document.querySelector('#profileimagePreview');


// // /image--------------------------------------
window.previewImage = (file) => {
  if (file) {
    let reader = new FileReader();
    reader.onload = function (event) {
      profileimagePreviewFunk(event.target.result);
    };
    reader.readAsDataURL(file);
  }
};


var profilimgURL
function profileimagePreviewFunk(dispic) {
  profileimagePreview.style.background = "url("+dispic+")"
  profilimgURL = dispic;
}


// CAMERA
let htmlTemplate3 = '';
window.tagbilledep = () => {
  htmlTemplate3 += `
  <section id="camerawrap">
  <video autoplay></video>
  <div id="butwrapcamera">
    <div id="stopcaneraknap">Luk</div>
    <div id="tagbilledeknap">tag billede</div>
    <div id="accepterbilledeknap">accepter billede</div>
  </div>
  <div id="darkbg"></div>
</section>
  `;
  document.getElementById("camereholderDivP").innerHTML = htmlTemplate3;


  let video = document.querySelector('video');
  var stopcaneraknap = document.getElementById("stopcaneraknap")
  var tagbiledknap = document.getElementById("tagbilledeknap")
  var accepterbilledeknap = document.getElementById("accepterbilledeknap")
  stopcaneraknap.addEventListener("click", lukcamera);
  tagbiledknap.addEventListener("click", tagbillede);
  accepterbilledeknap.addEventListener("click", acceptbillede);

let constraints = {
  video: true
};

// let stream
// let tracks
let awasawa;
navigator.mediaDevices.getUserMedia(constraints).
then((stream) => {
  awasawa = stream
  video.srcObject = awasawa

})

function lukcamera() {
  htmlTemplate3 = '';
  document.getElementById("camereholderDivP").innerHTML = htmlTemplate3;
  awasawa.getTracks().forEach(function(track) {
    track.stop();
  });
}

var takepicmode 
function tagbillede() {
  console.log()
  if (takepicmode != 1) {
  video.pause();
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);
  imagePreview.style.background = "url(" + canvas.toDataURL('image/webp') + ")";
  // 
  tagbiledknap.innerHTML = "nyt bilede?"
  tagbiledknap.style.background = "brown"
    // 
    takepicmode = 1;
  } else {
    video.play();
    tagbiledknap.innerHTML = "tag billede"
    tagbiledknap.style.background = "green"
    takepicmode = 2;
  }

};

function acceptbillede() {
  htmlTemplate3 = '';
  document.getElementById("camereholderDivP").innerHTML = htmlTemplate3;
  profileimagePreviewFunk(canvas.toDataURL('image/webp'));
  awasawa.getTracks().forEach(function(track) {
    track.stop();
  });
}
};


// ========== CREATE ==========
//add a new user to firestore (database)
window.createbruger = () => {
  let _brugerservice = new opretbrugerservice();
  let navn = document.querySelector("#name");
  let alder = document.querySelector("#alder");
  let fkaffe = document.querySelector("#fkaffe");
  let Omig = document.querySelector("#Omig");
  _brugerservice.createbruger(navn.value, alder.value, fkaffe.value, Omig.value, profilimgURL);
  userAuthenticated();
};

