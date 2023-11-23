function showDiv() {
  document.getElementById("div").style.display = "";
}
function closeDiv() {
  document.getElementById("div").style.display = "none";
}

function closeOK() {
  document.getElementById("saved").style.display = "none";
  window.location.reload();
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
          let managerCard = managerTemplate.content.cloneNode(true);
          var docID = doc.id;
          var infoID = "info" + docID;
          console.log(docID);
          managerCard.querySelector("#username").innerHTML = username;
          managerCard.querySelector("#pass").innerHTML = password;
          managerCard.querySelector("#account").innerHTML = web;
          managerCard.querySelector('.showButton').id = docID;
          managerCard.querySelector('.bottom').id = infoID;
          document.getElementById("container").append(managerCard);
          showButton(docID, infoID);
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

function showButton(id, infoID){
// document.addEventListener('DOMContentLoaded', function () {
  console.log("Inside save");
  var toggleButton = document.getElementById(id);
  var content = document.getElementById(infoID);

  
  toggleButton.addEventListener('click', function () {
    if (content.style.display === 'none') {
      content.style.display = 'block';
      toggleButton.innerText = 'Hide';
    } else {
      content.style.display = 'none';
      toggleButton.innerText = 'Show';
    }
   });
// });
}

// function populatePasswordManager() {
//   console.log("test");
//   let managerTemplate = document.getElementById("managerTemp");
//   db.collection("users").doc(auth.currentUser.uid).collection("userPass")
//     .get()
//     .then((allAccounts) => {
//       allAccounts.forEach(doc => {
//         var username = doc.data().user;
//         var password = doc.data().passWord;
//         var web = doc.data().websiteName;

//         let managerCard = managerTemplate.content.cloneNode(true);

//         managerCard.querySelector("#username").innerHTML = username;
//         managerCard.querySelector("#pass").innerHTML = password;
//         managerCard.querySelector("#website").innerHTML = web;
//         document.getElementById("container").append(managerCard);
//       });
//     });
// }