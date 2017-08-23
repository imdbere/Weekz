// Edit Task
function editButtonClicked() {

    var item = this.parentNode.parentNode;
    showEditMenu(item);
};
// Open 'New Task' Menu
function showEditMenu(item) {
    addBtn.style.display = "none";
    editBtn.style.display = "block";
    addTitle.style.display = "none";
    editTitle.style.display = "block";
    closeBtn.style.background = "#C4DADE";

    var projectId = item.projectId;
    var projectRadio = document.getElementById(projectId);
    projectRadio.checked = true;

    var nameInput = item.getElementsByClassName('taskText')[0];
    var descInput = item.getElementsByClassName('detail')[0].firstChild;
    taskName.value = nameInput.innerText;
    taskDesc.value = descInput.innerText;

    addMenu.style.zIndex = "2000";
    //Confirm Task creation
    editBtn.onclick = () => editConfirmButtonClicked(item);
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
    var nameInput = item.getElementsByClassName('taskText')[0];
    var descInput = item.getElementsByClassName('detail')[0].firstChild;
    var newName = taskName.value;
    var newDesc = taskDesc.value;
    nameInput.innerText = newName;
    descInput.innerText = newDesc;


    if (projectId != "noProject") {
        var dot = item.getElementsByClassName("dot")[0];
        var projectId = document.querySelector('input[name="project"]:checked').id;

        dot.className = "";
        dot.classList.add("dot");

        var oldProjectId = dot.name;
        console.log(oldProjectId);

        var project = document.querySelector('label[for=' + projectId + ']');
        var projectColor = project.children[0].classList[1];
        dot.classList.add(projectColor);
        var projectEntry = dataRefProject.child(projectId).child('tasks').child(id).set("");
    }

    var update = dataRefTasks.child(id).update({ taskName: newName, taskDesc: newDesc, project: projectId });
    var updateNewProject = dataRefProject.child(projectId).child('tasks').child(id).set('');
    var updateOldProject = dataRefProject.child(oldProjectId).child('tasks').child(id).remove();

    dot.name = projectId;

    dataRefProject.child(dot.name).child('info').once('value', function(newData) {
      item.getElementsByClassName('taskProjectTitle')[0].innerText = newData.val().projectTitle;
    });

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
    var taskContext = task.getElementsByClassName('contextMenu')[0];
    var moveTask = task.getElementsByClassName('moveTask')[0];

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
    var taskText = task.getElementsByClassName('taskText')[0];
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
    var id = task.id;
    var projectId = task.projectId;
    console.log(projectId);
    var list = task.parentNode;
    var listId = list.id;

    if (id == "bubbleList") //Necessary Adjustments for bubbleList
    {
        listId = "bubbleList";
        id = this.parentNode.id;
        list = task;
        task = this.parentNode;
    }

    dataRefTasks.child(id).remove();
    dataRefSelectedWeek.child(listId).child(id).remove();
    dataRefProject.child(projectId).child('tasks').child(id).remove();
    list.removeChild(task);
}

function toggleProject() {
  var task = this.parentNode;
  console.log(task);
  var projectMenu = task.getElementsByClassName('taskProject')[0];

  if (projectMenu.style.display == 'none') {
    projectMenu.style.display = 'block';
  } else {
    projectMenu.style.display = 'none';
  }
}

function taskRedirect() {
  var projectId = this.parentNode.parentNode.getElementsByClassName('dot')[0].name;
  window.location.href = 'detail' + '#' + projectId;
}

function addRedirect() {
  var project = this.parentNode.htmlFor;
  window.location.href = 'detail' + '#' + project;
}

