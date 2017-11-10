function Week (weekOffset)
{
  this.date = new Date();
  //this.date.setDate(this.date.getDate() + (weekOffset*7));
  this.date = new Date( this.date.getTime() + weekOffset * 7 * 86400000);
  this.getWeekBeginDate = function(){
    var currentWeekDay = this.date.getDay();
    var lessDays = currentWeekDay == 0 ? 6 : currentWeekDay-1;
    var d = new Date(this.date);
    d.setDate(this.date.getDate() - lessDays);
    return d;
  };
  
  this.getWeekID = function(){
    var wkStart = this.getWeekBeginDate();
    var currentWeekString = wkStart.getDate() + "" + (wkStart.getMonth() + 1) + "" + wkStart.getFullYear();
    return currentWeekString;
  };

  this.getDayAsString = function(dayOffset){
    var wkStart = this.getWeekBeginDate();
    wkStart.setDate(wkStart.getDate() + dayOffset);
    var day = ("0" + (wkStart.getDate())).slice(-2);
    var month = ("0" + (wkStart.getMonth() + 1)).slice(-2);
    var s = day + "." + month + "." + wkStart.getFullYear();

    return s;
  };
}
