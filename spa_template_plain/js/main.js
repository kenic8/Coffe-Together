"use strict";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyD6mkTD7Od_kKEftLVvPkslOpFjhD20w-s",
  authDomain: "mdu-storage.firebaseapp.com",
  databaseURL: "https://mdu-storage.firebaseio.com",
  projectId: "mdu-storage",
  storageBucket: "mdu-storage.appspot.com",
  messagingSenderId: "74687313907",
  appId: "1:74687313907:web:3f317b9aba13a40d680486",
  measurementId: "G-E0H56NHG48"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// ========== FIREBASE AUTH ========== //
// Listen on authentication state change
firebase.auth().onAuthStateChanged(function(user) {
  if (user) { // if user exists and is authenticated
    userAuthenticated(user);
  } else { // if user is not logged in
    userNotAuthenticated();
  }
});

function userAuthenticated(user) {
  appendUserData(user);
  hideTabbar(false);
  showLoader(false);
}

function userNotAuthenticated() {
  hideTabbar(true);
  showPage("login");

  // Firebase UI configuration
  const uiConfig = {
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    signInSuccessUrl: '#map'
  };
  // Init Firebase UI Authentication
  const ui = new firebaseui.auth.AuthUI(firebase.auth());
  ui.start('#firebaseui-auth-container', uiConfig);
}

// show and hide tabbar
function hideTabbar(hide) {
  let tabbar = document.querySelector('.tabbar');
  if (hide) {
    tabbar.classList.add("hide");
  } else {
    tabbar.classList.remove("hide");
  }
}

// sign out user
function logout() {
  firebase.auth().signOut();
}

function appendUserData(user) {
  document.querySelector('#profile').innerHTML += `
    <h3>${user.displayName}</h3>
    <p>${user.email}</p>
  `;
}