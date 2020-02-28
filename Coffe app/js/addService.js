import { firebaseDB } from "./firebase.js";


export default class addToOpslag {
    constructor(){
        this.i =+1;
   
     this.addBruger();
    }

     // add bruger til opslag

    addBruger () {
let number = ++ this.i
        this.userId = firebase.auth().currentUser.uid;
      console.log(number)
      firebaseDB.collection("opslag").doc(this.userId).update({
        personer: number
         });
}

}