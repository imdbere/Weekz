// Difference
var weekOffset = 0;

var userId;
var dataRefSelectedWeek;
var dataRefTasks;
var currentlySelectedWeek;

// SVG for Delete Button
var deleteBtnIcon = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6L16.3,18.7L16.3,18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8C7.4,10.2,7.7,10,8,10c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';

var editBtnIcon = '<img src="res/edit.png">'
var moveBtnIcon = '<img src="res/move.png">'

// Get Elements
var nameLabel = document.getElementById('userName');
var mailLabel = document.getElementById('userEmail');
var addWeekBtn = document.getElementById('newWeek');
var previousBtn = document.getElementById('previous');
var allLists = document.getElementsByClassName('taskList');
var verifyBtn = document.getElementById('verify');
// var context = document.getElementById('contextMenu');

// Edit Menu Elements
var addMenu = document.getElementById('addTask');
var moveMenu = document.getElementById('moveTask');
var day = document.getElementById('whatDay');
var taskName = document.getElementById('taskName');
var taskDesc = document.getElementById('taskDesc');
var addTaskBtn = document.getElementById('addBtn');
var editTaskBtn = document.getElementById('editBtn');
var closeBtn = document.getElementById('closeBtn');
var addTitle = document.getElementById('addTitle');
var editTitle = document.getElementById('editTitle');

const showBubble = document.getElementById('showBubble');
const hideBubble = document.getElementById('hideBubble');
const bubble = document.getElementById('bubble');
const toDoValue = document.getElementById('toDoName');
const toDoAddBtn = document.getElementById('bubbleAdd');
const toDoList = document.getElementById('bubbleList');
const showBubbleMobile = document.getElementById('showBubbleMobile');

// Define Colors
var monColor = "#FF514C";
var tueColor = "#E5E500";
var wedColor = "#F6921E";
var thuColor = "#7AC843";
var friColor = "#3FA8F4";
var satColor = "#662D90";

// Get Lists
var monList = document.getElementById('monList');
var tueList = document.getElementById('tueList');
var wedList = document.getElementById('wedList');
var thuList = document.getElementById('thuList');
var friList = document.getElementById('friList');
var satList = document.getElementById('satList');

document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
      startup();
    }
  };

function startup()
{
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

  //Handle Account Status
  firebase.auth().onAuthStateChanged(user => {
    if(!user) {
      window.location = 'signin.html'; //If User is not logged in, redirect to signin page
    } else {
      if (user.emailVerified) {
        verifyBtn.style.display = "none";
        console.log('verified');

      } else {
        verifyBtn.style.display = "block";
        console.log("not verified");
      }

      userId = firebase.auth().currentUser.uid;
      addGlobalEventListeners();
      loadUserInfo ();
      initFeedback();

      dataRefTasks = firebase.database().ref().child('users').child(userId).child('tasks');

      changeWeek(0);
    }
  });
}
function changeWeek (offset)
{
    weekOffset = offset;
    var currentWeek = new Week(offset);
    currentlySelectedWeek = currentWeek; //Experimental
    dataRefSelectedWeek = firebase.database().ref().child('users').child(userId).child('weeks').child(currentWeek.getWeekID());
    loadAndAddTasks(currentWeek);
}

function addGlobalEventListeners() {

    //Previous-Next Week buttons
    addWeekBtn.addEventListener('click', function () {
        clearLists();
        changeWeek(weekOffset + 1);
    });
    previousBtn.addEventListener('click', function () {
        clearLists();
        changeWeek(weekOffset - 1);
    });

    //Verify E-Mail button
    verifyBtn.addEventListener('click', function () {
        firebase.auth().onAuthStateChanged(function (user) {
            user.sendEmailVerification();
            verifyBtn.innerText = "EMAIL SENT";
        });
    });

    //Open new Task dialog
    var buttons = document.querySelectorAll(".addBtn");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", addButtonClicked);
    }
    // Close New Task Menu
    closeBtn.addEventListener('click', hideAddMenu);

    //TO-DO List
    showBubble.addEventListener('click', function() {
        bubble.style.display = "block";
        hideBubble.style.display = "block";
        sleep(100).then(() => {
          bubble.style.opacity = "1";
        });
      });

      showBubbleMobile.addEventListener('click', function() {
        if (bubble.style.height == "0px") {
          bubble.style.height = "335px";
          console.log('opened');
        } else {
          bubble.style.height = "0px";
          console.log('closed');
        }
      });

      hideBubble.addEventListener('click', function() {
        bubble.style.opacity = "0";
        toDoValue.value = "";
        sleep(100).then(() => {
          bubble.style.display = "none";
          hideBubble.style.display = "none";
        });
      });

      toDoAddBtn.addEventListener('click', function() {
        createToDoItem();
        toDoValue.value = "";
      });
}

//BEGIN HELPER FUNCTIONS
function clearLists() {
    for (var i = 0; i < allLists.length; i++) {
      allLists[i].innerHTML = "";
  }}


// Show Detail View
function showDetail() {
    var detailDiv = this.parentNode.getElementsByClassName("detail")[0];
    if (detailDiv.style.opacity == "1") {
        detailDiv.style.opacity = "0";
        detailDiv.style.display = "none";
    } else {
        detailDiv.style.opacity = "1";
        detailDiv.style.display = "block";
    }
};

// Sleep function
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
};
