(function() {
  //Handle Account Status
firebase.auth().onAuthStateChanged(user => {
  if(!user) {
    window.location = 'signin.html'; //If User is not logged in, redirect to signin page
  }
});
}());
