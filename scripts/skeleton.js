//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------
auth.onAuthStateChanged(user => {
        if (user) {                   //if the pointer to "user" object is not null, then someone is logged in
                //         // User is signed in.
                //         // Do something for the user here.
                console.log($('#navbarPlaceholder').load('./text/navbar_after_login.html'));
                console.log($('#footerPlaceholder').load('../text/footer_after_login.html'));
        } else {
                //         // No user is signed in.
                console.log($('#navbarPlaceholder').load('./text/navbar_before_login.html'));
                console.log($('#footerPlaceholder').load('../text/footer_before_login.html'));
        }
})