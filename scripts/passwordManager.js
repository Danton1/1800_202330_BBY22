/**
 * Gets the passkey from collection
 * @returns the passkey string
 */
async function getPassKey() {
  const userDoc = await db.collection("users").doc(auth.currentUser.uid).get();
  let passKey = userDoc.data().account_created;
  return passKey.toString();
}
/**
 * Encrypts the password with CryptoJS from the javascript library
 * @param {string} password 
 * @returns encrypted password string
 */
async function encryptPassword(password) {
  const passKey = await getPassKey();
  let encryptedpassword = CryptoJS.AES.encrypt(password, passKey);
  return encryptedpassword.toString();
} 
/**
 * Decrypts the encoded password
 * @param {string} encryptedpassword 
 * @returns regular password as a string
 */
async function decryptPassword(encryptedpassword) {
  const passKey = await getPassKey();
  let password = CryptoJS.AES.decrypt(encryptedpassword, passKey);
  return password.toString(CryptoJS.enc.Utf8);
}
/**
 * Changes element styling
 */
function showDiv() {
  document.getElementById("div").style.display = "";
}
/**
 * Changes element styling
 */
function closeDiv() {
  document.getElementById("div").style.display = "none";
}
/**
 * Changes element styling
 */
function closeOK() {
  document.getElementById("saved").style.display = "none";
  window.location.reload();
}
// Declares a variable to get the element.
const element = document.getElementById("saveBtn");

function showInfo() {
  document.getElementById("infoOfUser").style.display = "block";

  document.getElementById("showico").style.display = "contents";
}

function cancel() {
  document.getElementById("removeDiv").style.display = "none";
}

/**
 * Function to get the icon content based on app name
 * @param {string} appName 
 * @returns returns the name of the app the icon applies to
 */
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

/**
 * This function lets user know when the password is copied
 * @param {string} copyObj the name of the element
 */
async function copyContent(copyObj) {
  try {
    let thisTooltip = copyObj.nextElementSibling;
    await navigator.clipboard.writeText(copyObj.innerText).then(() => {
        thisTooltip.innerText = "Copied!";
    }).then( () => {
      // Create a MediaQueryList object
      var mediaQ = window.matchMedia("(max-width: 796px)")
      if(mediaQ.matches){
        document.addEventListener("click", () => {
        thisTooltip.innerHTML = "Click to copy";
        })
      } else {
        setTimeout(() => {
          thisTooltip.innerHTML = "Click to copy";
        }, 2000)
      }
    });
    
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
}

/**
 * Function to determine which message is displayed depnding on a media query
 */
function mediaQ(x) {
  if (x.matches) { // If media query matches
    document.getElementById("generate").value = "Generate";
  } else {
    document.getElementById("generate").value = "Generate New Password";
  }
}

// Creating a MediaQueryList object
var x = window.matchMedia("(max-width: 860px)")

// Call listener function at run time
mediaQ(x);

// Attach listener function on state changes
x.addEventListener("change", () => {
  mediaQ(x);
});

/**
 * Interacts with firebase to get the saved user passwords in the 
 * collection and display them as cards.
 */
let userID;
auth.onAuthStateChanged(user => {
  if (user) {
    userID = user.uid;
    let managerTemplate = document.getElementById("managerTemp");
    db.collection("users").doc(auth.currentUser.uid).collection("userPass")
      .get()
      .then((allAccounts) => {
        if(allAccounts.size > 1){
          document.querySelector('.credit').style.position = "unset";
        }
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
          managerCard.querySelector("#username").innerHTML = username;
          managerCard.querySelector("#pass").innerHTML = password;

          // Set the icon content
          managerCard.querySelector("#accountIcon").classList = iconContent;
          managerCard.querySelector("#account").innerHTML = web;
          managerCard.querySelector('.showButton').id = docID;
          managerCard.querySelector('.remove').id = removeID;
          managerCard.querySelector('.bottom').id = infoID;
          managerCard.querySelector('.top').id = topID;
          document.getElementById("container").append(managerCard);
          showButton(docID, infoID);
          remove(removeID, topID, infoID, docID, userID);
        });
      });
  } else {
    window.location.href = "authlogin.html";
  }
})

/**
 * Function to create a new username password combo to be saved in firebase.
 */
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
  })
}

/**
 * The function displays the passwords when the show button is clicked.
 * @param {string} id is the user's id
 * @param {string} infoID the id for the element of a username/password card
 */
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

/**
 * This function allows the userpass document to be deleted from firebase.
 * @param {string} id the user ID
 * @param {string} topID the element ID for the top section of the card.
 * @param {string} infoID the element ID for the card.
 * @param {string} docID the document's id in firebase
 * @param {string} userID the user's id in firebase
 */
function remove(id, topID, infoID, docID, userID) { 
  var toggleButton = document.getElementById(id);
  var content = document.getElementById(infoID);
  var content2 = document.getElementById(topID);
  toggleButton.addEventListener('click', function () {
    // alert ("Do you really wanna delete it?");
    content.style.display = 'none';
    content2.style.display = 'none';
    db.collection("users").doc(userID).collection("userPass").doc(docID).delete().then(() => {
      document.getElementById("removeDiv").style.display = 'none';
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });

  });
}
