auth.onAuthStateChanged(user => {
  if (user) {
    console.log(user.uid); //print the uid in the browser console
    db.collection("users").doc(user.uid).get().then(userDoc => {
      var user_name = userDoc.data().displayName;
      var frequency = userDoc.data().reminderFreq;
      console.log(user_name);
      document.getElementById("usernameHere").innerText = user_name;
      var str = "The following accounts are out of date:\n";
      db.collection("users").doc(auth.currentUser.uid).collection("userPass")
        .get().then(allAccounts => {
          allAccounts.forEach(doc => {
            var accountTS = doc.data().timestamp.toDate();
            var accountName = doc.data().websiteName;
            console.log(Date.now() - accountTS);
            console.log(frequency*86400000);
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

