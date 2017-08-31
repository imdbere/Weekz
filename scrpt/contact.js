// Get Elements
var barSignIn = document.getElementById('barSignIn');
var barSignUp = document.getElementById('barSignUp');
var barDash = document.getElementById('barDash');

addLoggedInHandler(function() {
  barDash.style.display = "block";
  barSignIn.style.display = "none";
  barSignUp.style.display = "none";
});

addNotLoggedInHandler(function(){

});

var sendBtn = document.getElementById('submit');

sendBtn.addEventListener('click', function() {
  submit.style.background = '#0BE370';
  submit.innerText = 'SENT';
});
