/**
 * This function generates a password using the allowed characters.
 * @returns a string with a randomly generated password
 */
function passwordGenerator() {
  // length of password
  var length = Math.floor(Math.random() * 10) + 12;
  // variable initialization
  var password = '';
  // string with all allowed characters
  var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  // generates a random password with the specified length
  for (let i = 0; i < length; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber +1);
  }
  // DOM interaction to display generated password
  var toggleButton = document.getElementById("generate");
  toggleButton.addEventListener('click', function () {
    document.getElementById("passWord").value = password;

  });
  return password;

}
passwordGenerator()