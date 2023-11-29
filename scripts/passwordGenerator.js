function passwordGenerator() {
  console.log("passwordGenerator()")
  var length = Math.random() * 5 + 12;
  var password = '';
  for (let i = 0; i < length; i++) {
    password += String.fromCharCode(Math.random() * 95 + 32);
  }
  var toggleButton = document.getElementById("generate");
  toggleButton.addEventListener('click', function () {
    document.getElementById("passWord").value = password;

  });
  return password;

}
console.log(passwordGenerator())