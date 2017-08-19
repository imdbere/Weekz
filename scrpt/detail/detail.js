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

addLoggedInHandler(function(){

    projectID = window.location.hash.substr(1);
    dataRefProject = firebase.database().ref().child('users').child(userId).child('projects');

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
