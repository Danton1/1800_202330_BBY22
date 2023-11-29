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

function cancel() {
  document.getElementById("removeDiv").style.display = "none";
}

// function showDialog() {
//   var toggleButton = document.getElementById("removeButton");
//   var content = document.getElementById("removeDiv");
//   toggleButton.addEventListener('click', function () {
//     content.style.display = '';

//   });
// }

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
          var removeID = "removed" + docID;
          var topID = 'top' + docID;

          console.log(docID);
          console.log(userID);
          managerCard.querySelector("#username").innerHTML = username;
          managerCard.querySelector("#pass").innerHTML = password;
          managerCard.querySelector("#account").innerHTML = web;
          managerCard.querySelector('.showButton').id = docID;
          // managerCard.querySelector('.deleteBtn').id = removeID;
          managerCard.querySelector('.remove').id = removeID;
          managerCard.querySelector('.bottom').id = infoID;
          managerCard.querySelector('.top').id = topID;
          document.getElementById("container").append(managerCard);
          showButton(docID, infoID);
          remove(removeID, topID, infoID, docID, userID);
          // showDialog(removeID);
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

function showButton(id, infoID) {
  console.log("Inside show");
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
}

function remove(id, topID, infoID, docID, userID) {
  console.log("inside remove");
 
  var toggleButton = document.getElementById(id);
  var content = document.getElementById(infoID);
  var content2 = document.getElementById(topID);
  toggleButton.addEventListener('click', function () {
    // alert ("Do you really wanna delete it?");
    content.style.display = 'none';
    content2.style.display = 'none';
    console.log("doc id" + docID);
    db.collection("users").doc(userID).collection("userPass").doc(docID).delete().then(() => {
      console.log("Password successfully deleted!");
      document.getElementById("removeDiv").style.display = 'none';
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });

  });
}