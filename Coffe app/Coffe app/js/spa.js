class SpaService {
  constructor() {
    this.defaultPage = "home";
  }

  init() {
    this.pages = document.querySelectorAll(".page");
    this.navItems = document.querySelectorAll(".tabbar a");
    this.pageChange();
  }

  // hide all pages
  hideAllPages() {
    for (let page of this.pages) {
      page.style.display = "none";
    }
  }

  // show page or tab
  showPage(pageId) {
    this.hideAllPages();
    document.querySelector(`#${pageId}`).style.display = "block";
    this.setActiveTab(pageId);
  }

  // sets active tabbar/ menu item
  setActiveTab(pageId) {
    for (let navItem of this.navItems) {
      if (`#${pageId}` === navItem.getAttribute("href")) {
        navItem.classList.add("active");
      } else {
        navItem.classList.remove("active");
      }
    }
  }

  // navigate to a new view/page by changing href
  navigateTo(pageId) {
    window.location.href = `#${pageId}`;
  }

  // set default page or given page by the hash url
  // function is called 'onhashchange'
  pageChange() {
    let page = this.defaultPage;
    if (window.location.hash) {
      page = window.location.hash.slice(1);
    }
    this.showPage(page);
  }
}
const spaService = new SpaService();
export default spaService;

/////////// til at render create options så vi kan få value til passe til value fra json i vores ifstatemant i beaconservice

let cafeer = [];

fetch("json/beaconspos.json")
  .then(Response => {
    return Response.json();
  })
  .then(function(json) {
    cafeer = json;
    let htmlTemplate = "";
    for (let navn of cafeer) {
      htmlTemplate += `
            <option value= "${navn.cafe}">${navn.cafe}</option>
          `;
      document.querySelector("#dropdowncafe").innerHTML = htmlTemplate;
    }
  });
