var projectName = document.getElementById('projectName');
var projectSummary = document.getElementById('projectSummary');
var projectDesc = document.getElementById('projectDesc');
var tasksCompletedText = document.getElementById('tasksCompleted');
var tasksOutstandingText = document.getElementById('tasksOutstanding');
var progressPercent = document.getElementById('progressPercent');
var progressBar = document.getElementById('projectProgress');
var recycleContainer = document.getElementById('recyleContainer');
var taskContainerDiv = document.getElementsByClassName('tasks')[0];
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

    taskContainerDiv.ondragover = function(ev)
    {
      ev.preventDefault();
    };
    recycleContainer.ondrop = elementDropped;

    loadDetailData(projectID);

});

function updateProjectDetails(title, summary, description, color, taskCount, tasksDone) {
  projectName.innerText = title;
  projectSummary.innerText = summary;
  projectDesc.innerText = description;
  progressBar.classList.add(color);

  updateProjectProgess(taskCount, tasksDone);

  for (var i = 0; i < taskDots.length; i++) {
    taskDots[i].classList.add(color);
  }
}

function updateProjectProgess(taskCount, tasksDone)
{
  tasksCompletedText.innerText = tasksDone;
  tasksOutstandingText.innerText = taskCount - tasksDone;
  
  var percentage;
  if (taskCount > 0)
    percentage = Math.floor(tasksDone * 100 / taskCount);
  else
    percentage = 0;

  progressBar.style.width = percentage + "%";
  progressPercent.innerText = percentage;
}

function generateProjectTask(name, desc, check, color, id) {

  li = document.createElement('li');
  li.className = "task";
  li.id = id;
  li.draggable = true;
  li.ondragstart= dragStarted;
  li.ondragend = dragStopped;

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
    var taskText = task.children[1];
    //var thisList = task.parentNode;
    var newCheckState = this.checked;

    taskText.classList.toggle('toggle');
    var update = dataRefTasks.child(task.id).update({checked: newCheckState});
    
    if (newCheckState)
      tasksCompleted++;
    else
      tasksCompleted--;

    updateProjectProgess(taskCount, tasksCompleted);

}

function dragStarted(ev)
{
  this.style.opacity = "0.2";
  recycleContainer.children[0].src = "res/removeRed.png";
  recycleContainer.style.opacity = "1";
  ev.dataTransfer.setData("text", this.id);
}

function dragStopped(ev)
{
  recycleContainer.children[0].src = "res/remove.png";
  recycleContainer.style.opacity = "0.1";
  this.style.opacity = "1";
}
function elementDropped(ev) 
{
  var itemId = ev.dataTransfer.getData("text");
  var item = document.getElementById(itemId);
  taskList.removeChild(item);
}
