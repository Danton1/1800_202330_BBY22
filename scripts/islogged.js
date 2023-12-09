// If the user is logged in, it'll redirect to main.html
auth.onAuthStateChanged(async user => {
    thisUserDoc = await db.collection("users").doc(user.uid).get();
    if (thisUserDoc.exists) {
        window.location.href = "authsignup.html";
    }
  })