function projectEditButtonClicked()
{
  var container = this.parentNode.parentNode;
  var p = container.getElementsByTagName('p');
  var h1 = container.getElementsByTagName('h1');
  var separator = container.getElementsByClassName('separator');
  var progress = container.getElementsByClassName('progress');

  var id = this.parentNode.parentNode.parentNode.id;
  loadEditData(id);
  setupEditView();
  newProjectDialog.style.display = "block";

  saveProjectBtn.onclick = () => saveEditData(id, h1[0], p[0], separator[0], progress[0]);
}

function setupEditView() {
  document.getElementById('newTitle').style.display = 'none';
  document.getElementById('editTitle').style.display = 'block';

  createProjectBtn.style.display = 'none';
  saveProjectBtn.style.display = 'block';
}

function loadEditData(projectId) {
  dataRefProject.child(projectId).child('info').once('value', function(snap) {

    projectTitle.value = snap.val().projectTitle;
    projectSummary.value = snap.val().projectSummary;
    projectDescription.value = snap.val().projectDesc;

    var selectedColor = snap.val().projectColor;
    document.getElementById(selectedColor).checked = true;
  });
}

function saveEditData(projectId, title, summary, separator, progress) {

  var newProjectTitle = projectTitle.value;
  var newProjectSummary = projectSummary.value;
  var newProjectDesc = projectDescription.value;
  var colorID = document.querySelector('input[name="color"]:checked').id;

  console.log(title.innerText);

  title.innerText = projectTitle.value;
  summary.innerText = projectSummary.value;
  separator.className = "";
  progress.children[0].className = "";
  separator.classList.add('separator', colorID);
  progress.children[0].classList.add(colorID);

  dataRefProject.child(projectId).child('info').update({ projectTitle: newProjectTitle, projectSummary: newProjectSummary, projectDesc: newProjectDesc, projectColor: colorID });

  closeNewProjectDialog();
}
