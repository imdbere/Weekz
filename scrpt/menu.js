// Get Elements
var back = document.getElementById('background');
var menu = document.getElementById('menu');
var open = document.getElementById('openMenuBtn');
var close = document.getElementById('closeMenuBtn');
var signOut = document.getElementById('signOut');

var youBtn = document.getElementById('openYouBtn');
var youDiv = document.getElementById('youDiv');

var nameLabel = document.getElementById('userName');
var mailLabel = document.getElementById('userEmail');
var verifyBtn = document.getElementById('verify');

addLoggedInHandler(function (user) {
  if (user.emailVerified) {
    verifyBtn.style.display = "none";
    console.log('verified');

  } else {
    verifyBtn.style.display = "block";
    console.log("not verified");
  }

  linkMenuEventListener();
  loadUserInfo();

});


function loadUserInfo() {
  // Getting User Info
  firebase.database().ref().child('users').child(userId).child('info').once('value').then(function (snapshot) {
    var first = snapshot.val().firstname;
    var last = snapshot.val().lastname;
    var mail = snapshot.val().email;

    nameLabel.innerText = first + " " + last;
    mailLabel.innerText = mail;

  });
}
function linkMenuEventListener() {

  //Verify E-Mail button
  verifyBtn.addEventListener('click', function () {
    firebase.auth().onAuthStateChanged(function (user) {
      user.sendEmailVerification();
      verifyBtn.innerText = "EMAIL SENT";
    });
  });

  // Toggle You
  youBtn.addEventListener('click', function() {
    console.log(youBtn);
    if (youDiv.style.display == "block") {
      youDiv.style.display = "none";
      console.log("trottl");
    } else {
      youDiv.style.display = "block"
      console.log(youDiv);
      console.log("trottl");
    }
  });

  // Open Menu
  open.addEventListener('click', function () {
    back.style.zIndex = "5000";

    sleep(150).then(() => {
      back.style.opacity = "1"

      nameLabel.style.transition = "0.8s";
      mailLabel.style.transition = "1s";

      menu.classList.add("width");
      nameLabel.style.opacity = "1";
      mailLabel.style.opacity = "1";
    });
  });

  // Close Menu
  close.addEventListener('click', function () {
    // nameLabel.style.transition = "0.2s";
    // mailLabel.style.transition = "0.2s";
    //
    // nameLabel.style.opacity = "0";
    // mailLabel.style.opacity = "0";

    back.style.opacity = "0";

    sleep(350).then(() => {
      back.style.zIndex = "-1000";
      menu.classList.remove("width");
    });
  });
  // Sign User Out
  signOut.addEventListener('click', function () {
    firebase.auth().signOut();
    window.location = "signin";
  });
}

// Sleep function to be called later
function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
