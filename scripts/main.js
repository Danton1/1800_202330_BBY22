auth.onAuthStateChanged(user => {
  if (user) {
    db.collection("users").doc(user.uid).get().then(userDoc => {
      var user_name = user.displayName;
      var frequency = userDoc.data().reminderFreq;
      document.getElementById("usernameHere").innerText = user_name;
      var str = "The following accounts are out of date:\n";
      db.collection("users").doc(auth.currentUser.uid).collection("userPass")
        .get().then(allAccounts => {
          allAccounts.forEach(doc => {
            var accountTS = doc.data().timestamp.toDate();
            var accountName = doc.data().websiteName;
            if ((Date.now() - accountTS) > (86400000 * frequency)) {
              str += "\t" + accountName + "\n";
              document.getElementById("passwordUpdates").innerText = str;
            }
          })
        })
    })
  } else {
    window.location.href = "authlogin.html";
  }
})

