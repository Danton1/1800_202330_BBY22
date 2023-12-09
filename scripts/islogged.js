// If the user is logged in, it'll redirect to main.html
auth.onAuthStateChanged(user => {
    if (user) {
        window.location.href = "main.html";
    }
  })