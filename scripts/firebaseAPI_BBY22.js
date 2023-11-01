//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyDhnLpYZjXE6RGONb3L3NRidcZ78Cyjves",
  authDomain: "comp1800-202330-xie-steven.firebaseapp.com",
  projectId: "comp1800-202330-xie-steven",
  storageBucket: "comp1800-202330-xie-steven.appspot.com",
  messagingSenderId: "440733978186",
  appId: "1:440733978186:web:5ad2de6cdfe736d3b160b3",
  measurementId: "G-8BWMJ0SGKT"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();