// Global Date
var currentWeek = new Date();

function setDates(plus) {

    // Loading Dates for Dashboard labels
    var dt = currentWeek; //current date of week
    var currentWeekDay = dt.getDay();

    var lessDays = currentWeekDay == 0 ? 6 : currentWeekDay-1;
    var wkStart = new Date(new Date(dt).setDate(dt.getDate() + plus - lessDays));
    currentWeekString = wkStart.getDate() + "" + (wkStart.getMonth() + 1) + "" + wkStart.getFullYear();

    for (var i = 0; i < 6; i++) {
      var id = "date" + (i+1);
      var dateId = document.getElementById(id);
      var dateStart = wkStart;

      dateId.innerText = dateStart.getDate() + "." + (dateStart.getMonth() + 1) + "." + dateStart.getFullYear();;
      wkStart.setDate(wkStart.getDate() + 1);
    }

    return currentWeekString;
}
