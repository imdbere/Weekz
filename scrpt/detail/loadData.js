
function loadDetailData(id) {

  NProgress.start();
  NProgress.configure({ minimum: 0.1 });

  dataRefProject.child(id).once('value', function(snap) {
    snap.forEach(function (data) {
      var title = data.val().projectTitle;
      var summary = data.val().projectSummary;
      var description = data.val().projectDesc;
      var color = data.val().projectColor;
      var percentage = data.val().percentage;

      generateProjectDetails(title, summary, description, color, percentage);
    });
  }).then(function() {
    NProgress.done();
  });
}
