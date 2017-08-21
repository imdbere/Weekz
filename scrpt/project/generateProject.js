
function generateProject (name, summary, colorCode, progressPercentage, id)
{
    var projectDiv = document.createElement('div');
    projectDiv.classList.add('project');
    projectDiv.id = id;

    var containerDiv = document.createElement('div');
    containerDiv.classList.add('container');

    var h1 = document.createElement('h1');
    h1.innerText = name;
    h1.addEventListener('click', showProjectDetails)
    containerDiv.appendChild(h1);

    var separatorDiv = document.createElement('div');
    separatorDiv.classList.add('separator', colorCode);
    containerDiv.appendChild(separatorDiv);

    var modifyDiv = document.createElement('div');
    modifyDiv.classList.add('modify');

    var buttonEdit = document.createElement('button');
    buttonEdit.type = "button";
    buttonEdit.innerHTML = '<img src="res/edit.png" alt="Edit your Project">';
    buttonEdit.addEventListener('click', projectEditButtonClicked);
    modifyDiv.appendChild(buttonEdit);

    var buttonRemove = document.createElement('button');
    buttonRemove.type = "button";
    buttonRemove.innerHTML = '<img src="res/remove.png" alt="Delete your Project">';
    buttonRemove.addEventListener('click', projectRemoveButtonClicked);
    modifyDiv.appendChild(buttonRemove);

    containerDiv.appendChild(modifyDiv);

    var p = document.createElement('p');
    p.innerText = summary;
    containerDiv.appendChild(p);

    var progressDiv = document.createElement('div');
    progressDiv.classList.add('progress');

    var innerProgDiv = document.createElement('div');
    innerProgDiv.style.width = progressPercentage + "%";
    console.log(colorCode);
    innerProgDiv.classList.add(colorCode);

    progressDiv.appendChild(innerProgDiv);
    containerDiv.appendChild(progressDiv);

    projectDiv.appendChild(containerDiv);

    return projectDiv;
}
