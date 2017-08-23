var projectName = document.getElementById('projectName');
var projectSummary = document.getElementById('projectSummary');
var projectDesc = document.getElementById('projectDesc');
var tasksCompleted = document.getElementById('tasksCompleted');
var tasksOutstanding = document.getElementById('tasksOutstanding');
var progressPercent = document.getElementById('progressPercent');
var progressBar = document.getElementById('projectProgress');

console.log(progressBar);
var taskList = document.getElementById('taskList');
var taskDots = document.getElementsByClassName('dot');

var projectID;
var dataRefProject;
var dataRefTasks;

addLoggedInHandler(function(){

    projectID = window.location.hash.substr(1);
    dataRefProject = firebase.database().ref().child('users').child(userId).child('projects');
    dataRefTasks = firebase.database().ref().child('users').child(userId).child('tasks');

    loadDetailData(projectID);

});

function generateProjectDetails(title, summary, description, color, taskCount, tasksDone) {
  projectName.innerText = title;
  projectSummary.innerText = summary;
  projectDesc.innerText = description;

  tasksCompleted.innerText = tasksDone;
  tasksOutstanding.innerText = taskCount - tasksDone;

  console.log(progressBar);

  progressBar.classList.add(color);
  var percentage;
  if (taskCount > 0)
    percentage = Math.floor(tasksDone * 100 / taskCount);
  else
    percentage = 0;

  progressBar.style.width = percentage + "%";
  progressPercent.innerText = percentage;

  for (var i = 0; i < taskDots.length; i++) {
    taskDots[i].classList.add(color);
  }
}

function generateProjectTask(name, desc, check, color, id) {

  li = document.createElement('li');
  li.className = "task";
  li.id = id;

  var dot = document.createElement('div');
  dot.classList.add('dot', color);

  var p = document.createElement('p');
  p.innerText = name;

  var input = document.createElement('input');
  input.classList.add('option-input', 'checkbox');
  input.type = 'checkbox';
  input.checked = check;

  if (check) {
    p.classList.add('toggle');
  }

  // Change appearance of checked task
  input.addEventListener('click', toggleTaskDone);

  li.appendChild(dot);
  li.appendChild(p);
  li.appendChild(input);

  taskList.appendChild(li);
}

//Toggle checkbox
function toggleTaskDone() {
    var task = this.parentNode;
    console.log(task);
    var thisList = task.parentNode;
    var id = task.id;
    console.log(id);
    var taskText = task.children[1];
    var status = dataRefTasks.child(id).once('value').then(function(checked) {
    var value = checked.val().checked;
    taskText.classList.toggle('toggle');
    var update = dataRefTasks.child(id).update({checked: !value});
  });
}
