
// Sett Date labels to current dates
setDates(0);

// Difference
var dayDifference = 0;

// SVG for Delete Button
var deleteBtnIcon = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6L16.3,18.7L16.3,18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8C7.4,10.2,7.7,10,8,10c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';

// Get Elements
const nameLabel = document.getElementById('userName');
const mailLabel = document.getElementById('userEmail');
const addWeekBtn = document.getElementById('newWeek');
const previousBtn = document.getElementById('previous');
const allLists = document.getElementsByClassName('taskList');

(function() {

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
      load();
    }
  });

  function clearList() {
    for (var i = 0; i < allLists.length; i++) {
      allLists[i].innerHTML = "";
  }}

  function load() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {

        var userId = firebase.auth().currentUser.uid;
        // Declaring Database Reference
        const dataRef = firebase.database().ref().child('users').child(userId).child('weeks').child(currentWeekString);

        // Retrieving Tasks and appending them to Lists
        dataRef.once('value', function(week) {
          week.forEach(function(day) {
            day.forEach(function(taskid) {

                li = document.createElement('li');
                li.className = "task";

                var check = document.createElement('input');
                check.type = "checkbox";
                check.classList.add("option-input", "checkbox");

                var deleteBtn = document.createElement('button');
                deleteBtn.id = "delete"
                deleteBtn.innerHTML = deleteBtnIcon;
                var p = document.createElement('p');
                p.innerText = taskid.val().taskName;

                if (taskid.val().checked == true) {
                  p.classList.add('toggle');
                  check.checked = true;
                }

                var detailDiv = document.createElement('div');
                detailDiv.classList.add('detail');
                var detailP = document.createElement('p');
                detailP.innerText = taskid.val().taskDesc;
                detailDiv.appendChild(detailP);

                li.appendChild(deleteBtn);
                li.appendChild(check);
                li.appendChild(p);
                li.appendChild(detailDiv);
                li.id = taskid.key;

                var addDay = day.key;

                var rightList = document.getElementById(addDay);
                rightList.appendChild(li);

                // Make Items deletable
                deleteBtn.addEventListener('click', removeTask);
                // Change appearance of checked task
                check.addEventListener('click', taskDone);
                // Show Detail View
                p.addEventListener('click', showDetail);

                // Remove Task
                function removeTask() {
                  var task = this.parentNode;
                  var id = task.id;
                  var list = task.parentNode;

                  list.removeChild(task);
                  dataRef.child(addDay).child(id).remove();
                };

                // Mark Task as done
                function taskDone() {
                  var task = this.parentNode;
                  var id = task.id;
                  var taskText = task.children[2];

                  if (check.checked == true) {
                    taskText.classList.toggle('toggle');
                    dataRef.child(addDay).child(id).update({checked: true});
                  } else {
                    taskText.classList.toggle('toggle');
                    dataRef.child(addDay).child(id).update({checked: false});
                  };
                };

                // Show Detail View
                function showDetail(element) {
                  if (detailDiv.style.opacity == "1") {
                    detailDiv.style.opacity = "0";
                    detailDiv.style.display = "none";
                  } else {
                    detailDiv.style.opacity = "1";
                    detailDiv.style.display = "block";
                  }
                };
            });
        });
      });

      // Getting User Info
      firebase.database().ref().child('users').child(userId).child('info').once('value').then(function(snapshot) {
        var first = snapshot.val().firstname;
        var last = snapshot.val().lastname;
        var mail = snapshot.val().email;

        nameLabel.innerText = first + " " + last;
        mailLabel.innerText = mail;

      })} else {
        console.log("not logged in");
      };
    });
  };

  addWeekBtn.addEventListener('click', function() {
    dayDifference = dayDifference + 7;
    setDates(dayDifference);
    clearList();
    load();
  });
  previousBtn.addEventListener('click', function() {
    dayDifference = dayDifference - 7;
    setDates(dayDifference);
    clearList();
    load();
  });
}());
