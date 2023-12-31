/**
 * Function to hash a password using SHA-1
 * @param {string} password 
 * @returns hash with the encrpted password
 */
async function hashPassword(password) {
  // Converting the password string to a buffer
  const buffer = new TextEncoder().encode(password);
  // Using the crypto.subtle.digest function to compute the SHA-1 hash of the buffer
  const hashBuffer = await crypto.subtle.digest('SHA-1', buffer);

  // Converting the hash buffer to a hexadecimal string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

  // Returning the hashed password in SHA-1 format
  return hashHex.toUpperCase();
}

/**
 * Function to check if a password has been pwned (compromised in a data breach)
 * @param {string} password 
 * @returns the number o times a password has been leaked
 */
async function checkPassword(password) {
  // Defining a variable to hold the amount of times a password has been pwned
  let pwnedCount = 0;
  // Hashing the input password
  const hashedPassword = await hashPassword(password);
  // Taking the first 5 characters of the hashed password (k-anonymity model)
  const FiveCharHashedPassword = hashedPassword.substring(0, 5);
  // Taking the remainder of the hashed password to becompared to the Pwned Passwords API response
  const hashedPasswordRemainder = hashedPassword.substring(5);

  // Construct the API URL with the first 5 characters of the hashed password
  const apiUrl = `https://api.pwnedpasswords.com/range/${FiveCharHashedPassword}`;

  // Send a request to the Pwned Passwords API
  const response = await fetch(apiUrl);
  // Check if the request was successful (status code 200)
  if (response.ok) {
    return response.text()
      .then(list => {
        // Parsing the response body as text, splitting it at every line break
        let pwd_list = list.split("\r\n");
        // Iterating through the encrypted passwords list to find the inputted password
        pwd_list.forEach(e => {
          let eachPassword = e.substring(0, e.indexOf(":"));
          if (eachPassword == hashedPasswordRemainder) {
            // If found, we obtain how many times it's been pwned
            pwnedCount = parseInt(e.substring(e.indexOf(':') + 1));
          }
        });
        return pwnedCount;
      }).then(pwnedCount => {
        return pwnedCount;
      })
  } else {
    console.error(`Error checking password: ${response.status} - ${response.statusText}`);
  }
}

const checkBtn = document.querySelector('.icon')
const safeArea = document.querySelector('.safe')
const unsafeArea = document.querySelector('.unsafe')
const pwnedCountPlaceholder = document.querySelector('#pwnedCountPlaceholder')

async function executeFunc() {
  const pwd = document.querySelector('.password')
  let pwnedCount = await checkPassword(pwd.value);
  if (pwd.value.trim().length <= 0) {
    pwd.value = '';
    return alert('Please enter the password')
  }
  if (pwnedCount <= 0) {
    for (let i = 0; i < document.querySelectorAll('.result div').length; i++) {
      document.querySelectorAll('.result div')[i].style.display = 'none'
    }
    safeArea.style.display = 'flex'
    return pwd.value = ''
  }
  for (let i = 0; i < document.querySelectorAll('.result div').length; i++) {
    document.querySelectorAll('.result div')[i].style.display = 'none'
  }
  unsafeArea.style.display = 'flex'
  pwnedCountPlaceholder.innerHTML = pwnedCount;
  pwd.value = '';
}

checkBtn.onclick = async function () {
  await executeFunc()
}

$(document).on("keypress", function (event) {
  if (event.which === 13) {
    event.preventDefault();
    executeFunc();
  }
});

