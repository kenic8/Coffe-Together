// vars
new liveupdate2();
import { opslag } from "./js/liveupdatestuff.js";

// import your pages
import profilPage from "./js/pages/Profil.js";
import mapPage from "./js/pages/mapPage.js";
import loginPage from "./js/pages/loginPage.js";
import filterPage from "./js/pages/fliterPage.js";
import opretbrugerPage from "./js/pages/opretbrugerPage.js";
import lavopslag from "./js/pages/LavOpslagPage.js";
import { getopslaginf } from "./js/klikbaropslagService.js";

// // import your services
import spaService from "./js/spa.js";
import opretbrugerservice2 from "./js/loginService.js";
import CameraServiceClass2 from "./js/cameraservice.js";
import Opslaggenerater from "./js/klikbaropslagService.js";
import liveupdate2 from "./js/liveupdatestuff.js";

// Declare and init pages
let map = new mapPage();
let opslagpage = new lavopslag();
let profil = new profilPage();
let login = new loginPage();
let opretbruger = new opretbrugerPage();
let filter = new filterPage(opslag);
let mamama = new Opslaggenerater(0, 0, 0);

let saveddisbruger;

export default function initialiseAfterSetup(thisBruger) {
  profil.userInfo(thisBruger);
  saveddisbruger = thisBruger;
}

spaService.init();
opretbrugerservice2.init();
// opretOgLogin.init();

// onclick handlers
window.pageChange = () => spaService.pageChange();
window.createbrugerbut = () => opretbrugerservice2.sendbrugerdata();
window.logoutbut = () => opretbrugerservice2.logout();
window.lavOpslag = () => getopslaginf(saveddisbruger);

// camera
window.Opencamera = () => CameraServiceClass2.Opencamera();
window.lukcamera = () => CameraServiceClass2.lukcamera();
window.tagbillede = () => CameraServiceClass2.tagbillede();
window.acceptbillede = () => CameraServiceClass2.acceptbillede();
window.previewImage = file => CameraServiceClass2.uploadFileImg(file);

let value1;
let whatpage = 2;

window.searchfunkstart = () => new Opslaggenerater(opslag, value1, whatpage);
