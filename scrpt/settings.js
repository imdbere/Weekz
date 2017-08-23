
var dataRef;
var user;

addLoggedInHandler(function()
{
    dataRef = firebase.database().ref().child('users').child(userId);
    user = firebase.auth().currentUser;

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
    dataRef.child('info').update({firstname: firstname, lastname: lastname});
}

function changePassword (oldPass, newPass)
{
    reauthenticate(oldPass).then(function()
    {
        user.updatePassword(newPass);
    }).catch (function(e){
        console.log
    });
}

function changeEmail(oldpass, newEmail)
{
    reauthenticate(oldPass).then(function()
    {
        user.updateEmail(newEmail);
    }).catch (function(e){
        
    });
    
}

function reauthenticate(pass)
{
    var credential = firebase.auth.EmailAuthProvider.credential(user.email, pass);
    return user.reauthenticateWithCredential(credential);
}
