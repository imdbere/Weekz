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

function moveToDayButtonClicked()
{

}
function moveTask(task, weekOffset, dayOffset)
{
  var moveTo = this.name;
  
  var oldTask = item.children[2].innerText;
  var oldDesc = item.children[5].children[0].innerText;
  var wasChecked = item.children[1].checked;

  console.log(wasChecked);
  oldList.removeChild(item);

  var li = generateTask(oldTask, oldDesc, wasChecked);

  var key = dataRef.child(moveTo).push().key;
  li.id = key;

  dataRef.child(oldListId).child(item.id).remove();
  dataRef.child(moveTo).child(key).update({taskName: oldTask, taskDesc: oldDesc, checked: wasChecked});

  newList = document.getElementById(moveTo);
  newList.appendChild(li);
}

// Move Task
function moveTaskalt() {
  var item = this.parentNode.parentNode
  var oldList = item.parentNode;
  var oldListId = item.parentNode.id;
  var dayPicker = item.children[4];

  if (dayPicker.style.display == "none") {
    dayPicker.style.display = "block";
  } else {
    dayPicker.style.display = "none";
  };

  
}