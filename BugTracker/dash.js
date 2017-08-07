
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
  var container = document.getElementById('container');

  var bugRef = firebase.database().ref().child('feedback')

  firebase.auth().onAuthStateChanged(user => {
    if (!user) {
      window.location = "login.html";
    } else {

      bugRef.once('value', function(feedback) {
        feedback.forEach(function(reports) {

          var feedbackName = reports.val().name;
          var feedbackMessage = reports.val().message;

          var report = document.createElement('div');
          report.classList.add('report');

          var name = document.createElement('h3');
          name.innerText = feedbackName;

          var message = document.createElement('p');
          message.innerText = feedbackMessage;

          report.appendChild(name);
          report.appendChild(message);

          container.appendChild(report);
        });
      });
    }
  });
}())
