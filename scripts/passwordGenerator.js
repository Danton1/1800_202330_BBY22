function passwordGenerator() {
  var length = Math.floor(Math.random() * 10) + 12;
  var password = '';
  var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let i = 0; i < length; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber +1);
  }
  var toggleButton = document.getElementById("generate");
  toggleButton.addEventListener('click', function () {
    document.getElementById("passWord").value = password;

  });
  return password;

}
passwordGenerator()