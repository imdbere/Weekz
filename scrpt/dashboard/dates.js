function Week (weekOffset)
{
  this.date = new Date();
  this.date.setDate(this.date.getDate() + (weekOffset*7));
  this.getWeekBeginDate = function(){
    var currentWeekDay = this.date.getDay();
    var lessDays = currentWeekDay == 0 ? 6 : currentWeekDay-1;
    return new Date(new Date().setDate(this.date.getDate()- lessDays));
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
