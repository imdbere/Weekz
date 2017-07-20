(function() {

  // SVG for Delete Button
  var deleteBtnIcon = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6L16.3,18.7L16.3,18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8C7.4,10.2,7.7,10,8,10c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';

  // Get Elements
  const nameLabel = document.getElementById('userName');
  const mailLabel = document.getElementById('userEmail');

  // Remove Task
  function removeTask() {
    var task = this.parentNode;
    var list = task.parentNode;

    list.removeChild(task);
  };

  // Mark Task as done
  function taskDone() {
    var task = this.parentNode;
    var taskText = task.children[2];

    taskText.classList.toggle('toggle');
  };

  //-------------------------------------
  //-----Communication with Database-----
  //-------------------------------------

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var userId = firebase.auth().currentUser.uid;

      // Declaring Database Reference
      const dataRef = firebase.database().ref().child('users').child(userId).child('weeks').child('week1');

      // Retrieving Tasks and appending them to Lists
      dataRef.once('value', function(week) {
        week.forEach(function(day) {
          day.forEach(function(taskid) {
            taskid.forEach(function(task) {
              console.log(taskid.val());

              li = document.createElement('li');
              li.className = "task";

              var check = document.createElement('input');
              check.type = "checkbox";
              check.classList.add("option-input", "checkbox");

              var deleteBtn = document.createElement('button');
              deleteBtn.id = "delete"
              deleteBtn.innerHTML = deleteBtnIcon;

              var p = document.createElement('p');
              p.innerText = task.val();
              li.appendChild(deleteBtn);
              li.appendChild(check);
              li.appendChild(p);

              var addDay = day.key;
              console.log(addDay);

              var rightList = document.getElementById(addDay);
              console.log(rightList);

              rightList.appendChild(li);

              // Make Items deletable
              deleteBtn.addEventListener('click', removeTask);
              // Change appearance of checked task
              check.addEventListener('click', taskDone)
            });
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

  //-------------------------------------
  //---------Client Side Handling--------
  //-------------------------------------

}());
