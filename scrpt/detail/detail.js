const projectName = document.getElementById('projectName');
const projectSummary = document.getElementById('projectSummary');
const projectDesc = document.getElementById('projectDesc');
const tasksCompleted = document.getElementById('tasksCompleted');
const tasksOutstanding = document.getElementById('tasksOutstanding');
const progressPercent = document.getElementById('progressPercent');
const taskList = document.getElementById('taskList');

var projectID;

addLoggedInHandler(function(){

    projectID = window.location.hash.substr(1);

});

