// Edit Task
function editButtonClicked() {

    var item = this.parentNode.parentNode;
    showEditMenu(item);
};
// Open 'New Task' Menu
function showEditMenu(item1) {
    addBtn.style.display = "none";
    editBtn.style.display = "block";
    addTitle.style.display = "none";
    editTitle.style.display = "block";
    closeBtn.style.background = "#C4DADE";

    var nameInput = item1.children[3];
    var descInput = item1.children[6].children[0];
    taskName.value = nameInput.innerText;
    taskDesc.value = descInput.innerText;

    addMenu.style.zIndex = "2000";
    //Confirm Task creation
    editBtn.onclick = () => editConfirmButtonClicked(item1);
    sleep(200).then(() => {
      addMenu.style.opacity = "1";
    });
};

function editConfirmButtonClicked(item)
{
    var listId = item.parentNode.id;
    console.log(listId);
    var id = item.id;
    console.log(id);
    var nameInput = item.children[3];
    var descInput = item.children[6].children[0];
    var newName = taskName.value;
    var newDesc = taskDesc.value;
    nameInput.innerText = newName;
    descInput.innerText = newDesc;

    console.log(id);

    var update = dataRefTasks.child(id).update({ taskName: newName, taskDesc: newDesc });
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
    var taskContext = task.children[4];
    var moveTask = task.children[5];

    if (taskContext.style.display == "none") {
        taskContext.style.display = "block";
        this.style.opacity = 1;
    } else {
        taskContext.style.display = "none";
        moveTask.style.display = "none";
        this.style.opacity = 0;
    }
}

//Toggle checkbox
function toggleTaskDone() {
    var task = this.parentNode;
    var thisList = task.parentNode;
    var id = task.id;
    var taskText = task.children[3];
    console.log(dataRefTasks);
    var status = dataRefTasks.child(id).once('value').then(function(checked) {
    var value = checked.val().checked;
    taskText.classList.toggle('toggle');
    var update = dataRefTasks.child(id).update({checked: !value});

  });
}

//Deletes Task
function removeTask() {
    var task = this.parentNode.parentNode;
    console.log(task);
    var id = task.id;
    console.log(id);
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
    dataRefTasks.child(id).remove();
    dataRefSelectedWeek.child(listId).child(id).remove();
}
