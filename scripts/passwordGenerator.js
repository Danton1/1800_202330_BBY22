function passwordGenerator(){
  var length = Math.random() * 5 + 12;
  var password = '';
  for(let i = 0; i < length; i++){
    password += String.fromCharCode(Math.random() * 95 + 32);
  }
  return password;
}
console.log(passwordGenerator())