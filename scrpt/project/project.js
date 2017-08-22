
var addBtn = document.getElementById('addProject');
var addBtnMobile = document.getElementById('addProjectMobile');
var newProjectDialog = document.getElementById('projectBackground');
var closeAddProjectBtn = document.getElementById('closeProjectBtn');
var createProjectBtn = document.getElementById('createProject');
var saveProjectBtn = document.getElementById('editProject');

var projectTitle = document.getElementById('projectTitle');
var projectSummary = document.getElementById('projectSummary');
var projectDescription = document.getElementById('projectDescription');

var dataRefProject;
var dataRefTasks;


addLoggedInHandler(function(user)
{

  var userId = user.uid;
  dataRefProject = firebase.database().ref().child('users').child(userId).child('projects');
  dataRefTasks = firebase.database().ref().child('users').child(userId).child('tasks');

  loadAndAddProjects();

    addBtn.addEventListener('click', openNewProjectDialog);
    addBtnMobile.addEventListener('click', openNewProjectDialog);
    closeAddProjectBtn.addEventListener('click', closeNewProjectDialog);

    createProjectBtn.addEventListener('click', function()
    {
        var title = projectTitle.value;
        var summary = projectSummary.value;
        var desc = projectDescription.value;
        var colorID = document.querySelector('input[name="color"]:checked').id;

        closeNewProjectDialog();
        createProject(title, summary, desc, colorID);
    });
});

function openNewProjectDialog()
{
  document.getElementById('newTitle').style.display = 'block';
  document.getElementById('editTitle').style.display = 'none';

  createProjectBtn.style.display = 'block';
  saveProjectBtn.style.display = 'none';

  newProjectDialog.style.display = "block";
}

function closeNewProjectDialog()
{
  projectTitle.value = "";
  projectSummary.value = "";
  projectDescription.value = "";

  newProjectDialog.style.display = "none";
}

function createProject(name, summary, desc, colorID)
{
  var projectKey = dataRefProject.push().key;

  var dashDiv = document.getElementsByClassName("dash")[0];
  var projectDiv = generateProject(name, summary, colorID, 0, projectKey);
  dashDiv.insertBefore(projectDiv, addBtn);

  projectDiv.id = projectKey;

  dataRefProject.child(projectKey).child('info').update({ projectTitle: name, projectSummary: summary, projectDesc: desc, projectColor: colorID, percentage: "0"});
}

function projectRemoveButtonClicked()
{
    var projectDiv = this.parentNode.parentNode.parentNode;
    var deleteId = projectDiv.id;

    projectDiv.parentNode.removeChild(projectDiv);
    dataRefProject.child(deleteId).remove();
}

function showProjectDetails() {
  var selectedProject = this.parentNode.parentNode.id;
  window.location.href = 'detail.html' + '#' + selectedProject;
}
