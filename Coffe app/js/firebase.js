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

// export const firebaseTest = firebase;


export const firebaseDB = firebase.firestore();
