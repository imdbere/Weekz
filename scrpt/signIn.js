// Get Elements
var txtEmail = document.getElementById('email');
var txtPassword = document.getElementById('password');
var btnSignin = document.getElementById('signin');
var loginForm = document.getElementById('loginForm');

addLoggedInHandler(function () {
  location.href = "dashboard.html";
});

addNotLoggedInHandler(function () {

  txtEmail.addEventListener('input', function()
  {
    firebase.auth().fetchProvidersForEmail(email.value).then(function(val)
    {
      if (val.length > 0)
      {
        txtEmail.style.border = "1px solid #7AC843"
      }
      else
      {
        txtEmail.style.border = "1px solid #FF514C";
      }
    }).catch(function(e) {
      txtEmail.style.border = "1px solid #FF514C";
    });
  });
  // Login Event
  loginForm.addEventListener("submit", function (event)
  {
    event.preventDefault();
    login();
  });
  btnSignin.addEventListener('click', login);
});

function login()
{
  // Get Email & Password
  var email = txtEmail.value;
  var pass = txtPassword.value;
  var auth = firebase.auth();

  if (email == "") {
    txtEmail.style.border = "1px solid #FF514C";
    txtPassword.style.border = "none";
  } else if (pass == "") {
    txtPassword.style.border = "1px solid #FF514C";
    txtEmail.style.border = "none";
  } else {
    // Sign In
    var promise = auth.signInWithEmailAndPassword(email, pass)
      .then(function (response) {
        txtEmail.style.border = "1px solid #7AC843"
        txtPassword.style.border = "1px solid #7AC843"
        window.location = 'dashboard';
      });
    promise.catch(e => {
      txtEmail.style.border = "1px solid #FF514C";
      txtPassword.style.border = "1px solid #FF514C";
    });
  }
}
