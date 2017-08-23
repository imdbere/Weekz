function moveTaskButtonClicked()
{
  var item = this.parentNode.parentNode
  var oldList = item.parentNode;
  var oldListId = item.parentNode.id;
  var moveTaskDiv = item.getElementsByClassName('moveTask')[0];
  //var whichWeekDiv = moveTaskDiv.getElementsByClassName('whichWeek')[0]; 

  if (moveTaskDiv.style.display == "none") {
    moveTaskDiv.style.display = "block";
    
  } else {
    moveTaskDiv.style.display = "none";
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
  var item = this.parentNode.parentNode.parentNode;
  var newListId = this.name;
  var newList = document.getElementById(newListId);
  var moveTaskDiv = this.parentNode.parentNode;

  moveTask (item, newList, moveTaskDiv.weekOffset);
}

function moveTask (item, newList, moveWeekOffset)
{
  var oldList = item.parentNode;
  oldList.removeChild(item);
  
  var newWeek;
  if (moveWeekOffset == 0)
  {
    newWeek = currentlySelectedWeek;
    newList.appendChild(item);
  }
  else
  {
    newWeek = new Week(moveWeekOffset + weekOffset);
  }
    
  
  moveTaskInDB(item.id, oldList.id, newList.id, currentlySelectedWeek, newWeek);
}

function moveTaskInDB(itemId, oldListId, newListId, oldWeek, newWeek)
{
  var owi = oldWeek.getWeekID();
  var nwi = newWeek.getWeekID();
  var dataRefOldWeek = firebase.database().ref().child('users').child(userId).child('weeks').child(oldWeek.getWeekID());
  var dataRefNewWeek = firebase.database().ref().child('users').child(userId).child('weeks').child(newWeek.getWeekID());
  
  dataRefTasks.child(itemId).once('value', function(message) {
    var oldData = message.val();

    dataRefOldWeek.child(oldListId).child(itemId).remove();
    dataRefNewWeek.child(newListId).child(itemId).update(oldData);
  });
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
  var item = ev.target;
  item.style.opacity = "0.5";
  var oldList = item.parentNode;
  var transferObj = {itemId : item.id, oldListId : oldList.id, oldWeekOffset: weekOffset};

  ev.dataTransfer.setData("text", JSON.stringify(transferObj));
}

function dragStopped(ev)
{
  var item = ev.target;
  item.style.opacity = "1";
}

function elementDropped(ev) {
  ev.preventDefault();
  var totalDiv = this.parentNode.parentNode;
  totalDiv.classList.remove('dragover');

  var data = ev.dataTransfer.getData("text");
  var transferObj = JSON.parse(data);

  var item = document.getElementById(transferObj.itemId);
  var newList = this;
  
  if (item == null)
  {
    loadAndAppendSingleTask(transferObj.itemId, newList);

    var newWeek = currentlySelectedWeek;
    var oldWeek = new Week(transferObj.oldWeekOffset);
    moveTaskInDB(transferObj.itemId, transferObj.oldListId, newList.id, oldWeek, newWeek);
  }
  else
  {
    if (transferObj.oldListId != newList.id)
    moveTask (item, newList, 0);
  }
  
}
