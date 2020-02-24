"use strict";

// hide all pages
function hideAllPages() {
  let pages = document.querySelectorAll(".page");
  for (let page of pages) {
    page.style.display = "none";
  }
}

// show page or tab
function showPage(pageId) {
  hideAllPages();
  document.querySelector(`#${pageId}`).style.display = "block";
  setActiveTab(pageId);
}

// sets active tabbar/ menu item
function setActiveTab(pageId) {
  let pages = document.querySelectorAll(".tabbar a");
  for (let page of pages) {
    if (`#${pageId}` === page.getAttribute("href")) {
      page.classList.add("active");
    } else {
      page.classList.remove("active");
    }
  }
}

// navigate to a new view/page by changing href
function navigateTo(pageId) {
  location.href = `#${pageId}`;
}

// set default page or given page by the hash url
// function is called 'onhashchange'
function pageChange() {
  let page = "home";
  if (location.hash) {
    page = location.hash.slice(1);
  }
  showPage(page);
}

pageChange(); // called by default when the app is loaded for the first time

// to shoe and hide the loader
function showLoader(show) {
  let loader = document.getElementById("loader");
  if (show) {
    loader.classList.remove("hide");
  } else {
    loader.classList.add("hide");
  }
}



/////////// til at render create options så vi kan få value til passe til value fra json i vores ifstatemant i beaconservice

let cafeer = [];

fetch("json/beaconspos.json")
  .then(Response => {
    return Response.json();
  })
  .then(function (json) {
    cafeer = json;
    let htmlTemplate = "";
    for (let navn of cafeer) {

      htmlTemplate += `
            <option value= "${navn.cafe}">${navn.cafe}</option>
          `
      document.querySelector("#dropdowncafe").innerHTML = htmlTemplate;

    }

  });