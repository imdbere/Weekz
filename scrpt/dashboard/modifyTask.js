// Edit Task
function editButtonClicked() {

    var item = this.parentNode.parentNode;
    showEditMenu(item);

    editTaskBtn.addEventListener('click', editConfirmButtonClicked);
};
// Open 'New Task' Menu
function showEditMenu(item) {
    addBtn.style.display = "none";
    editBtn.style.display = "block";
    addTitle.style.display = "none";
    editTitle.style.display = "block";
    closeBtn.style.background = "#C4DADE";

    var nameInput = item.children[2];
    var descInput = item.children[5].children[0];
    taskName.value = nameInput.innerText;
    taskDesc.value = descInput.innerText;

    addMenu.style.zIndex = "2000";
    //Confirm Task creation
    addBtn.addEventListener('click', () => editConfirmButtonClicked(item));
    sleep(200).then(() => {
      addMenu.style.opacity = "1";
    });
};

function editConfirmButtonClicked(item)
{
    var listId = item.parentNode.id;
    var id = item.id;
    var nameInput = item.children[2];
    var descInput = item.children[5].children[0];
    var newName = taskName.value;
    var newDesc = taskDesc.value;
    nameInput.innerText = newName;
    descInput.innerText = newDesc;

    var update = dataRefSelectedWeek.child(listId).child(id).update({taskName: newName, taskDesc: newDesc});
    this.removeEventListener('click', arguments.callee, false);
    hideAddMenu();
}
  
// Close 'New Task' Menu
function hideEditMenu() {
    taskName.style.border = "none";
    addMenu.style.opacity = "0";
    sleep(300).then(() => {
        addMenu.style.zIndex = "-1000";
        taskName.value = "";
        taskDesc.value = "";
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
        taskContext.style.display = "none";
        moveMenu.style.display = "none";
        this.style.opacity = 0;
    }
}

//Toggle checkbox
function toggleTaskDone() {
    var task = this.parentNode;
    var thisList = task.parentNode;
    var id = task.id;
    var taskText = task.children[2];
    var status = dataRefSelectedWeek.child(thisList.id).child(id).once('value').then(function(checked) {
    var value = checked.val().checked;
    taskText.classList.toggle('toggle');
    dataRefSelectedWeek.child(thisList.id).child(id).update({checked: !value});

    });
  }

//Deletes Task
function removeTask() {
    var task = this.parentNode.parentNode;
    var id = task.id;
    var list = task.parentNode;
    var listId = list.id;

    if (id == "bubbleList") //Necessary Adjustments for bubbleList
    {
        listId = "bubbleList";
        id = this.parentNode.id;
        list = task;
        task = this.parentNode;
    }
    

    list.removeChild(task);
    dataRefSelectedWeek.child(listId).child(id).remove();
}

