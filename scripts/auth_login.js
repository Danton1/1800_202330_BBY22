// Login
  const loginForm = document.querySelector('#login-form');
  console.log(loginForm);
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info
      email = document.getElementById('login_email').value;
      password = document.getElementById('login_pwd').value;

    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email/Password is invalid')
      return
      // Don't continue running the code
    }
      // log user in
      auth.signInWithEmailAndPassword(email, password)
          .then(cred => {
              console.log(cred);
              db.collection("users").doc(cred.user.uid).update({
                last_login: Date.now()
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
