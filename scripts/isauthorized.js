auth.onAuthStateChanged(user => {
  if (user) {
    
  } else {
    window.location.href = "authlogin.html";
  }
})