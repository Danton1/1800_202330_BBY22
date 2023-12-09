auth.onAuthStateChanged(user => {
    if (user) {
        window.location.href = "main.html";
    } else {
        console.log("no user logged in");
    }
  })