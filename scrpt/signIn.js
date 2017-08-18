// Get Elements
const txtEmail = document.getElementById('email');
const txtPassword = document.getElementById('password');
const btnSignin = document.getElementById('signin');
const loginForm = document.getElementById('loginForm');

addLoggedInHandler(function () {
  location.href = "dashboard.html";
});

addNotLoggedInHandler(function () {
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
      .then(function (response) {
        txtEmail.style.border = "1px solid #7AC843"
        txtPassword.style.border = "1px solid #7AC843"
        window.location = 'dashboard.html';
      });
    promise.catch(e => {
      txtEmail.style.border = "1px solid #FF514C";
      txtPassword.style.border = "1px solid #FF514C";
    });
  }
}
