
if(document.getElementById('personalInfoFields').disabled){
  document.getElementById("personalInfoFields").classList.add('form-disabled');
}

var currentUser;               //points to the document of the user who is logged in
function populateUserInfo() {
  firebase.auth().onAuthStateChanged(user => {
    // Check if user is signed in:
    if (user) {

      //go to the correct user document by referencing to the user uid
      currentUser = db.collection("users").doc(user.uid)
      //get the document for current user.
      currentUser.get()
        .then(userDoc => {
          //get the data fields of the user
          var userName = userDoc.data().displayName;
          var userBirthday = userDoc.data().birthday;
          var userLocation = userDoc.data().location;
          var userReminder = userDoc.data().reminderFreq;
          
          //if the data fields are not empty, then write them in to the form.
          if (userName != null) {
            document.getElementById("displayName").value = userName;
            
          }
          if (userBirthday != null) {
            document.getElementById("birthday").value = userBirthday;
          }
          if (userLocation != null) {
            document.getElementById("location").value = userLocation;
          }
          if (userReminder != null) {
            document.getElementById("reminderFreq").value = userReminder;
          }
        })
    } else {
      // No user is signed in.
      console.log("No user is signed in");
    }
  });
}

//call the function to run it 
populateUserInfo();

function editUserInfo() {
  //Enable the form fields
  document.getElementById("personalInfoFields").classList.remove('form-disabled');
  document.getElementById("userIcon").classList.replace("fa-user-shield", "fa-user-edit");
  document.getElementById('personalInfoFields').disabled = false;
}

function saveUserInfo() {
  //enter code here

  //a) get user entered values
  userName = document.getElementById('displayName').value;       //get the value of the field with id="displayName"
  userBirthday = document.getElementById('birthday').value;     //get the value of the field with id="birthday"
  userLocation = document.getElementById('location').value;       //get the value of the field with id="location"
  userReminder = document.getElementById('reminderFreq').value;       //get the value of the field with id="daySelector"
  //b) update user's document in Firestore
  currentUser.update({
    displayName: userName,
    birthday: userBirthday,
    location: userLocation,
    reminderFreq: userReminder
  }).then(firebase.auth().currentUser.updateProfile({
      displayName: userName
  }))
    .then(() => {
      console.log("Document successfully updated!");
    })
  //c) disable edit
  document.getElementById("personalInfoFields").classList.add('form-disabled');
  document.getElementById('personalInfoFields').disabled = true;
  document.getElementById("userIcon").classList.replace("fa-user-edit", "fa-user-check")
  setTimeout(() => {
    document.getElementById("userIcon").classList.replace("fa-user-check", "fa-user-shield")
  }, 1500)
}



//---------------------------------------------------
// This section is for displaying loging out overlay
// and functionality.
//---------------------------------------------------

// some querySelectors
const section = document.querySelector(".confirmation-modal"),
  overlay = document.querySelector(".confirmation-overlay"),
  logoutBtn = document.querySelector("#logoutBtn"),
  closeBtn = document.querySelector(".close-btn"),
  logoutConfirm = document.querySelector("#logoutConfirm");

logoutBtn.addEventListener("click", () => {
  section.classList.add("active");
  document.getElementById("confirmMessage").innerHTML = `${username ? username + ", are" : "Are"} you sure you want to log out?`;
});

overlay.addEventListener("click", () =>
  section.classList.remove("active")
);
closeBtn.addEventListener("click", () =>
  section.classList.remove("active")
);

logoutConfirm.addEventListener('click', (e) => {
  e.preventDefault;
  auth.signOut().then(() => {
    document.getElementById("doorConfirm").className = "fa-solid fa-check-circle";
    document.getElementById("confirmMessage").innerHTML = `${username ? username : "User"} has been logged out.`
  }).then(setTimeout(() => {
    window.location.href = "index.html";
  }, 3000));
})