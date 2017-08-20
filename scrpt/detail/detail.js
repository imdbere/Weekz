const projectName = document.getElementById('projectName');
const projectSummary = document.getElementById('projectSummary');
const projectDesc = document.getElementById('projectDesc');
const tasksCompleted = document.getElementById('tasksCompleted');
const tasksOutstanding = document.getElementById('tasksOutstanding');
const progressPercent = document.getElementById('progressPercent');
const status = document.getElementById('projectStatus');
const taskList = document.getElementById('taskList');
const taskDots = document.getElementsByClassName('dot');

var projectID;
var dataRefProject;
var dataRefTasks;

addLoggedInHandler(function(){

    projectID = window.location.hash.substr(1);
    dataRefProject = firebase.database().ref().child('users').child(userId).child('projects');
    dataRefTasks = firebase.database().ref().child('users').child(userId).child('tasks');

    loadDetailData(projectID);

});

function generateProjectDetails(title, summary, description, color, percentage) {
  projectName.innerText = title;
  projectSummary.innerText = summary;
  projectDesc.innerText = description;
  status.classList.add(color);

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
    var thisList = task.parentNode;
    var id = task.id;
    var taskText = task.children[1];
    var status = dataRefTasks.child(id).once('value').then(function(checked) {
    var value = checked.val().checked;
    taskText.classList.toggle('toggle');
    var update = dataRefTasks.child(id).update({checked: !value});
  });
}
