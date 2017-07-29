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
    back.style.zIndex = "2000";
    console.log('detected');
    sleep(200).then(() => {
      back.style.opacity = "1"
      sleep(150).then(() => {
        menu.style.width = menuWidth;
      });
    });
  });

  // Close Menu
  close.addEventListener('click', function() {
    menu.style.width = "0px";
    back.style.opacity = "0";
    sleep(350).then(() => {
      back.style.zIndex = "-1000";
    });
  });
  // Sign User Out
  signOut.addEventListener('click', function() {
    firebase.auth().signOut();
  });
}());
