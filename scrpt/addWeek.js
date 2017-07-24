(function() {

  const addWeekBtn = document.getElementById('newWeek');
  const prevWeekBtn = document.getElementById('previous');

  var currentWeekDate = "";

  addWeekBtn.addEventListener('click', function() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {

        var userId = firebase.auth().currentUser.uid;
        // Declaring Database Reference
        const dataRef = firebase.database().ref().child('users').child(userId).child('weeks');

        var d = new Date();
        d.setDate(d.getDate() + (7-d.getDay())%7+1);
        var weekId = d.getDate() + "" + (d.getMonth() + 1) + "" + d.getFullYear();
        currentWeek = d;

        var newWeek = dataRef.update({[weekId]: ""});
        currentWeekId = weekId;
        console.log(currentWeek);
        console.log(currentWeekId);
      } else {
        console.log("Not logged in");
      };
    });
  });



  prevWeekBtn.addEventListener('click', function() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {

        var date = currentWeek;
        var day = date.getDay();
        var prevMonday;

        prevMonday = new Date(new Date().setDate(date.getDate() - 7));
        var weekId = prevMonday.getDate() + "" + (prevMonday.getMonth() + 1) + "" + prevMonday.getFullYear();

        currentWeek = prevMonday;
        currentWeekId = weekId;
        console.log(currentWeek);
        console.log(currentWeekId);
      } else {
        console.log("Not logged in");
      };
    });
  });
}());
