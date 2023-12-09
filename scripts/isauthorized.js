// Redirect to authlogin.html if user is not logged in
auth.onAuthStateChanged(user => {
  if (user) {
  } else {
    window.location.href = "authsignup.html";
  }
})