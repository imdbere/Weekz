(function() {

  // Defining day fro task creation
  var addDay = "";
  var deleteBtnIcon = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6L16.3,18.7L16.3,18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8C7.4,10.2,7.7,10,8,10c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD-23wnCzHAmW_AaS_yODHhcTbh9RhnbLY",
    authDomain: "weekz-fba03.firebaseapp.com",
    databaseURL: "https://weekz-fba03.firebaseio.com",
    projectId: "weekz-fba03",
    storageBucket: "gs://weekz-fba03.appspot.com/",
    messagingSenderId: "708230896117"
  };
  firebase.initializeApp(config);

  // Define Colors
  var monColor = "#FF514C";
  var tueColor = "#E5E500";
  var wedColor = "#F6921E";
  var thuColor = "#7AC843";
  var friColor = "#3FA8F4";
  var satColor = "#662D90";

  // Get Elements
  const monAdd = document.getElementById('monAdd');
  const tueAdd = document.getElementById('tueAdd');
  const wedAdd = document.getElementById('wedAdd');
  const thuAdd = document.getElementById('thuAdd');
  const friAdd = document.getElementById('friAdd');
  const satAdd = document.getElementById('satAdd');

  const menu = document.getElementById('addTask');
  const day = document.getElementById('whatDay');
  const task = document.getElementById('taskName');
  const addBtn = document.getElementById('addBtn');
  const closeBtn = document.getElementById('closeBtn');

  // Get Lists
  const monList = document.getElementById('monList');
  const tueList = document.getElementById('tueList');
  const wedList = document.getElementById('wedList');
  const thuList = document.getElementById('thuList');
  const friList = document.getElementById('friList');
  const satList = document.getElementById('satList');

  // Open 'New Task' Menu
  function showAddMenu() {
    menu.style.zIndex = "1000";
    menu.style.opacity = "1";
  };

  // Close 'New Task' Menu
  function hideAddMenu() {
    menu.style.opacity = "0";
    task.value = "";
    function sleep (time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    }
    sleep(300).then(() => {
      menu.style.zIndex = "-1000";
    });
  };

  // Remove Task
  function removeTask() {
    var task = this.parentNode;
    var list = task.parentNode;
    list.removeChild(task);
  };

  // Mark Task as done
  function taskDone() {
    var task = this.parentNode;
    var taskText = task.children[2];

    taskText.classList.toggle('toggle');
  };

  // Create Task
    addBtn.addEventListener('click', e => {
      li = document.createElement('li');
      li.className = "task";

      var check = document.createElement('input');
      check.type = "checkbox";
      check.classList.add("option-input", "checkbox");

      var deleteBtn = document.createElement('button');
      deleteBtn.id = "delete"
      deleteBtn.innerHTML = deleteBtnIcon;

      // Make Items deletable
      deleteBtn.addEventListener('click', removeTask);
      check.addEventListener('click', taskDone)

      var p = document.createElement('p');
      p.innerText = task.value;
      li.appendChild(deleteBtn);
      li.appendChild(check);
      li.appendChild(p);

      addDay.appendChild(li);

      addDay = "";
      hideAddMenu();
    });

  closeBtn.addEventListener('click', e => {
    hideAddMenu();
  });

  // Add task to Monday
  monAdd.addEventListener('click', e => {
    showAddMenu();
    day.innerText = "Monday";
    day.style.color = monColor;
    addBtn.style.background = monColor;
    closeBtn.style.background = monColor;
    addDay = monList;
  });

  // Add task to Tuesday
  tueAdd.addEventListener('click', e => {
    showAddMenu();
    day.innerText = "Tuesday";
    day.style.color = tueColor;
    addBtn.style.background = tueColor;
    closeBtn.style.background = tueColor;
    addDay = tueList;
  });

  // Add task to Wednesday
  wedAdd.addEventListener('click', e => {
    showAddMenu();
    day.innerText = "Wednesday";
    day.style.color = wedColor;
    addBtn.style.background = wedColor;
    closeBtn.style.background = wedColor;
    addDay = wedList;
  });

  // Add task to Thursday
  thuAdd.addEventListener('click', e => {
    showAddMenu();
    day.innerText = "Thursday";
    day.style.color = thuColor;
    addBtn.style.background = thuColor;
    closeBtn.style.background = thuColor;
    addDay = thuList;
  });

  // Add task to Friday
  friAdd.addEventListener('click', e => {
    showAddMenu();
    day.innerText = "Friday";
    day.style.color = friColor;
    addBtn.style.background = friColor;
    closeBtn.style.background = friColor;
    addDay = friList;
  });

  // Add task to Saturday
  satAdd.addEventListener('click', e => {
    showAddMenu();
    day.innerText = "Saturday";
    day.style.color = satColor;
    addBtn.style.background = satColor;
    closeBtn.style.background = satColor;
    addDay = satList;
  });
}());
