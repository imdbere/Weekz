
// Move Task
function moveTask() {

  var userId = firebase.auth().currentUser.uid;
  var selectedWeek = setDates(dayDifference);

  const dataRef = firebase.database().ref().child('users').child(userId).child('weeks').child(selectedWeek);

  // Delete Task
  function removeTask() {
    var task = this.parentNode.parentNode;
    var id = task.id;
    var list = task.parentNode;

    list.removeChild(task);
    dataRef.child(list.id).child(id).remove();
  };

  // Edit Task
  function editTask() {
    closeBtn.style.background = "#C4DADE";
    addTaskBtn.style.display = "none";
    editTaskBtn.style.display = "block";

    menu.children[0].children[1].children[0].innerText = "Edit your Task";
    var item = this.parentNode.parentNode;
    var listId = item.parentNode.id;
    console.log(listId);
    console.log(item);
    var id = item.id;
    var name = item.children[2].innerText;
    var desc = item.children[4].children[0].innerText;

    taskName.value = name;
    taskDesc.value = desc;
    showAddMenu();

    editTaskBtn.addEventListener('click', function() {
      console.log(item.children[2].innerText);
      var newName = taskName.value;
      var newDesc = taskDesc.value;
      console.log(newName);
      item.children[2].innerText = newName;
      item.children[4].children[0].innerText = newDesc;

      var update = dataRef.child(listId).child(id).update({taskName: newName, taskDesc: newDesc});
      hideAddMenu();
    });
  };

  // Show or hide context menu
  function toggleContext() {
    var task = this.parentNode;
    var id = task.id;
    var taskContext = task.children[3];

    if (taskContext.style.display == "none") {
      taskContext.style.display = "block";
      this.style.opacity = 1;
    } else {
      taskContext.style.display = "none"
      this.style.opacity = 0;
    }
  };

  // Mark Task as done
  function taskDone() {
    console.log("done");
    var task = this.parentNode;
    var id = task.id;
    var taskText = task.children[2];
    var status = dataRef.child(list.id).child(id).once('value').then(function(checked) {
      var value = checked.val().checked;
      console.log(value);

      if (value == false) {
        taskText.classList.toggle('toggle');
        dataRef.child(list.id).child(id).update({checked: true});
        value = true;
      } else {
        taskText.classList.toggle('toggle');
        dataRef.child(list.id).child(id).update({checked: false});
        value = false;
      };
    });
  };

  // Show Detail View
  function showDetail() {
    var item = this.parentNode
    console.log(item);
    var detailView = item.children[4];
    console.log(detailView);
    if (detailView.style.opacity == "1") {
      detailView.style.opacity = "0";
      detailView.style.display = "none";
    } else {
      detailView.style.opacity = "1";
      detailView.style.display = "block";
    }
  };

  var item = this.parentNode.parentNode
  var oldList = item.parentNode;
  console.log(oldList);
  var oldListId = item.parentNode.id;
  console.log(oldListId);
  var dayPicker = item.children[4];

  if (dayPicker.style.display == "none") {
    dayPicker.style.display = "block";
  } else {
    dayPicker.style.display = "none";
  };

  var daySelectButtons = document.querySelectorAll(".moveDay");
  for (var i = 0; i < daySelectButtons.length; i++) {
    if (document.addEventListener) {
      daySelectButtons[i].addEventListener('click', function() {
        var moveTo = this.name;

        var oldTask = item.children[2].innerText;
        var oldDesc = item.children[5].children[0].innerText;

        oldList.removeChild(item);

        li = document.createElement('li');
        li.className = "task";

        var check = document.createElement('input');
        check.type = "checkbox";
        check.classList.add("option-input", "checkbox");

        var contextBtn = document.createElement('button');
        contextBtn.id = "context";
        contextBtn.style.background = "context.png";

        var p = document.createElement('p');
        p.innerText = oldTask;

        var detailDiv = document.createElement('div');
        detailDiv.classList.add('detail');
        var detailP = document.createElement('p');
        detailP.innerText = oldDesc;
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

        contextDiv.appendChild(deleteBtn);
        contextDiv.appendChild(editBtn);
        contextDiv.appendChild(moveBtn);

        li.appendChild(contextBtn);
        li.appendChild(check);
        li.appendChild(p);
        li.appendChild(contextDiv);
        li.appendChild(moveMenu);
        li.appendChild(detailDiv);
        console.log(li);

        var key = dataRef.child(moveTo).push().key;
        li.id = key;

        dataRef.child(oldListId).child(item.id).remove();
        dataRef.child(moveTo).child(key).update({taskName: oldTask, taskDesc: oldDesc, checked: false});

        newList = document.getElementById(moveTo);
        console.log(newList);
        newList.appendChild(li);

        // Change appearance of checked task
        check.addEventListener('click', taskDone);
        // Show Detail View
        p.addEventListener('click', showDetail);

        // Open Context Menu and configure its buttons
        contextBtn.addEventListener('click', toggleContext);
          deleteBtn.addEventListener('click', removeTask);
          editBtn.addEventListener('click', editTask);
          moveBtn.addEventListener('click', moveTask);
      });
    };
  };
};
