// import opretbrugerservice from "../loginService.js";
export default class opretbrugerPage {
  constructor() {
    this.template();
    //   let hejder = mapService;
  }

  template() {
    document.getElementById("content").innerHTML += /*html*/ `
      <section id="opretBruger" class="page">
      <div id="butbubtu">Log ud</div>
      <form class="formstyle">
        <h2>Opret bruger</h2>
        <input type="text" id="name" placeholder="Name" required />
        <input type="text" id="alder" placeholder="Alder" required />
        <input type="text" id="fkaffe" placeholder="Farvorit kaffe" required />
        <input type="text" id="Omig" placeholder="Om mig" required />
        <input type="file" id="img" accept="image/*" onchange="previewImage(this.files[0])">
        <div id="profileimagePreview" class="image-preview"></div>
        <button type="button" name="button" onclick="Opencamera()">
          Tag billede
        </button>
        <button type="button" name="button" onclick="createbrugerbut()">
          Opret!
      </form>
    </section>
      `;
  }
}
