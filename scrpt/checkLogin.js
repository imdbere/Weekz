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
  var barSignIn = document.getElementById('barSignIn');
  var barSignUp = document.getElementById('barSignUp');
  var barDash = document.getElementById('barDash');

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      barDash.style.display = "block";
      barSignIn.style.display = "none";
      barSignUp.style.display = "none";
    } else {
      barDash.style.display = "none";
      barSignIn.style.display = "block";
      barSignUp.style.display = "block";
    }
  })
}())
