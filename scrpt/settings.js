
// Get Elements

var changeNameBtn = document.getElementById('changeName');
var changePassBtn = document.getElementById('changePass');
var changeMailBtn = document.getElementById('changeMail');
var nameBox = document.getElementById('nameBox');
var passBox = document.getElementById('passBox');
var mailBox = document.getElementById('mailBox');
var submitName = document.getElementById('nameButton');
var submitPass = document.getElementById('passButton');
var submitMail = document.getElementById('mailButton');

var firstInput = document.getElementById('newFirst');
var lastInput = document.getElementById('newLast');

var passwordPass = document.getElementById('currentPassPass');
var newPass1 = document.getElementById('newPass1');
var newPass2 = document.getElementById('newPass2');

var emailPass = document.getElementById('currentPassMail');
var newMail1 = document.getElementById('newMail1');
var newMail2 = document.getElementById('newMail2');

var dataRef;
var user;

function resetStuff() {
  firstInput.value = '';
  lastInput.value = '';

  passwordPass.value = '';
  newPass1.value = '';
  newPass2.value = '';

  emailPass.value = '';
  newMail1.value = '';
  newMail2.value = '';

  submitName.innerText = 'CHANGE'
  submitPass.innerText = 'CHANGE'
  submitMail.innerText = 'CHANGE'

  submitName.style.background = '#FF5052';
  submitPass.style.background = '#9013FE';
  submitMail.style.background = '#3FA8F4';
}

addLoggedInHandler(function()
{
    dataRef = firebase.database().ref().child('users').child(userId);
    user = firebase.auth().currentUser;

});

addNotLoggedInHandler(function() {
  window.location = "signin";
});

function getUserInfo() {
    // Getting User Info
    dataRef.child('info').once('value').then(function (snapshot) {
        var first = snapshot.val().firstname;
        var last = snapshot.val().lastname;
        var mail = snapshot.val().email;
        //Insert html-specific code

    });
}

function changeName(firstname, lastname)
{
    dataRef.child('info').update({firstname: firstname, lastname: lastname}).then(function() {
      submitName.style.background = '#0BE370';
      submitName.innerText = 'DONE'
    });
}

function changePassword (oldPass, newPass)
{
    reauthenticate(oldPass).then(function()
    {
        passwordPass.style.border = 'none';
        user.updatePassword(newPass).then(function() {
          submitPass.style.background = '#0BE370';
          submitPass.innerText = 'DONE'
        });
    }).catch (function(e){
        passwordPass.style.border = '1px solid red';
    });
}

function changeEmail(oldPass, newEmail)
{
    reauthenticate(oldPass).then(function()
    {
        emailPass.style.border = 'none';
        user.updateEmail(newEmail);
        dataRef.child('info').update({email: newEmail}).then(function() {
          submitMail.style.background = '#0BE370';
          submitMail.innerText = 'DONE'
        });
    }).catch (function(e){
        emailPass.style.border = '1px solid red';
    });

}

function reauthenticate(pass)
{
    var credential = firebase.auth.EmailAuthProvider.credential(user.email, pass);
    return user.reauthenticateWithCredential(credential);
}

changeNameBtn.addEventListener('click', function() {
  resetStuff();

  changeNameBtn.style.background = '#FAFAFA';
  changePassBtn.style.background = 'none';
  changeMailBtn.style.background = 'none';

  nameBox.style.display = 'block';
  passBox.style.display = 'none';
  mailBox.style.display = 'none';
})

submitName.addEventListener('click', function() {
  var firstname = firstInput.value;
  var lastname = lastInput.value;

  if (firstname == "" || lastname == "") {
    firstInput.style.border = '1px solid red';
    lastInput.style.border = '1px solid red';
  } else {
    firstInput.style.border = 'none';
    lastInput.style.border = 'none';

    changeName(firstname, lastname);
  }
})

changePassBtn.addEventListener('click', function() {
  resetStuff();

  changeNameBtn.style.background = 'none';
  changePassBtn.style.background = '#FAFAFA';
  changeMailBtn.style.background = 'none';

  nameBox.style.display = 'none';
  passBox.style.display = 'block';
  mailBox.style.display = 'none';
})

submitPass.addEventListener('click', function() {
  var currentPass = passwordPass.value;
  var pass1 = newPass1.value;
  var pass2 = newPass2.value;

  if (pass1 != pass2 || pass1 == "" || pass2 == "") {
    newPass1.style.border = '1px solid red';
    newPass2.style.border = '1px solid red';
  } else {
    newPass1.style.border = 'none';
    newPass2.style.border = 'none';

    changePassword(currentPass, pass2);
  }
})

changeMailBtn.addEventListener('click', function() {
  resetStuff();

  changeNameBtn.style.background = 'none';
  changePassBtn.style.background = 'none';
  changeMailBtn.style.background = '#FAFAFA';

  nameBox.style.display = 'none';
  passBox.style.display = 'none';
  mailBox.style.display = 'block';
})

submitMail.addEventListener('click', function() {
  var currentPass = emailPass.value;
  var mail1 = newMail1.value;
  var mail2 = newMail2.value;

  if (mail1 != mail2 || mail1 == "" || mail2 == "") {
    newMail1.style.border = '1px solid red';
    newMail2.style.border = '1px solid red';
  } else {
    newMail1.style.border = 'none';
    newMail2.style.border = 'none';

    changeEmail(currentPass, mail2);
  }
})
