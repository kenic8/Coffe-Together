export default class profilPage {
  constructor() {
    this.template();
  }

  userInfo(thisBruger) {
    document.getElementById("profil").innerHTML += /*html*/ `
        <div id="logOut" onclick="logoutbut()"></div>
        <div class="opslagwrap">
        <div id="profilimg" style="background-image: url('${thisBruger.profilimg}')"></div>
        <div id="tekstogshit">
        <h2>${thisBruger.navn}  ${thisBruger.alder}</h2>
        <p>${thisBruger.Omig}</p>
        </div>
        <div id="infoogshit">
        </div>
        </div>
        `;
  }

  template() {
    document.getElementById("content").innerHTML += /*html*/ `
      <section id="profil" class="page">
      </section>
      `;
  }
}
