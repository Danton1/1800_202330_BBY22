auth.onAuthStateChanged(user => {
  if (user) {
    console.log("user logged in: ", user.displayName);
  } else {
    window.location.href = "authlogin.html";
  }
})