"use strict";
import {firebaseDB} from "./firebase.js";
import {beaconsService} from "./beaconService.js";
import {savedimgurl} from "./cameraservice.js";


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
      document.location.href = "#home"
    } else {
      document.location.href = "#opretBruger"
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


// ========== CREATE ==========
//add a new user to firestore (database)
window.createbruger = () => {
  let _brugerservice = new opretbrugerservice();
  let navn = document.querySelector("#name");
  let alder = document.querySelector("#alder");
  let fkaffe = document.querySelector("#fkaffe");
  let Omig = document.querySelector("#Omig");
  _brugerservice.createbruger(navn.value, alder.value, fkaffe.value, Omig.value, savedimgurl);
  userAuthenticated();
};

