function saveUsernamePassword(){
    console.log("inside saving username and password");
    let username = document.getElementById("user").value;
    let password = document.getElementById("passWord").value;
    
    console.log(username,password);
    
    // Get the document for the current user.
    db.collection("accounts").add({
        user:username,
        passWord:password,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        window.location.href = "passwordmanager.html"; // Redirect to the password manager page
    });
}