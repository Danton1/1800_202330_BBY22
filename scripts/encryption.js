var encryptedAES = CryptoJS.AES.encrypt("Message", "My Secret Passphrase");
var decryptedBytes = CryptoJS.AES.decrypt(encryptedAES, "My Secret Passphrase");
var plaintext = decryptedBytes.toString(CryptoJS.enc.Utf8);