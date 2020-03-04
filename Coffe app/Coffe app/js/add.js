import { firebaseDB } from "./firebase.js";

export default class addToOpslag {
  constructor() {
    this.userId = firebase.auth().currentUser.uid;
    this.opslag = firebaseDB.collection("opslag").doc(this.userId);
    this.addBruger();
  }

  // add bruger til opslag
  // adds a given movieId to the favMovies array inside _currentUser
  addBruger() {
    console.log("Join knap trykket");
  }
}
