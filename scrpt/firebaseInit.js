var userId;
var notLoggedInHandler = null;
var loggedInHandler = null;

function addNotLoggedInHandler(handler) {
    notLoggedInHandler = handler;
}
function addLoggedInHandler(handler) {
    loggedInHandler = handler;
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
            if (loggedInHandler != null) {
                loggedInHandler(user);
            }

        } else {
            if (notLoggedInHandler == null) {
                window.location = 'signin.html';
            }
            else {
                notLoggedInHandler();
            }
        }
    })
}());