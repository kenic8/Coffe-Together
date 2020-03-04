import filterBeacon from "../klikbaropslagService.js"
import {opslag} from "../liveupdatestuff.js";

export default class filterPage {
    constructor() {
      this.template();
    }

    template() {
      document.getElementById('content').innerHTML += /*html*/ `
      <section id="side2" class="page">
      <header class="topbar">
        <h2>Opslag</h2>
        <input id="inputvalue" type="text" name="searchGroup" onkeyup="searchfunkstart()" placeholder="søg" required />
        <div id="alleopslag"></div>
      </header>
    </section>
      `;
      // new filterService();
      this.whatpage = 2;
      this.value;
      // new filterBeacon(opslag, this.value, this.whatpage)
    }
  }