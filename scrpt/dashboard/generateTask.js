
function generateBubbleTask(taskName, checked) {

    li = document.createElement('li');
    li.className = "task";

    var toDoDeleteBtn = document.createElement('button');
    toDoDeleteBtn.classList.add('toDoDelete');
    toDoDeleteBtn.innerHTML = deleteBtnIcon;

    var check = document.createElement('input');
    check.type = "checkbox";
    check.classList.add("option-input", "checkbox");

    var p = document.createElement('p');
    p.innerText = taskName;

    if (checked) {
        p.classList.add('toggle');
        check.checked = true;
    }

    li.appendChild(toDoDeleteBtn);
    li.appendChild(check);
    li.appendChild(p);


    // Delete button for To-Do List
    toDoDeleteBtn.addEventListener('click', removeTask);

    // Change appearance of checked task
    check.addEventListener('click', toggleTaskDone);
    // Show Detail View
    p.addEventListener('click', showDetail);

    return li;
}

function generateTask(taskName, taskDesc, checked, project, color, title) {
    li = document.createElement('li');
    li.className = "task";

    var check = document.createElement('input');
    check.type = "checkbox";
    check.classList.add("option-input", "checkbox");

    var toDoDeleteBtn = document.createElement('button');
    toDoDeleteBtn.classList.add('toDoDelete');
    toDoDeleteBtn.innerHTML = deleteBtnIcon;

    var contextBtn = document.createElement('button');
    contextBtn.id = "context";
    contextBtn.style.background = "context.png";

    var p = document.createElement('p');
    p.innerText = taskName;

    var dot = document.createElement('div');
    dot.classList.add('dot');
    dot.name = project;

    console.log(dot.name);

    if (project != 'noProject') {
      var taskProject = document.createElement('div');
      taskProject.classList.add('taskProject');
      taskProject.style.display = "none";

        var h3 = document.createElement('h3');
        h3.innerText = title;

        var infoBtn = document.createElement('button');
        infoBtn.innerHTML = '<img src="res/info.png" alt="See Project Details">';
        infoBtn.addEventListener('click', taskRedirect)

        taskProject.appendChild(h3);
        taskProject.appendChild(infoBtn);

        dot.addEventListener('click', toggleProject);
    }

    if (color != "") {
      dot.classList.add(color);
    }

    if (checked) {
        p.classList.add('toggle');
        check.checked = true;
    }

    var detailDiv = document.createElement('div');
    detailDiv.classList.add('detail');
    var detailP = document.createElement('p');
    detailP.innerText = taskDesc;
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

    var buttonContainer = document.createElement('div');
    buttonContainer.classList.add('buttonContainer');

    var lastWeekBtn = document.createElement('button');
    lastWeekBtn.classList.add('switch');
    lastWeekBtn.id = "moveLast";
    lastWeekBtn.style.display = "inline-block";
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
        moveDayBtn.addEventListener("click", moveToDayButtonClicked);
        buttonContainer.appendChild(moveDayBtn);
    };

    moveMenu.appendChild(buttonContainer);

    var nextWeekBtn = document.createElement('button');
    nextWeekBtn.classList.add('switch');
    nextWeekBtn.id = "moveNext";
    nextWeekBtn.style.display = "block";
    var nextWeekIcon = document.createElement('div');
    nextWeekIcon.classList.add('triangle');
    nextWeekBtn.appendChild(nextWeekIcon);
    moveMenu.appendChild(nextWeekBtn);

    var whichWeekDiv = document.createElement('div');
    whichWeekDiv.classList.add('whichWeek');
    var whichWeekP = document.createElement('p');
    whichWeekP.innerText = currentlySelectedWeek.getDayAsString(0) + " - " + currentlySelectedWeek.getDayAsString(5);

    whichWeekDiv.appendChild(whichWeekP);
    moveMenu.appendChild(whichWeekDiv);
    moveMenu.weekOffset = 0;

    contextDiv.appendChild(deleteBtn);
    contextDiv.appendChild(editBtn);
    contextDiv.appendChild(moveBtn);

    li.appendChild(dot);
    li.appendChild(contextBtn);
    li.appendChild(check);
    li.appendChild(p);
    li.appendChild(contextDiv);
    li.appendChild(moveMenu);
    li.appendChild(detailDiv);
    if (project != 'noProject') {
      li.appendChild(taskProject);
    }

    // Change appearance of checked task
    check.addEventListener('click', toggleTaskDone);
    // Show Detail View
    p.addEventListener('click', showDetail);

    // Open Context Menu and configure its buttons
    contextBtn.addEventListener('click', toggleContext);
    deleteBtn.addEventListener('click', removeTask);
    editBtn.addEventListener('click', editButtonClicked);
    moveBtn.addEventListener('click', moveTaskButtonClicked);

    lastWeekBtn.addEventListener('click', moveToPreviousWeekButtonClicked);
    nextWeekBtn.addEventListener('click', moveToNextWeekButtonClicked);

    return li;

}
