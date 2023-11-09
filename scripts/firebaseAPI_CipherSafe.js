//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
    
    apiKey: "AIzaSyD_AHe4v1qbukDQKMK85i37uNC5H6LF1t8",
    authDomain: "ciphersafe-f1e5c.firebaseapp.com",
    projectId: "ciphersafe-f1e5c",
    storageBucket: "ciphersafe-f1e5c.appspot.com",
    messagingSenderId: "424688529138",
    appId: "1:424688529138:web:b583db1398c32c7bc5aa6b"

};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

db.settings({ timestampsInSnapshots: true});