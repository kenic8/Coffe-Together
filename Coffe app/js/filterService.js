import { firebaseDB } from "./firebase.js";
import { beaconsService } from "./beaconService.js";



let aktivitoplag;
let searchGroup = [];

document.getElementById("inputvalue").addEventListener("keyup", function () {
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
    searchGroup = [];

    let htmlTemplate = "";


    // for loop for at gå igennem arrayet og render til dommen
    for (var i = 0; i < beacons.length; i++) {
      let filterinput = beacons[i].name.toLowerCase();

      ///



      // Kigger efter op input value fra søge felt er det samme som navnet i arrayet, hvis der så render via dommen.
      if (filterinput.includes(searchInput.toLowerCase())) {

        /// push beacon efter filteringen ind i et nyt array kaldet searchgroup

        ////


        htmlTemplate += `
              <div class="opslagwrap">
              <div id="profilimg" style="background-image: url('${ beacons[i].img}')"></div>
              <div id="tekstogshit">
              <h2>${beacons[i].name}</h2>
              <p>${beacons[i].emne}</p>
              </div>
              <div id="infoogshit">
              <p>p 2</p>
              <p>2t 22m</p>
              </div>
              </div>
              `;
        searchGroup.push(beacons[i]);


      }

      //find elementet at render til
      document.getElementById("alleopslag").innerHTML = htmlTemplate;
      aktivitoplag = document.getElementsByClassName("opslagwrap");
      this.klikbareOpslag();



    }
  }

  klikbareOpslag() {
    ///tænk på hvor this id referer til.

    /// htmlpop for at lave en tom html template at render til
    let htmlTemplatepopup = "";
    for (var i = 0; i < aktivitoplag.length; i++) {

      /// sæt aktivt class id proptery til at være indexet i arrayet.
      aktivitoplag[i].id = i;

      /// eventlisner til at se høre efter click i arryet  
      aktivitoplag[i].addEventListener("click", function () {

        console.log(this.id)
        htmlTemplatepopup += `
        <div id="klikkedopslagoverlaywrap">
        <div id="userwrapstuff">
        <div id="resetknap"></div>
          <div id="Oimgwrap">
            <div id="placeimg" style="background-image: url('${
          searchGroup[this.id].img
          }')"></div>
          </div>
          <div id="Obutwrap">
            <div id="Jbutton"></div>
          </div>
          <div id="OpslagsInf">
              <div id="OPImg" style="background-image: url('${
          searchGroup[this.id].profilimg
          }')"></div>
              <div id="OPInf">
                <div id="OPInftekstwrap">
                  <h2>${searchGroup[this.id].name} ${searchGroup[this.id].alder}</h2>
                  <p>${searchGroup[this.id].emne}</p>
                </div>
                <div id="OPInfpropertywrap">
                  <p>${searchGroup[this.id].tid}</p>
                  <p>${searchGroup[this.id].personer}</p>
                </div>
              </div>
          </div>
          <div id="MoreButwrap">
            <div id="chatbut"></div>
            <div id="profilbut"></div>
          </div>
        </div>
      </div>
        `;
        document.getElementById("alleopslag").innerHTML = htmlTemplatepopup;

        document.getElementById("resetknap").addEventListener("click", function () {
          /// render ingenting til dommet og derefter udskift med html pop, kald new filterservice for at køre classen igen.
          htmlTemplatepopup = "";
          document.getElementById("alleopslag").innerHTML = htmlTemplatepopup;
          new filterService;
        });
      });
    }
  }
}


new filterService();