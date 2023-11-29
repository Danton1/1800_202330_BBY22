async function getPassKey(){
  const userDoc = await db.collection("users").doc(auth.currentUser.uid).get();
  let passKey = userDoc.data().account_created;
    return passKey.toString();
}

async function encryptPassword(password){
  const passKey = await getPassKey();
  let encryptedpassword = CryptoJS.AES.encrypt(password, passKey);
  return encryptedpassword.toString();
}

async function decryptPassword(encryptedpassword){
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

async function saveUsernamePassword() {
  console.log("inside saving username and password");
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
  })
}

function showButton(id, infoID){
  console.log("Inside save");
  var toggleButton = document.getElementById(id);
  var content = document.getElementById(infoID);
  
  toggleButton.addEventListener('click', async function () {
    let password = document.querySelector(`#${infoID} > #pass`);
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