var addBtn = document.getElementById('addProject');
var newProjectDialog = document.getElementById('projectBackground');
var closeAddProjectBtn = document.getElementById('closeProjectBtn');
var createProjectBtn = document.getElementById('createProject');

var projectTitle = document.getElementById('projectTitle');
var projectSummary = document.getElementById('projectSummary');
var projectDescription = document.getElementById('projectDescription');

addLoggedInHandler(function(user)
{
    addBtn.addEventListener('click', function()
    {
        openNewProjectDialog();
    });

    closeAddProjectBtn.addEventListener('click', function()
    {
        closeNewProjectDialog();
    });

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
    newProjectDialog.style.display = "block";
}

function closeNewProjectDialog()
{
    newProjectDialog.style.display = "none";
}

function createProject(name, summary, desc, colorID)
{
    var dashDiv = document.getElementsByClassName("dash")[0];
    var projectDiv = generateProject(name, summary, colorID, 0);
    dashDiv.appendChild(projectDiv);
}

function projectRemoveButtonClicked()
{
    var projectDiv = this.parentNode.parentNode.parentNode;
    projectDiv.parentNode.removeChild(projectDiv);
}

function projectEditButtonClicked()
{

} 