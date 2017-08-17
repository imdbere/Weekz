(function() {

  const bugRef = firebase.database().ref().child('feedback');

  // Get Elements
  var feedbackBody = document.getElementById('feedback');
  var feedbackName = document.getElementById('fbName');
  var feedbackMessage = document.getElementById('fbMessage');
  var feedbackBtn = document.getElementById('fbSubmit');
  var feedbackWrap = document.getElementById('wrap');
  var hideFeedback = document.getElementById('minimizeFb');
  var showFeedback = document.getElementById('openFb');

  showFeedback.addEventListener('click', function() {
    feedbackWrap.style.height = "370px";
    feedback.style.width = "250px";
  });

  hideFeedback.addEventListener('click', function() {
    feedbackWrap.style.height = "0px";
    feedback.style.width = "50px";
    feedbackBtn.style.background = "#662D90";
    feedbackBtn.innerText = "SEND";
    feedbackName.value = "";
    feedbackMessage.value = "";
  });

  feedbackBtn.addEventListener('click', function() {

    if (feedbackName.value != "" && feedbackMessage.value != "") {
      bugRef.push().update({name: feedbackName.value, message: feedbackMessage.value}).then(function() {
        feedbackBtn.style.background = "#0BE370";
        feedbackBtn.innerText = "SENT";
        feedbackName.value = "";
        feedbackMessage.value = "";
        feedbackName.style.border = "none"
        feedbackMessage.style.border = "none";
      });
    } else {
      feedbackName.style.border = "1px solid #FF514C"
      feedbackMessage.style.border = "1px solid #FF514C";
    }
  });

}());
