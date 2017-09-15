//Basic Firebase Logic, handles basic login and user checking
//Use addLoggedInHandler(function(user) {}); to launch your other code

var userId;
var notLoggedInHandler = [];
var loggedInHandler = [];

var isMobile = window.matchMedia("max-width: 780px").matches;

function addNotLoggedInHandler(handler) {
    notLoggedInHandler.push(handler);
}
function addLoggedInHandler(handler) {
    loggedInHandler.push(handler);
}

function firebasInit() {

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

        //Checks if user is valid and launches appropriate eventhandlers
        //If no handler for wrong user is registered, the browser is redirected to signin.html

        if (user) {
            userId = firebase.auth().currentUser.uid;
            loggedInHandler.forEach(function (element) {
                element(user);
            });
        } else {
            if (notLoggedInHandler.length > 0) {
                notLoggedInHandler.forEach(function (element) {
                    element(user);
                });

            }
            else {
                window.location = 'signin';
            }
        }
    })
}


//Launches firebaseInit() only if the whole document is loaded

//https://www.sitepoint.com/jquery-document-ready-plain-javascript/
if (document.readyState === "complete" ||(document.readyState !== "loading" && !document.documentElement.doScroll)) {
    firebasInit();
} else {
  document.addEventListener("DOMContentLoaded", firebasInit);
}
