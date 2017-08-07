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
  var adminPass = document.getElementById('adminPass');
  var loginBug = document.getElementById('loginBug');

  loginBug.addEventListener('click', function() {
    if (adminPass.value == "") {
      adminPass.style.border = "1px solid #FF514C";
    } else {
      adminPass.style.border = "none";
      firebase.auth().signInWithEmailAndPassword("putzer.daniel@rolmail.net", adminPass.value).then(function() {
        window.location = 'dash.html'
      });
    }
  });

}())
