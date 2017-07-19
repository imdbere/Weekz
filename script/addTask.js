(function() {

  // Defining day fro task creation
  var addDay = "";

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

  // Create Task
    addBtn.addEventListener('click', e => {
      li = document.createElement('li');
      li.className = "task";
      var check = document.createElement('input');
      check.type = "checkbox";
      check.classList.add("option-input", "checkbox");
      var p = document.createElement('p');
      p.innerText = task.value;
      li.appendChild(check);
      li.appendChild(p);

      addDay.appendChild(document.createElement('br'));
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
