(function() {

  // Sleep function
  function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  };

  // Get Elements
  const showBubble = document.getElementById('showBubble');
  const hideBubble = document.getElementById('hideBubble');
  const bubble = document.getElementById('bubble');
  const toDoValue = document.getElementById('toDoName');
  const toDoAddBtn = document.getElementById('bubbleAdd');
  const toDoList = document.getElementById('bubbleList');
  const showBubbleMobile = document.getElementById('showBubbleMobile')

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {

      list = toDoList;

      showBubble.addEventListener('click', function() {
        bubble.style.display = "block";
        hideBubble.style.display = "block";
        sleep(100).then(() => {
          bubble.style.opacity = "1";
        });
      });

      showBubbleMobile.addEventListener('click', function() {
        if (bubble.style.height == "0px") {
          bubble.style.height = "350px";
          console.log('opened');
        } else {
          bubble.style.height = "0px";
          console.log('closed');
        }
      });

      hideBubble.addEventListener('click', function() {
        bubble.style.opacity = "0";
        toDoValue.value = "";
        sleep(100).then(() => {
          bubble.style.display = "none";
          hideBubble.style.display = "none";
        });
      });
    } else {
      console.log("Not logged in");
    };

    // Delete Task
    function removeTask() {
      var task = this.parentNode;
      var id = task.id;
      var list = task.parentNode;

      list.removeChild(task);
      console.log(list.id);
      dataRef.child(list.id).child(id).remove();
    };

    // Mark Task as done
    function taskDone() {
      var task = this.parentNode;
      var id = task.id;
      var taskText = task.children[2];
      var status = dataRef.child(list.id).child(id).once('value').then(function(checked) {
        var value = checked.val();

        if (value == false) {
          taskText.classList.toggle('toggle');
          dataRef.child(list.id).child(id).update({checked: true});
          console.log("done");
        } else {
          taskText.classList.toggle('toggle');
          dataRef.child(list.id).child(id).update({checked: false});
          console.log("undone");
        };
      });
    };

    var userId = firebase.auth().currentUser.uid;
    var selectedWeek = setDates(dayDifference);
    
    // Declaring Database Reference
    const dataRef = firebase.database().ref().child('users').child(userId).child('weeks').child(selectedWeek);

    function createToDoItem() {
      if (toDoValue.value.trim() == "") {
        toDoValue.style.border = "1px solid #FF514C";
      } else {
        toDoValue.style.border = "none";

        li = document.createElement('li');
        li.className = "task";

        var check = document.createElement('input');
        check.type = "checkbox";
        check.classList.add("option-input", "checkbox");

        var deleteBtn = document.createElement('button');
        deleteBtn.classList.add("toDoDelete");
        deleteBtn.innerHTML = deleteBtnIcon;

        var p = document.createElement('p');
        p.innerText = toDoValue.value;

        li.appendChild(deleteBtn);
        li.appendChild(check);
        li.appendChild(p);

        var key = dataRef.child('toDo').push().key;
        li.id = key;

        var newEntry = dataRef.child('bubbleList').child(key).update({taskName: toDoValue.value});

        toDoList.appendChild(li);

        // Make Items deletable
        deleteBtn.addEventListener('click', removeTask);
        // Change appearance of checked task
        check.addEventListener('click', taskDone);
      }
    }

    toDoAddBtn.addEventListener('click', function() {
      createToDoItem();
      toDoValue.value = "";
    });
  });

}());
