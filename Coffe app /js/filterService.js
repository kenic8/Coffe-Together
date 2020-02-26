import { firebaseDB } from "./firebase.js";
import filterBeacon from './klikbaropslagService.js';

document.getElementById("inputvalue").addEventListener("keyup", function () {
  /// kadler vores script ved keyup
  new filterService();
});

// export class filterService { export??
class filterService {
  constructor() {
    this.opslag = firebaseDB.collection("opslag");
    this.readfilters();
  }

  readfilters() {
    // watch the database ref for changes snapshot til at henter opslag fra vores firebeacon
    this.opslag.onSnapshot(snapshotData => {
      let beacon = [];

      snapshotData.forEach(doc => {
        const beacons = doc.data();
        beacons.id = doc.id;
        beacon.push(beacons);
      });
      var whatpage = 2;
      var value1
      //// sæt beacon arrayet fra snapshot som value for funktionnen i filterbeacons
      filterBeacon(beacon, value1, whatpage);
    });
  }
}
new filterService;