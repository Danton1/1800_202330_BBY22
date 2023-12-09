// Function to get the icon content based on app name
function getAppIconContent(appName) {
  // Check if the app name exists in the accountIcons variable
  if (accountIcons[appName]) {
    return accountIcons[appName];
  } else {
    // Use a default value if the app name is not found
    return "fa-regular fa-id-badge";
  }
}

let passwordCount = 0;
auth.onAuthStateChanged(user => {
  if (user) {
    db.collection("users").doc(user.uid).get().then(userDoc => {
      var user_name = user.displayName;
      var frequency = userDoc.data().reminderFreq;
      document.getElementById("usernameHere").innerText = user_name;
      var str = "";
      db.collection("users").doc(auth.currentUser.uid).collection("userPass")
        .get().then(allAccounts => {
          allAccounts.forEach(doc => {
            var accountTS = doc.data().timestamp.toDate();
            var accountName = doc.data().websiteName;
            if ((Date.now() - accountTS) > (86400000 * frequency)) {
              passwordCount++;
              let icon = getAppIconContent(accountName.toLowerCase().replace(/[- /.]/g, ""));
              str += "\t" +"<i class='"+icon+"'></i>" + accountName + "<br>";
              document.getElementById("passwordTitle").style.display = "unset";
              document.getElementById("passwordUpdates").innerHTML = str;
              document.getElementById("passwordUpdates").style.fontSize = "3rem";
              document.getElementById("passwordUpdates").style.textShadow = "0 0 10px #F00";
              if(passwordCount > 6){
                document.getElementById("passwordUpdates").style.columnCount = "2";
              }
            }
          })
        })
    })
  } else {
    window.location.href = "authlogin.html";
  }
})

