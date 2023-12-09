// Login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', async (e) => {
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
  try {
  // log user in
  const cred = await auth.signInWithEmailAndPassword(email, password);
    // Update last login timestamp
    await db.collection("users").doc(cred.user.uid).update({
      last_login: Date.now()
    }).then(() => {
          window.location.href = "main.html";
      })
    } catch (error) {
      // Handle authentication errors
      if (error.code === "auth/wrong-password" || error.code === "auth/user-not-found" || error.code === "auth/internal-error") {
        alert('Incorrect email or password');
      } else {
        alert('An unexpected error occurred. Please try again.');
      }
    }
  });

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
