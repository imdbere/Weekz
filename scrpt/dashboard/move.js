function moveTaskButtonClicked()
{
  var item = this.parentNode.parentNode
  var oldList = item.parentNode;
  var oldListId = item.parentNode.id;
  var dayPicker = item.children[5];

  if (dayPicker.style.display == "none") {
    dayPicker.style.display = "block";
  } else {
    dayPicker.style.display = "none";
  }
}

function moveToPreviousWeekButtonClicked()
{
  var moveTaskDiv = this.parentNode;
  var p = moveTaskDiv.getElementsByClassName("whichWeek")[0].firstChild;
  moveTaskDiv.weekOffset--;
  var desiredWeek = new Week(moveTaskDiv.weekOffset  + weekOffset);
  p.innerText = desiredWeek.getDayAsString(0) + " - " + desiredWeek.getDayAsString(5);
}

function moveToNextWeekButtonClicked()
{
  var moveTaskDiv = this.parentNode;
  var p = moveTaskDiv.getElementsByClassName("whichWeek")[0].firstChild;
  moveTaskDiv.weekOffset++;
  var desiredWeek = new Week(moveTaskDiv.weekOffset + weekOffset);
  p.innerText = desiredWeek.getDayAsString(0) + " - " + desiredWeek.getDayAsString(5);
}

function moveTask (item, newList, moveWeekOffset)
{
  var dataRefDesiredWeek;
  var newListId = newList.id;

  if (item != null)
  {
    var oldList = item.parentNode;
    oldList.removeChild(item);
  }

  if (moveWeekOffset == 0)
  {
    newList.appendChild(item);
    dataRefDesiredWeek = dataRefSelectedWeek;
  }
  else
  {
    var desiredWeek = new Week(moveWeekOffset + weekOffset);
    dataRefDesiredWeek = firebase.database().ref().child('users').child(userId).child('weeks').child(desiredWeek.getWeekID());
  }

  dataRefTasks.child(item.id).once('value', function(message) {
    var oldData = message.val();

    dataRefSelectedWeek.child(oldList.id).child(item.id).remove();
    dataRefDesiredWeek.child(newListId).child(item.id).update(oldData);
  });
}

function moveToDayButtonClicked()
{
  var item = this.parentNode.parentNode.parentNode;
  var newListId = this.name;
  var newList = document.getElementById(newListId);
  var moveTaskDiv = this.parentNode.parentNode;

  moveTask (item, newList, moveTaskDiv.weekOffset);
}

function enterDrag(ev) {
  ev.preventDefault();
  var totalDiv = this.parentNode.parentNode;
  totalDiv.classList.add('dragover');
}

function leftDrag(ev) {

  var totalDiv = this.parentNode.parentNode;
  totalDiv.classList.remove('dragover');
}

function dragStarted(ev) {
  ev.dataTransfer.setData("text", ev.target.id);

}

function elementDropped(ev) {
  ev.preventDefault();
  var totalDiv = this.parentNode.parentNode;
  totalDiv.classList.remove('dragover');

  var data = ev.dataTransfer.getData("text");
  var item = document.getElementById(data);
  var newList = this;
  
  moveTask (item, newList, 0);
}
