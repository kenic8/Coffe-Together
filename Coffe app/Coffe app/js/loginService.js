"use strict";
import { firebaseDB } from "./firebase.js";
import initialiseAfterSetup from "../main.js";
// import {beaconsService} from "./beaconService.js";
import { savedimgurl } from "./cameraservice.js";

class opretbrugerservice {
  constructor() {
    this.ui = new firebaseui.auth.AuthUI(firebase.auth());
    this.bruger = firebaseDB.collection("bruger");
    this.docRef;
  }

  // export let docRef;
  // ========== FIREBASE AUTH ========== //
  // Listen on authentication state change
  init() {
    firebase.auth().onAuthStateChanged(brugere => {
      if (brugere) {
        this.userAuthenticated();
      } else {
        this.userNotAuthenticated();
      }
    });
  }

  userAuthenticated() {
    let authUser = firebase.auth().currentUser;
    this.docRef = firebaseDB.collection("bruger").doc(authUser.uid);
    docRef = this.docRef;
    this.docRef
      .get()
      .then(function(doc) {
        if (doc.exists) {
          document.location.href = "#home";
          initialiseAfterSetup(doc.data());
        } else {
          document.location.href = "#opretBruger";
          document.getElementById("opretBruger").style.display = "inherit";
          document.getElementById("firebaseui-auth-container").style.display =
            "none";
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  }

  userNotAuthenticated() {
    document.location.href = "#login";

    // Firebase UI configuration
    const uiConfig = {
      credentialHelper: firebaseui.auth.CredentialHelper.NONE,
      signInOptions: [
        {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
          requireDisplayName: false
        }
      ],

      signInSuccessUrl: "#login"
    };
    // Init Firebase UI Authentication
    this.ui.start("#firebaseui-auth-container", uiConfig);
  }

  logout() {
    firebase.auth().signOut();
  }

  sendbrugerdata() {
    this.navn = document.querySelector("#name").value;
    this.alder = document.querySelector("#alder").value;
    this.fkaffe = document.querySelector("#fkaffe").value;
    this.Omig = document.querySelector("#Omig").value;
    this.createbruger(
      this.navn,
      this.alder,
      this.fkaffe,
      this.Omig,
      savedimgurl
    );
    this.userAuthenticated();
  }

  createbruger(navn, alder, fkaffe, Omig, savedimgurl) {
    let Nybruger = {
      navn: navn,
      alder: alder,
      fkaffe: fkaffe,
      Omig: Omig,
      profilimg: savedimgurl
    };
    console.log(savedimgurl);
    this.docRef.set(Nybruger);
  }
}

export let docRef;
// firebase.auth().signOut();
const opretbrugerservice2 = new opretbrugerservice();
export default opretbrugerservice2;
