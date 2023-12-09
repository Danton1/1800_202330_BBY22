// Selects html element
const signupForm = document.querySelector('#signup-form');

// This DOM method dictates what happens when signing up into the app.
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  //get user info
  username = document.getElementById('signup_username').value;
  email = document.getElementById('signup_email').value;
  password = document.getElementById('signup_pwd').value;

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is invalid')
    return;
    // Don't continue running the code
  }
  // sign up user
  auth.createUserWithEmailAndPassword(email, password)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
    })
    .then(cred => {
      cred.user.updateProfile({
        displayName: username
      })
      db.collection("users").doc(cred.user.uid).set({
        displayName: username,
        email: cred.user.email,
        account_created: Date.now(),
        reminderFreq: 90,
        last_login: Date.now()
      })
      
        .then(() => {
          window.location.href = "whatsnext.html";
        })
    })
})

/**
 * This function checks to see if the emails is in the valid format.
 * 
 * @param {string} email 
 * @returns {boolean} true or false depending on requirements.
 */
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/;
  if (expression.test(email) == true) {
    // Email is good
    return true
  } else {
    // Email is not good
    return false
  }
}

/** 
 * This function checks to see if the passworrd is in the valid format.
 *
 * @param {string} password 
 * @returns {boolean} true or false depending on requirements.
 */
function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password.length < 6) {
    return false
  } else {
    return true
  }
}

/**
 * This function checks to see if a field has inputs
 * 
 * @param {string} field 
 * @returns true or false depending on whether there is an input in the required area
 */
function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}
