
function loadUserInfo ()
{
  // Getting User Info
  firebase.database().ref().child('users').child(userId).child('info').once('value').then(function(snapshot) {
    var first = snapshot.val().firstname;
    var last = snapshot.val().lastname;
    var mail = snapshot.val().email;

    nameLabel.innerText = first + " " + last;
    mailLabel.innerText = mail;

  });
}

function loadAndAddTasks(week) {
  for (var i = 0; i < 6; i++) {
    var id = "date" + (i + 1);
    var dateId = document.getElementById(id);
    dateId.innerText = week.getDayAsString(i);
  }
  NProgress.start();
  NProgress.configure({ minimum: 0.1 });

  // Retrieving Tasks and appending them to Lists
  dataRefSelectedWeek.once('value', function (week) {
    week.forEach(function (day) {
      day.forEach(function (taskid) {
        var task = taskid.key;
        var data;

        dataRefTasks.child(task).once('value', function(snap) {
          data = snap.val();
        }).then( function() {
          if (day.key == "bubbleList") {
            var li = generateBubbleTask(data.taskName, data.checked);
          }
          else
          {
            var li = generateTask(data.taskName, data.taskDesc, data.checked);
          }

          li.id = task;
          var addDay = day.key;
          var rightList = document.getElementById(addDay);
          rightList.appendChild(li);
        });
      });
    });
  }).then(function () {
    NProgress.done();
  });
}
