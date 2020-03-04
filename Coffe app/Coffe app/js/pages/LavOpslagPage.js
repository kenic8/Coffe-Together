// import opretbrugerservice from "../loginService.js";
export default class lavopslag {
  constructor() {
    this.template();
  }

  template() {
    document.getElementById("content").innerHTML += /*html*/ `
      <section id="create" class="page">
      <header class="topbar">
        <h2>Opret opslag</h2>
      </header>
      <div id="camereholderDiv"></div>
  
      <div id="user-container" class="grid-container"></div>
      <form>
        <select id="dropdowncafe" name="kaffe steder">
        </select>
        <!-- <input type="text" id="name" placeholder="Name" required /> -->
        <input type="text" id="emne" placeholder="Emne" required />
        <button type="button" name="button" onclick="Opencamera()">
          Tag billede
        </button>
  
        <a href="#home">
          <button type="button" name="button" onclick="lavOpslag()">
            Opret!
          </button>
        </a>
      </form>
  
      <div id="imagePreview" class="image-preview">
        <div></div>
        <div id="takepicbut"></div>
    </section> 
      `;
  }
}
