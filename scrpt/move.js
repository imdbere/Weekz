
// Move Task
function moveTask() {

  var userId = firebase.auth().currentUser.uid;
  var selectedWeek = setDates(dayDifference, true);

  const dataRef = firebase.database().ref().child('users').child(userId).child('weeks');

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
    var thisList = task.parentNode;
    console.log(thisList.id);
    var id = task.id;
    var taskText = task.children[2];
    var status = dataRef.child(selectedWeek).child(thisList.id).child(id).once('value').then(function(checked) {
      console.log(checked.val());
      var value = checked.val().checked;
      //console.log(value);

      if (value == false) {
        taskText.classList.toggle('toggle');
        dataRef.child(selectedWeek).child(thisList.id).child(id).update({checked: true});
        value = true;
      } else {
        taskText.classList.toggle('toggle');
        dataRef.child(selectedWeek).child(thisList.id).child(id).update({checked: false});
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

  var item = this.parentNode.parentNode;
  var oldList = item.parentNode;
  var oldListId = item.parentNode.id;
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
        var wasChecked = item.children[1].checked;

        console.log(wasChecked);

        oldList.removeChild(item);

        li = document.createElement('li');
        li.className = "task";

        var check = document.createElement('input');
        check.type = "checkbox";
        check.classList.add("option-input", "checkbox");
        check.checked = wasChecked;

        var contextBtn = document.createElement('button');
        contextBtn.id = "context";
        contextBtn.style.background = "context.png";

        var p = document.createElement('p');
        p.innerText = oldTask;

        if (wasChecked == true) {
          p.classList.add('toggle');
        }

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

        var key = dataRef.child(moveTo).push().key;
        li.id = key;

        dataRef.child(selectedWeek).child(oldListId).child(item.id).remove();
        dataRef.child(selectedWeek).child(moveTo).child(key).update({taskName: oldTask, taskDesc: oldDesc, checked: wasChecked});

        newList = document.getElementById(moveTo);
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

function changeNext() {
    this.style.display = "none";
    this.parentNode.children[0].style.display = "inline-block";

    var nextSelectedWeek = setDates(dayDifference+7, false);

    var item = this.parentNode.parentNode;
    console.log(item);
    var oldList = item.parentNode;
    console.log(oldList);
    var oldListId = item.parentNode.id;
    console.log(oldListId);
    var dayPicker = item.children[4];

    var daySelectButtons = document.querySelectorAll(".moveDay");
    for (var i = 0; i < daySelectButtons.length; i++) {
      if (document.addEventListener) {
        daySelectButtons[i].addEventListener('click', function() {
          var moveTo = this.name;

          var oldTask = item.children[2].innerText;
          var oldDesc = item.children[5].children[0].innerText;
          var wasChecked = item.children[1].checked;

          oldList.removeChild(item);

          var key = dataRef.child(moveTo).push().key;
          li.id = key;

          dataRef.child(selectedWeek).child(oldListId).child(item.id).remove();
          dataRef.child(nextSelectedWeek).child(moveTo).child(key).update({taskName: oldTask, taskDesc: oldDesc, checked: wasChecked});
        });
      };
    };

}

function changeLast() {
    this.style.display = "none";
    this.parentNode.children[7].style.display = "block";

    setDates(dayDifference, false);
    moveTask();
}
