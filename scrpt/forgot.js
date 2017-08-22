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
  var forgotBtn = document.getElementById('forgotBtn');
  var email = document.getElementById('email');

  // Send Password Reset Email
  forgotBtn.addEventListener('click', function() {
    firebase.auth().sendPasswordResetEmail(email.value).then(function() {
      email.value = "";
      forgotBtn.innerText = "SENT";
      forgotBtn.style.background = "#0BE370"
    });
  })
}());
