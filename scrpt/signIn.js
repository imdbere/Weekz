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
  const txtEmail = document.getElementById('email');
  const txtPassword = document.getElementById('password');
  const btnSignin = document.getElementById('signin');

  // Login Event
  btnSignin.addEventListener('click', e => {

    // Get Email & Password
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();

    if (email == "") {
      txtEmail.style.border = "1px solid #FF514C";
      txtPassword.style.border = "none";
    } else if (pass == "") {
      txtPassword.style.border = "1px solid #FF514C";
      txtEmail.style.border = "none";
    } else {
      // Sign In
      const promise = auth.signInWithEmailAndPassword(email, pass)
        .then(function(response) {
          txtEmail.style.border = "1px solid #7AC843"
          txtPassword.style.border = "1px solid #7AC843"
          window.location = 'dashboard.html';
        });
      promise.catch(e => {
        txtEmail.style.border = "1px solid #FF514C";
        txtPassword.style.border = "1px solid #FF514C";
      });
    }
  });
}());
