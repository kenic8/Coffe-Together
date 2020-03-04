// import opretbrugerservice from "../loginService.js";
export default class loginPage {
    constructor() {
      this.template();
    //   let hejder = mapService;
    }
    
    template() {
      document.getElementById('content').innerHTML += /*html*/ `
      <section id="login" class="page">
      <h1 id="logo">Coffee Together</h1>
      <!-- <div class="logo">Coffee Together</div> -->
      <div id="camereholderDivP"></div>
      <!-- firebase auth container  -->
      <section id="firebaseui-auth-container"></section>
      <!-- <a class="" href="#opret" onclick="">Opret bruger</a> -->
    </section> 
      `;
    //   new opretbrugerservice();
    }
  }
