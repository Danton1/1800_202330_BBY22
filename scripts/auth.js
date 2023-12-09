let username;
let userpages = ["main.html", "passwordmanager.html", "userprofile.html", "whatsnext.html"]
//---------------------------------------------------
// This function loads template parts 
// (navbar, footer) into html doc. 
//---------------------------------------------------
auth.onAuthStateChanged(user => {
  if (user) {                   //if the pointer to "user" object is not null, then someone is logged in
    // If user is signed in, load User navbar and footer
    console.log($('#navbarPlaceholder').load('./text/navbar_after_login.html'));
    console.log($('#footerPlaceholder').load('./text/footer_after_login.html'));
    username = user.displayName;
    const usernamePlaceholder = document.querySelectorAll(".usernameHere");
    usernamePlaceholder.forEach(e => {
      e.innerHTML = username;
    })
  } else {
    // No user is signed in. Load default navbar and footer
    console.log($('#navbarPlaceholder').load('./text/navbar_before_login.html'));
    console.log($('#footerPlaceholder').load('./text/footer_before_login.html'));
    console.log('No user is signed in');
    username = "User";
  }
});
