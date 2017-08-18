function addButtonClicked()
{
  clicked = this.id;
  // Identify clicked Button
  var color;
  switch (clicked) {
    case "monAdd":
      showAddMenu(monList, monColor, "Monday");
      break;
    case "tueAdd":
      showAddMenu(tueList, tueColor, "Tuesday");
      break;
    case "wedAdd":
      showAddMenu(wedList, wedColor, "Wednesday");
      break;
    case "thuAdd":
      showAddMenu(thuList, thuColor, "Thursday");
      break;
    case "friAdd":
      showAddMenu(friList, friColor, "Friday");
      break;
    case "satAdd":
      showAddMenu(satList, satColor, "Saturday");
      break;
  }
}

// Open 'New Task' Menu
function showAddMenu(list, color, text) {
  
    addBtn.style.display = "block";
    editBtn.style.display = "none";
    addTitle.style.display = "block";
    editTitle.style.display = "none";
  
    day.innerText = text;
    day.style.color = color;
    addBtn.style.background = color;
    closeBtn.style.background = color;
    addMenu.style.zIndex = "2000";
    //Confirm Task creation
    addBtn.onclick =  () => addConfirmButtonClicked(list);
    sleep(200).then(() => {
      addMenu.style.opacity = "1";
    });
  };

function addConfirmButtonClicked(list) {
  if (taskName.value.trim() == "") {
    taskName.style.border = "1px solid #FF514C"
    taskDesc.style.border = "none"
  } else if (taskDesc.value.trim() == "") {
    taskDesc.style.border = "1px solid #FF514C"
    taskName.style.border = "none"
  } else {

    var li = generateTask(taskName.value, taskDesc.value, false);
    var key = dataRefSelectedWeek.child(list.id).push().key;

    var newEntry = dataRefSelectedWeek.child(list.id).child(key).update({ taskName: taskName.value, taskDesc: taskDesc.value, checked: false });
    li.id = key;

    list.appendChild(li);
    hideAddMenu();
  }
}

// Close 'New Task' Menu
function hideAddMenu() {
  taskName.style.border = "none";
  addMenu.style.opacity = "0";
  sleep(300).then(() => {
    addMenu.style.zIndex = "-1000";
    taskName.value = "";
    taskDesc.value = "";
  });
};

function createToDoItem() {
  if (toDoValue.value.trim() == "") {
    toDoValue.style.border = "1px solid #FF514C";
  } else {
    toDoValue.style.border = "none";

    var li = generateBubbleTask(toDoValue.value, false);
    var key = dataRefSelectedWeek.child('toDo').push().key;
    li.id = key;

    var newEntry = dataRefSelectedWeek.child('bubbleList').child(key).update({taskName: toDoValue.value});

    toDoList.appendChild(li);
  }
}







