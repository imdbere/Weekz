// Edit Task
function editTask() {

  var userId = firebase.auth().currentUser.uid;
  var selectedWeek = setDates(dayDifference);

  var dataRef = firebase.database().ref().child('users').child(userId).child('weeks').child(selectedWeek);

  closeBtn.style.background = "#C4DADE";
  addTaskBtn.style.display = "none";
  editTaskBtn.style.display = "block";
  addTitle.style.display = "none";
  editTitle.style.display = "block";

  var item = this.parentNode.parentNode;
  var listId = item.parentNode.id;
  var id = item.id;
  var nameInput = item.children[2];
  var descInput = item.children[5].children[0];

  taskName.value = nameInput.innerText;
  taskDesc.value = descInput.innerText;
  showAddMenu();

  editTaskBtn.addEventListener('click', function() {
    var newName = taskName.value;
    var newDesc = taskDesc.value;
    nameInput.innerText = newName;
    descInput.innerText = newDesc;

    var update = dataRef.child(listId).child(id).update({taskName: newName, taskDesc: newDesc});
    this.removeEventListener('click', arguments.callee, false);
    hideAddMenu();
  });
};
