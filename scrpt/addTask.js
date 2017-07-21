(function() {

  // SVG for Delete Button
  var deleteBtnIcon = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6L16.3,18.7L16.3,18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8C7.4,10.2,7.7,10,8,10c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';

  // Sleep function
  function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  };

  // List to be added to
  var list = "";

  // Define Colors
  var monColor = "#FF514C";
  var tueColor = "#E5E500";
  var wedColor = "#F6921E";
  var thuColor = "#7AC843";
  var friColor = "#3FA8F4";
  var satColor = "#662D90";

  // Get Elements
  const menu = document.getElementById('addTask');
  const day = document.getElementById('whatDay');
  const taskValue = document.getElementById('taskName');
  const addBtn = document.getElementById('addBtn');
  const closeBtn = document.getElementById('closeBtn');

  // Get Lists
  const monList = document.getElementById('monList');
  const tueList = document.getElementById('tueList');
  const wedList = document.getElementById('wedList');
  const thuList = document.getElementById('thuList');
  const friList = document.getElementById('friList');
  const satList = document.getElementById('satList');

  //-------------------------------------
  //-----Communication with Database-----
  //-------------------------------------

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {

      var userId = firebase.auth().currentUser.uid;
      // Declaring Database Reference
      const dataRef = firebase.database().ref().child('users').child(userId).child('weeks').child('week1');

      var buttons = document.querySelectorAll(".addBtn");
      console.log(buttons);
      var i = 0, length = buttons.length;
      for (i; i < length; i++) {
        if (document.addEventListener) {
        buttons[i].addEventListener("click", function() {
          clicked = this.id;

          // Identify clicked Button
          switch (clicked) {
            case "monAdd":
              day.innerText = "Monday";
              day.style.color = monColor;
              addBtn.style.background = monColor;
              closeBtn.style.background = monColor;
              console.log("Monday");
              list = monList;
              showAddMenu();
            break;
            case "tueAdd":
              day.innerText = "Tuesday";
              day.style.color = tueColor;
              addBtn.style.background = tueColor;
              closeBtn.style.background = tueColor;
              console.log("Tuesday");
              list = tueList;
              showAddMenu();
            break;
            case "wedAdd":
              day.innerText = "Wednesday";
              day.style.color = wedColor;
              addBtn.style.background = wedColor;
              closeBtn.style.background = wedColor;
              console.log("Wednesday");
              list = wedList;
              showAddMenu();
            break;
            case "thuAdd":
              day.innerText = "Thursday";
              day.style.color = thuColor;
              addBtn.style.background = thuColor;
              closeBtn.style.background = thuColor;
              console.log("Thursday");
              list = thuList;
              showAddMenu();
            break;
            case "friAdd":
              day.innerText = "Friday";
              day.style.color = friColor;
              addBtn.style.background = friColor;
              closeBtn.style.background = friColor;
              list = friList;
              console.log("Friday");
              showAddMenu();
            break;
            case "satAdd":
              day.innerText = "Saturday";
              day.style.color = satColor;
              addBtn.style.background = satColor;
              closeBtn.style.background = satColor;
              list = satList;
              console.log("Saturday");
              showAddMenu();
            break;
            default:
        };
      })};
    };

    // Delete Task
    function removeTask() {
      var task = this.parentNode;
      var id = task.id;
      var list = task.parentNode;

      list.removeChild(task);
      dataRef.child(list.id).child(id).remove();
      console.log("deleted");
    };

    // Mark Task as done
    function taskDone() {
      var task = this.parentNode;
      var id = task.id;
      var taskText = task.children[2];
      var status = dataRef.child(list.id).child(id).once('value').then(function(checked) {
        var value = checked.val().checked;
        console.log(value);

        if (value == false) {
          taskText.classList.toggle('toggle');
          dataRef.child(list.id).child(id).update({checked: true});
          console.log("done");
        } else {
          taskText.classList.toggle('toggle');
          dataRef.child(list.id).child(id).update({checked: false});
          console.log("undone");
        };
      });
    };

    addBtn.addEventListener('click', function() {

      if (taskValue.value.trim() == "") {
        taskValue.style.border = "1px solid #FF514C"
      } else {

        li = document.createElement('li');
        li.className = "task";

        var check = document.createElement('input');
        check.type = "checkbox";
        check.classList.add("option-input", "checkbox");

        var deleteBtn = document.createElement('button');
        deleteBtn.id = "delete"
        deleteBtn.innerHTML = deleteBtnIcon;

        var p = document.createElement('p');
        p.innerText = taskValue.value;
        li.appendChild(deleteBtn);
        li.appendChild(check);
        li.appendChild(p);

        var key = dataRef.child(list.id).push().key;
        console.log(key);
        var newEntry = dataRef.child(list.id).child(key).update({taskValue: taskValue.value, checked: false});
        li.id = key;

        list.appendChild(li);

        // Make Items deletable
        deleteBtn.addEventListener('click', removeTask);
        check.addEventListener('click', taskDone)
        hideAddMenu();
      };
    });

    // Open 'New Task' Menu
    function showAddMenu() {
      menu.style.zIndex = "2000";
      sleep(200).then(() => {
        menu.style.opacity = "1";
      });
    };

    // Close 'New Task' Menu
    function hideAddMenu() {
      taskValue.style.border = "none";
      menu.style.opacity = "0";
      taskValue.value = "";
      sleep(300).then(() => {
        menu.style.zIndex = "-1000";
      });
    };

    // Close New Task Menu
    closeBtn.addEventListener('click', hideAddMenu);

    } else {
      console.log("Not logged in");
    };
  });
 }());
