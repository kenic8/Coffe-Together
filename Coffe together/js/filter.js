import { firebaseDB } from "./firebase.js";


document.getElementById("inputvalue").addEventListener("keyup", function() {
  /// kadler vores script ved keyup
  new filterService();
});

export class filterService {
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
      //// sæt beacon arrayet fra snapshot som value for funktionnen i filterbeacons
      this.filterBeacon(beacon);
    });
  }

  filterBeacon(beacons) {
    /// få values fra input field
    let searchInput = document.querySelector("#inputvalue").value;
    /// tom array til push af filtreret
    let searchGroup = [];
    let htmlTemplate = "";

    // for loop for at gå igennem arrayet og render til dommen
    for (let beacon of beacons) {
      let filterinput = beacon.name.toLowerCase();
      // Kigger efter op input value fra søge felt er det samme som navnet i arrayet, hvis der så render via dommen.
      if (filterinput.includes(searchInput.toLowerCase())) {
        /// push beacon efter filteringen ind i et nyt array kaldet searchgroup
        searchGroup.push(beacon);
        htmlTemplate += `
              <div class="opslagwrap">
              <div id="profilimg" style="background-image: url('${beacon.img}')"></div>
              <div id="tekstogshit">
              <h2>${beacon.name}</h2>
              <p>${beacon.emne}</p>
              </div>
              <div id="infoogshit">
              <p>p 2</p>
              <p>2t 22m</p>
              </div>
              </div>
              `;
      }
      //find elementet at render til
      document.getElementById("alleopslag").innerHTML = htmlTemplate;
    }
  }
}
