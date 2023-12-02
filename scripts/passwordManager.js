async function getPassKey() {
  const userDoc = await db.collection("users").doc(auth.currentUser.uid).get();
  let passKey = userDoc.data().account_created;
  return passKey.toString();
}

async function encryptPassword(password) {
  const passKey = await getPassKey();
  let encryptedpassword = CryptoJS.AES.encrypt(password, passKey);
  return encryptedpassword.toString();
}

async function decryptPassword(encryptedpassword) {
  const passKey = await getPassKey();
  let password = CryptoJS.AES.decrypt(encryptedpassword, passKey);
  return password.toString(CryptoJS.enc.Utf8);
}


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

//Function to copy text to the clipboard
async function copyContent(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Content copied to clipboard');
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
}

let userID;
auth.onAuthStateChanged(user => {
  if (user) {
    userID = user.uid;
    let managerTemplate = document.getElementById("managerTemp");
    db.collection("users").doc(auth.currentUser.uid).collection("userPass")
      .get()
      .then((allAccounts) => {
        allAccounts.forEach(doc => {
          var username = doc.data().user;
          var password = doc.data().passWord;
          var web = doc.data().websiteName;

          // Get the icon content based on the app name
          var iconContent = getAppIconContent(web.toLowerCase().replace(/[- /.]/g, ""));

          let managerCard = managerTemplate.content.cloneNode(true);
          var docID = doc.id;
          var infoID = "info" + docID;
          var removeID = "removed" + docID;
          var topID = 'top' + docID;

          var editID = "edit" + docID;
          var saveID = "save" + docID;
          var newPassID = 'newPass' + docID;
          managerCard.querySelector("#username").innerHTML = username;
          managerCard.querySelector("#pass").innerHTML = password;

          // Set the icon content
          managerCard.querySelector("#accountIcon").classList = iconContent;

          managerCard.querySelector("#account").innerHTML = " "+web;
          managerCard.querySelector('.showButton').id = docID;
          managerCard.querySelector('.remove').id = removeID;
          managerCard.querySelector('.bottom').id = infoID;
          managerCard.querySelector('.top').id = topID;
          managerCard.querySelector('.newPassword').id = newPassID;
          managerCard.querySelector('.editBtn').id = editID;
          managerCard.querySelector('.saveBtn').id = saveID;
          document.getElementById("container").append(managerCard);
          showButton(docID, infoID);
          remove(removeID, topID, infoID, docID, userID);
          edit(editID, saveID, newPassID, docID);
        });
      });
  } else {
    window.location.href = "authlogin.html";
  }
})

async function saveUsernamePassword() {
  let username = document.getElementById("user").value;
  let password = document.getElementById("passWord").value;
  let encryptedPass = await encryptPassword(password);
  let web = document.getElementById("websiteName").value;

  db.collection("users").doc(userID).collection("userPass").add({
    user: username,
    passWord: encryptedPass,
    websiteName: web,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  }).then(() => {
    document.getElementById("div").style.display = "none";
    document.getElementById("saved").style.display = "";
    location.reload();
    console.log("New password saved");
  })
}

function showButton(id, infoID) {
  var toggleButton = document.getElementById(id);
  var content = document.getElementById(infoID);


  toggleButton.addEventListener('click', async function () {
    let password = document.querySelector(`#${infoID} #pass`);
    if (content.style.display === 'none') {
      password.innerHTML = await decryptPassword(password.innerText);
      content.style.display = 'block';
      toggleButton.innerHTML = '<a class="btn" id="">Hide</a>';
    } else {
      content.style.display = 'none';
      toggleButton.innerHTML = '<a class="btn" id="">Show</a>';
      password.innerHTML = await encryptPassword(password.innerText);
    }
  });
}

function remove(id, topID, infoID, docID, userID) { 
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

function edit(id, saveID, newPassID) {
  console.log("inside edit");
  var editButton = document.getElementById(id);
  var newPass = document.getElementById(newPassID);
  var newSave = document.getElementById(saveID);
  editButton.addEventListener('click', function () {
    newPass.style.display = 'block';
    newSave.style.display = 'block';
  });
}

async function saveNewPassword() {
  console.log("inside save");
  let managerTemplate = document.getElementById("managerTemp");
  db.collection("users").doc(auth.currentUser.uid).collection("userPass")
    .get()
    .then((allAccounts) => {
      allAccounts.forEach(doc => {
        let managerCard = managerTemplate.content.cloneNode(true);
        var docID = doc.id;
        var newPassID = 'newPass' + docID;

        managerCard.querySelector('.newPassword').id = newPassID;
        var saveButton = document.getElementById(docID);
        var newPass = document.getElementById(newPassID).value;
        console.log(newPass);
        encryptPassword(newPass).then((encryptedPass) => {
          console.log(encryptedPass);
          console.log("Save clicked");
          db.collection("users").doc(userID).collection("userPass").doc(docID).update({
            passWord: encryptedPass,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
          }).then(() => {
            console.log("New password updated!");
            //newPass.style.display = 'none';
          }).catch((error) => {
            console.error("Error updating document: ", error);
          });
        })

      });

    });

}
