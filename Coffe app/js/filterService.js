import { firebaseDB } from "./firebase.js";


// variabler til de forskellige funktioner længere nede
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
    // for loop for at gå igennem arrayet og sætter alle beacons med proterty .name til små bogstaver.  
    for (var i = 0; i < beacons.length; i++) {
      let filterinput = beacons[i].name.toLowerCase();

      ///



      // Kigger efter op input value fra søge felt er det samme som navnet i arrayet, hvis der så render via dommen.
      if (filterinput.includes(searchInput.toLowerCase())) {



        /// laver en html template for at render til dommen i forloopet

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
        /// push beacon efter filteringen ind i et nyt array kaldet searchgroup
        searchGroup.push(beacons[i]);


      }

      //find elementet at render til i vores html opsætning
      document.getElementById("alleopslag").innerHTML = htmlTemplate;
      aktivitoplag = document.getElementsByClassName("opslagwrap");

      /// gør klar til at at væres klikfunktion kan køres
      this.klikOpslag();



    }
  }

  klikOpslag() {



    ///klikfunktionen defineres

    /// htmlpop for at lave en tom html template at render til
    let htmlTemplatepopup = "";
    for (var i = 0; i < aktivitoplag.length; i++) {

      /// sæt aktivt class id proptery til at være indexet i arrayet. Så vi har indexeret de bestemte objekter i arrayet
      aktivitoplag[i].id = i;

      /// eventlisner til at se høre efter click i arryet  
      aktivitoplag[i].addEventListener("click", function () {

        console.log(this.id)
        ///gør klar til at render vores informationer i objekterne til dommen
        htmlTemplatepopup += `
        <div id="klikkedopslagoverlaywrap">
        <div id="userwrapstuff">
        <div id="resetknap"></div>
          <div id="Oimgwrap">
            <div id="placeimg" style="background-image: url('${
          /// referer til de specifikke id på objektet i dommen
          searchGroup[this.id].img
          }')"></div>
          </div>
          <div id="Obutwrap">
            <div id="Jbutton"></div>
          </div>
          <div id="OpslagsInf">
              <div id="OPImg" style="background-image: url('${
          /// referer til de specifikke id på objektet i dommen
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
        /// find alle opslag i vores html
        document.getElementById("alleopslag").innerHTML = htmlTemplatepopup;

        /// lav en reset knap for at fjerne de objecter som er blevet renderet i html
        document.getElementById("resetknap").addEventListener("click", function () {
          /// render ingenting til dommet og derefter udskift med html pop, kald new filterservice for at køre classen igen.
          htmlTemplatepopup = "";
          document.getElementById("alleopslag").innerHTML = htmlTemplatepopup;
          ///kald fiilterserive for at sparke gang i funktionerne forfra, så vi ikke har en tom side.
          new filterService;
        });
      });
    }
  }
}


new filterService;