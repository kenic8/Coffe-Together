import mapService from "../map.js";
import { savedimgurl } from "../cameraservice.js";
import tegnmap2 from "../map.js";

export default class mapPage {
  constructor() {
    this.template();
    //   let hejder = mapService;
  }

  template() {
    document.getElementById("content").innerHTML += /*html*/ `
      <section id="home" class="page">
      <div id="forsideIndholdWrap">
        <div id="mapwrap">
          <div id="mapoverlay" onclick="skiftnavn();"></div>
          <div id="map"></div>
        </div>
        <div id="opslagmenuwrap">
        <div id="imgwrap">
          </div>
          <a href="#create">
          <img id="tilføjikon" "alt="ikonilføj" src="./images/tilføjopslagikon.png"
          width=70" height="70">
       </a>
          <div id="opslagwrapwrap">
          </div>
             </div>
      </div>
    </section>  
      `;
    mapService();
  }
}
