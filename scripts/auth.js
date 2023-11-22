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
    console.log($('#footerPlaceholder').load('../text/footer_after_login.html'));
    console.log("user logged in: ", user.displayName);
    username = user.displayName;
    const usernamePlaceholder = document.querySelectorAll(".usernameHere");
    usernamePlaceholder.forEach(e => {
      e.innerHTML = username;
    })
  } else {
    // No user is signed in. Load default navbar and footer
    console.log($('#navbarPlaceholder').load('./text/navbar_before_login.html'));
    console.log($('#footerPlaceholder').load('../text/footer_before_login.html'));
    console.log('No user is signed in');
    username = "User";
  }
});

const section = document.querySelector(".confirmation-modal"),
  overlay = document.querySelector(".confirmation-overlay"),
  logoutBtn = document.querySelector("#logoutBtn"),
  closeBtn = document.querySelector(".close-btn"),
  logoutConfirm = document.querySelector("#logoutConfirm");
logoutBtn.addEventListener("click", () => {
  section.classList.add("active");
  document.getElementById("confirmMessage").innerHTML = `${username ? username + ", are" : "Are"} you sure you want to log out?`;
});
overlay.addEventListener("click", () =>
  section.classList.remove("active")
);
closeBtn.addEventListener("click", () =>
  section.classList.remove("active")
);

logoutConfirm.addEventListener('click', (e) => {
  e.preventDefault;
  auth.signOut().then(() => {
    document.getElementById("doorConfirm").className = "fa-solid fa-check-circle";
    document.getElementById("confirmMessage").innerHTML = `${username ? username : "User"} has been logged out.`
  }).then(setTimeout(() => {
    window.location.href = "index.html";
  }, 3000));
})