//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
    
    apiKey: "AIzaSyDhri5pjXQgPSLVPXZ_x_QArS6vO8TIE1I",
    authDomain: "comp1800-demo-e0b38.firebaseapp.com",
    projectId: "comp1800-demo-e0b38",
    storageBucket: "comp1800-demo-e0b38.appspot.com",
    messagingSenderId: "1084325243253",
    appId: "1:1084325243253:web:3d3e5cb06f5bc76b650b3c"

};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

//For storing images
//const storage = firebase.storage();