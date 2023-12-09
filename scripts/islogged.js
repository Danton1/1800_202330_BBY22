auth.onAuthStateChanged(user => {
    if (user) {
        window.location.href = "main.html";
    }
  })