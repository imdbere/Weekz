
(function() {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD-23wnCzHAmW_AaS_yODHhcTbh9RhnbLY",
    authDomain: "weekz-fba03.firebaseapp.com",
    databaseURL: "https://weekz-fba03.firebaseio.com",
    projectId: "weekz-fba03",
    storageBucket: "gs://weekz-fba03.appspot.com/",
    messagingSenderId: "708230896117"
  };
  firebase.initializeApp(config);

  // Get Elements
  const txtFirstname = document.getElementById('first');
  const txtLastname = document.getElementById('last');
  const txtEmail = document.getElementById('email');
  const txtPassword1 = document.getElementById('password1');
  const txtPassword2 = document.getElementById('password2');
  const btnSignup = document.getElementById('signup');

  // Login Event
  btnSignup.addEventListener('click', e => {

    // Get Email & Password
    const first = txtFirstname.value;
    const last = txtLastname.value;
    const email = txtEmail.value;
    const pass1 = txtPassword1.value;
    const pass2 = txtPassword2.value;

    const auth = firebase.auth();
    const ref = firebase.database().ref();

    function resetBorders() {
      txtLastname.style.border = "none";
      txtFirstname.style.border = "none";
      txtEmail.style.border = "none";
      txtPassword1.style.border = "none";
      txtPassword2.style.border = "none";
    }

    if (first == "") {
      resetBorders();
      txtFirstname.style.border = "1px solid #FF514C";
    } else if (last == "") {
      resetBorders();
      txtLastname.style.border = "1px solid #FF514C";
    } else if (email == "") {
      resetBorders();
      txtEmail.style.border = "1px solid #FF514C";
    } else if (pass1 == "") {
      resetBorders();
      txtPassword1.style.border = "1px solid #FF514C";
    } else if (pass2 == "") {
      resetBorders();
      txtPassword2.style.border = "1px solid #FF514C";
    } else {
      resetBorders();

      if (pass1 == pass2) {
        // Sign up
        const promise = auth.createUserWithEmailAndPassword(email, pass2)
          .then(function(response) {
            txtFirstname.style.border = "1px solid #7AC843"
            txtLastname.style.border = "1px solid #7AC843"
            txtEmail.style.border = "1px solid #7AC843"
            txtPassword1.style.border = "1px solid #7AC843"
            txtPassword2.style.border = "1px solid #7AC843"

            ref.child("users").child(response.uid).child("info").set({firstname: first, lastname: last, email: email});
            auth.onAuthStateChanged(function(user) {
              user.sendEmailVerification().then(function() {
                window.location = 'dashboard.html';
              }).catch(function(error) {
                console.log(error);
              });
            })
          });
        promise.catch(e => console.log(e.message));

      } else {
        txtPassword1.style.border = "1px solid #FF514C"
        txtPassword2.style.border = "1px solid #FF514C"
      };
    };
  });
}());
