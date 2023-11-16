
// Sign up

const signupForm = document.querySelector('#signup-form');

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
        .then(cred => {
            db.collection("users").doc(cred.user.uid).set({
              displayName: username,
              email: cred.user.email,
              account_created: Date.now(),
              last_login: Date.now()
            })
            return cred.user.updateProfile({
              displayName: username
            })
        .then(() => {
          window.location.href="whatsnext.html";
        })
  })
})

// Validate Functions
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

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password.length < 6) {
      return false
  } else {
      return true
  }
}

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
