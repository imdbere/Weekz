function moveTaskButtonClicked()
{
  var item = this.parentNode.parentNode
  var oldList = item.parentNode;
  var oldListId = item.parentNode.id;
  var dayPicker = item.children[4];

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

function moveToDayButtonClicked()
{
  var moveTaskDiv = this.parentNode.parentNode;

  var item = this.parentNode.parentNode.parentNode;
  var oldList = item.parentNode;
  var dataRefDesiredWeek;
  var newListId = this.name;
  var newList = document.getElementById(newListId);
  oldList.removeChild(item);

  console.log(item.id);

  if (moveTaskDiv.weekOffset == 0)
  {
    newList.appendChild(item);
    dataRefDesiredWeek = dataRefSelectedWeek;
  }
  else
  {
    var desiredWeek = new Week(moveTaskDiv.weekOffset + weekOffset);
    dataRefDesiredWeek = firebase.database().ref().child('users').child(userId).child('weeks').child(desiredWeek.getWeekID());
  }

  dataRefTasks.child(item.id).once('value', function(message) {
    var oldData = message.val();
    
    dataRefSelectedWeek.child(oldList.id).child(item.id).remove();
    dataRefDesiredWeek.child(newListId).child(item.id).update(oldData);
  });
}
