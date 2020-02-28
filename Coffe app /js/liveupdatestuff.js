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
      // filter start på opstart
      // checksideforrender
      // Opslaggenerater2.checksideforrender(opslag, this.value1, this.whatpage)
      Opslaggenerater(opslag, this.value1, this.whatpage);
      // Opslaggenerater2.checksideforrender();
      // console.log(Opslaggenerater2)
    });
  }
}

// const liveupdate2 = new liveupdate2();
// export default liveupdate2;
export let opslag;
export let Opslaggenerater2;
