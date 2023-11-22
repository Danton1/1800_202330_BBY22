function showDiv() {
  document.getElementById("div").style.display = "";
}
function closeDiv() {
  document.getElementById("div").style.display = "none";
}

function closeOK() {
  document.getElementById("saved").style.display = "none";
}
const element = document.getElementById("saveBtn");

function showInfo() {
  document.getElementById("infoOfUser").style.display = "block";

  document.getElementById("showico").style.display = "contents";
}
let userID;
auth.onAuthStateChanged(user => {
  if (user) {
    userID = user.uid;
    console.log("test");
    let managerTemplate = document.getElementById("managerTemp");
    db.collection("users").doc(auth.currentUser.uid).collection("userPass")
      .get()
      .then((allAccounts) => {
        allAccounts.forEach(doc => {
          var username = doc.data().user;
          var password = doc.data().passWord;
          var web = doc.data().websiteName;
          console.log(username);
          console.log(password)
          console.log(web);

          let managerCard = managerTemplate.content.cloneNode(true);

          managerCard.querySelector("#username").innerHTML = username;
          managerCard.querySelector("#pass").innerHTML = password;
          managerCard.querySelector("#website").innerHTML = web;
          document.getElementById("container").append(managerCard);
        });
      });
  } else {
    window.location.href = "authlogin.html";
  }
})

function saveUsernamePassword() {
  console.log("inside saving username and password");
  let username = document.getElementById("user").value;
  let password = document.getElementById("passWord").value;
  let web = document.getElementById("websiteName").value;

  // console.log(username,password);
  // Get the document for the current user.
  db.collection("users").doc(userID).collection("userPass").add({
    user: username,
    passWord: password,
    websiteName: web,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  }).then(() => {
    document.getElementById("div").style.display = "none";
    document.getElementById("saved").style.display = "";
    location.reload();

   
  })
}
document.addEventListener('DOMContentLoaded', function () {
  var toggleButton = document.getElementById('show');
  var content = document.getElementById('infoOfUser');

  // Add click event listener to the button
  toggleButton.addEventListener('click', function () {
    // Toggle the visibility of the content
    if (content.style.display === 'none') {
      content.style.display = 'block';
      toggleButton.innerText = 'Hide';
    } else {
      content.style.display = 'none';
      toggleButton.innerText = 'Show';
    }
  });
});

function populatePasswordManager() {
  console.log("test");
  let managerTemplate = document.getElementById("managerTemp");
  db.collection("accounts")
    .get()
    .then((allAccounts) => {
      allAccounts.forEach(doc => {
        var username = doc.data().user;
        var password = doc.data().passWord;
        var web = doc.data().websiteName;
        console.log(username);
        console.log(password)
        console.log(web);

        let managerCard = managerTemplate.content.cloneNode(true);

        managerCard.querySelector("#username").innerHTML = username;
        managerCard.querySelector("#pass").innerHTML = password;
        managerCard.querySelector("#website").innerHTML = web;
        document.getElementById("container").append(managerCard);
      });
    });
}

populatePasswordManager();
