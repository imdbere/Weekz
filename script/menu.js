(function() {

  // Sleep function to be called later
  function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  // Get Elements
  const back = document.getElementById('background');
  const menu = document.getElementById('menu');
  const open = document.getElementById('openMenuBtn');
  const close = document.getElementById('closeMenuBtn');
  const signOut = document.getElementById('signOut');

  // Open Menu
  open.addEventListener('click', function() {
    back.style.zIndex = "1000";
    back.style.opacity = "1"
    sleep(200).then(() => {
      menu.style.width = "350px";
    });
  });

  // Close Menu
  close.addEventListener('click', function() {
    menu.style.width = "0px";
    back.style.opacity = "0";
    sleep(500).then(() => {
      back.style.zIndex = "-1000";
    });
  });
  // Sign User Out
  signOut.addEventListener('click', function() {
    firebase.auth().signOut();
  });
}());
