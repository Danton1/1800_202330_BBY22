auth.onAuthStateChanged(user => {
  if (user) {
    console.log(user.uid); //print the uid in the browser console
    db.collection("users").doc(user.uid).get().then(userDoc => {
      var user_name = userDoc.data().displayName;
      console.log(user_name);
      document.getElementById("usernameHere").innerText = user_name;
      passwordUpdates();
    })
  } else {
    window.location.href = "authlogin.html";
  }
})

function passwordUpdates() {
  db.collection("users").doc(auth.currentUser.uid).collection("userPass").get().then()
  thisAccount.
  console.log(Date.now());
}