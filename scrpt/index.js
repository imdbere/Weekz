
  // Get Elements
var barSignIn = document.getElementById('barSignIn');
var barSignUp = document.getElementById('barSignUp');
var barDash = document.getElementById('barDash');

addLoggedInHandler(function()
{
    barDash.style.display = "block";
    barSignIn.style.display = "none";
    barSignUp.style.display = "none";
    var a = document.getElementById("getStarted");
    a.href = "dashboard.html"

});

addNotLoggedInHandler(function(){
  
});
