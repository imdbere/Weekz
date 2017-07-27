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

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {

      showBubble.addEventListener('click', function() {
        bubble.style.display = "block";
        hideBubble.style.display = "block";
        sleep(100).then(() => {
          bubble.style.opacity = "1";
        });
      });

      hideBubble.addEventListener('click', function() {
        bubble.style.opacity = "0";
        sleep(100).then(() => {
          bubble.style.display = "none";
          hideBubble.style.display = "none";
        });
      });
    } else {
      console.log("Not logged in");
    };
  })

}());
