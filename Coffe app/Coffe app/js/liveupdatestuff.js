import { firebaseDB } from "./firebase.js";
import Opslaggenerater from "./klikbaropslagService.js";

export default class liveupdate2 {
  constructor() {
    this.opslag = firebaseDB.collection("opslag");
    this.read();
  }

  read() {
    // ========== READ ==========
    // watch the database ref for changes
    this.opslag.onSnapshot(snapshotData => {
      opslag = [];

      snapshotData.forEach(doc => {
        const opslagS = doc.data();
        opslagS.id = doc.id;
        opslag.push(opslagS);
      });
      this.value1 = 0;
      this.whatpage = 2;

      Opslaggenerater(opslag, this.value1, this.whatpage);
    });
  }
}

export let opslag;
export let Opslaggenerater2;
