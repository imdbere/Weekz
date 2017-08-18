var userId;
var notLoggedInHandler = [];
var loggedInHandler = [];

function addNotLoggedInHandler(handler) {
    notLoggedInHandler.push(handler);
}
function addLoggedInHandler(handler) {
    loggedInHandler.push(handler);
}

(function () {

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

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            userId = firebase.auth().currentUser.uid;
            loggedInHandler.forEach(function(element)
            {
                element(user);
            });
        } else {
            if (notLoggedInHandler.length > 0) {
                window.location = 'signin.html';
            }
            else {
                notLoggedInHandler.forEach(function(element)
                {
                    element(user);
                });
            }
        }
    })
}());