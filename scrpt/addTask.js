
// Open 'New Task' Menu
function showAddMenu() {
  addMenu.style.zIndex = "2000";
  sleep(200).then(() => {
    addMenu.style.opacity = "1";
  });
};

// Close 'New Task' Menu
function hideAddMenu() {
  taskName.style.border = "none";
  addMenu.style.opacity = "0";
  sleep(300).then(() => {
    addBtn.style.display = "block";
    editBtn.style.display = "none";
    addTitle.style.display = "block";
    editTitle.style.display = "none";
    addMenu.style.zIndex = "-1000";
    taskName.value = "";
    taskDesc.value = "";
  });
};

(function() {

  // SVG for Delete Button
  var deleteBtnIcon = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6L16.3,18.7L16.3,18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8C7.4,10.2,7.7,10,8,10c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';

  var editBtnIcon = '<img src="res/edit.png">'
  var moveBtnIcon = '<img src="res/move.png">'

  // Define Colors
  var monColor = "#FF514C";
  var tueColor = "#E5E500";
  var wedColor = "#F6921E";
  var thuColor = "#7AC843";
  var friColor = "#3FA8F4";
  var satColor = "#662D90";

  // Get Elements
  var addMenu = document.getElementById('addTask');
  var moveMenu = document.getElementById('moveTask');
  var day = document.getElementById('whatDay');
  var taskName = document.getElementById('taskName');
  var taskDesc = document.getElementById('taskDesc');
  var addBtn = document.getElementById('addBtn');
  var editBtn = document.getElementById('editBtn');
  var closeBtn = document.getElementById('closeBtn');
  var addTitle = document.getElementById('addTitle');
  var editTitle = document.getElementById('editTitle');

  // Get Lists
  var monList = document.getElementById('monList');
  var tueList = document.getElementById('tueList');
  var wedList = document.getElementById('wedList');
  var thuList = document.getElementById('thuList');
  var friList = document.getElementById('friList');
  var satList = document.getElementById('satList');

  //-------------------------------------
  //-----Communication with Database-----
  //-------------------------------------

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {

      var userId = firebase.auth().currentUser.uid;
      var selectedWeek = setDates(dayDifference);

      var dataRef = firebase.database().ref().child('users').child(userId).child('weeks');

      var buttons = document.querySelectorAll(".addBtn");

      var i = 0, length = buttons.length;
      for (i; i < length; i++) {
        if (document.addEventListener) {
        buttons[i].addEventListener("click", function() {
          clicked = this.id;
          selectedWeek = setDates(dayDifference);

          // Identify clicked Button
          switch (clicked) {
            case "monAdd":
              day.innerText = "Monday";
              day.style.color = monColor;
              addBtn.style.background = monColor;
              closeBtn.style.background = monColor;
              list = monList;
              showAddMenu();
            break;
            case "tueAdd":
              day.innerText = "Tuesday";
              day.style.color = tueColor;
              addBtn.style.background = tueColor;
              closeBtn.style.background = tueColor;
              list = tueList;
              showAddMenu();
            break;
            case "wedAdd":
              day.innerText = "Wednesday";
              day.style.color = wedColor;
              addBtn.style.background = wedColor;
              closeBtn.style.background = wedColor;
              list = wedList;
              showAddMenu();
            break;
            case "thuAdd":
              day.innerText = "Thursday";
              day.style.color = thuColor;
              addBtn.style.background = thuColor;
              closeBtn.style.background = thuColor;
              list = thuList;
              showAddMenu();
            break;
            case "friAdd":
              day.innerText = "Friday";
              day.style.color = friColor;
              addBtn.style.background = friColor;
              closeBtn.style.background = friColor;
              list = friList;
              showAddMenu();
            break;
            case "satAdd":
              day.innerText = "Saturday";
              day.style.color = satColor;
              addBtn.style.background = satColor;
              closeBtn.style.background = satColor;
              list = satList;
              showAddMenu();
            break;
            default:
        };
      })};
    };

    // Delete Task
    function removeTask() {
      var task = this.parentNode.parentNode;
      var id = task.id;
      var list = task.parentNode;

      list.removeChild(task);
      dataRef.child(selectedWeek).child(list.id).child(id).remove();
    };

    // Show or hide context menu
    function toggleContext() {
      var task = this.parentNode;
      var id = task.id;
      var taskContext = task.children[3];
      var thisMoveMenu = task.children[4];

      if (taskContext.style.display == "none") {
        taskContext.style.display = "block";
        this.style.opacity = 1;
      } else {
        taskContext.style.display = "none";
        thisMoveMenu.style.display = "none";
        this.style.opacity = 0;
      }
    };

    // Mark Task as done
    function taskDone() {
      console.log("done");
      var task = this.parentNode;
      var id = task.id;
      var taskText = task.children[2];
      var status = dataRef.child(selectedWeek).child(list.id).child(id).once('value').then(function(checked) {
        var value = checked.val().checked;
        console.log(value);

        if (value == false) {
          taskText.classList.toggle('toggle');
          dataRef.child(selectedWeek).child(list.id).child(id).update({checked: true});
          value = true;
        } else {
          taskText.classList.toggle('toggle');
          dataRef.child(selectedWeek).child(list.id).child(id).update({checked: false});
          value = false;
        };
      });
    };

    // Show Detail View
    function showDetail() {
      var item = this.parentNode;
      var detailView = item.children[5];
      if (detailView.style.opacity == "1") {
        detailView.style.opacity = "0";
        detailView.style.display = "none";
      } else {
        detailView.style.opacity = "1";
        detailView.style.display = "block";
      }
    };

    addBtn.addEventListener('click', function() {

      if (taskName.value.trim() == "") {
        taskName.style.border = "1px solid #FF514C"
        taskDesc.style.border = "none"
      } else if (taskDesc.value.trim() == "") {
        taskDesc.style.border = "1px solid #FF514C"
        taskName.style.border = "none"
      } else {

        li = document.createElement('li');
        li.className = "task";

        var check = document.createElement('input');
        check.type = "checkbox";
        check.classList.add("option-input", "checkbox");

        var contextBtn = document.createElement('button');
        contextBtn.id = "context";
        contextBtn.style.background = "context.png";

        var p = document.createElement('p');
        p.innerText = taskName.value;

        var detailDiv = document.createElement('div');
        detailDiv.classList.add('detail');
        var detailP = document.createElement('p');
        detailP.innerText = taskDesc.value;
        detailDiv.appendChild(detailP);

        var contextDiv = document.createElement('div');
        contextDiv.classList.add('contextMenu');
        contextDiv.style.display = "none";

          var deleteBtn = document.createElement('button');
          deleteBtn.id = "deleteNew"
          deleteBtn.innerHTML = deleteBtnIcon;

          var editBtn = document.createElement('button');
          editBtn.id = "edit";
          editBtn.innerHTML = editBtnIcon;

          var moveBtn = document.createElement('button')
          moveBtn.id = "move";
          moveBtn.innerHTML = moveBtnIcon;

        var moveMenu = document.createElement('div');
        moveMenu.classList.add('moveTask');
        moveMenu.style.display = "none";

          var lastWeekBtn = document.createElement('button');
          lastWeekBtn.classList.add('switch');
          lastWeekBtn.id = "moveLast";
          lastWeekBtn.style.display = "none";
          var lastWeekIcon = document.createElement('div');
          lastWeekIcon.classList.add('triangle');
          lastWeekBtn.appendChild(lastWeekIcon);
          moveMenu.appendChild(lastWeekBtn);

          var moveId = ["moveMon", "moveTue", "moveWed", "moveThu", "moveFri", "moveSat"];
          var moveName = ["monList", "tueList", "wedList", "thuList", "friList", "satList"];
          var moveLetter = ["M", "T", "W", "T", "F", "S"]
          for (var i = 0; i < moveId.length; i++) {
            var moveDayBtn = document.createElement('button');
            moveDayBtn.classList.add('moveDay');
            moveDayBtn.id = moveId[i];
            moveDayBtn.name = moveName[i];
            moveDayBtn.innerText = moveLetter[i];
            moveMenu.appendChild(moveDayBtn);
          };

          var nextWeekBtn = document.createElement('button');
          nextWeekBtn.classList.add('switch');
          nextWeekBtn.id = "moveNext";
          nextWeekBtn.style.display = "block";
          var nextWeekIcon = document.createElement('div');
          nextWeekIcon.classList.add('triangle');
          nextWeekBtn.appendChild(nextWeekIcon);
          moveMenu.appendChild(nextWeekBtn);

        contextDiv.appendChild(deleteBtn);
        contextDiv.appendChild(editBtn);
        contextDiv.appendChild(moveBtn);

        li.appendChild(contextBtn);
        li.appendChild(check);
        li.appendChild(p);
        li.appendChild(contextDiv);
        li.appendChild(moveMenu);
        li.appendChild(detailDiv);

        var key = dataRef.child(selectedWeek).child(list.id).push().key;

        var newEntry = dataRef.child(selectedWeek).child(list.id).child(key).update({taskName: taskName.value, taskDesc: taskDesc.value, checked: false});
        li.id = key;

        list.appendChild(li);

        // Change appearance of checked task
        check.addEventListener('click', taskDone);
        // Show Detail View
        p.addEventListener('click', showDetail);

        // Open Context Menu and configure its buttons
        contextBtn.addEventListener('click', toggleContext);
          deleteBtn.addEventListener('click', removeTask);
          editBtn.addEventListener('click', editTask);
          moveBtn.addEventListener('click', moveTask);

        hideAddMenu();
      };
    });

    // Close New Task Menu
    closeBtn.addEventListener('click', hideAddMenu);

    } else {
      console.log("Not logged in");
    };
  });
 }());
