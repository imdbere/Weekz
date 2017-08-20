
function loadDetailData(id) {

  NProgress.start();
  NProgress.configure({ minimum: 0.1 });

  dataRefProject.child(id).once('value', function(snap) {
      var title = snap.val().info.projectTitle;
      var summary = snap.val().info.projectSummary;
      var description = snap.val().info.projectDesc;
      var color = snap.val().info.projectColor;
      var percentage = snap.val().info.percentage;

      var completed = 0;
      var outstanding = 0;

      dataRefProject.child(id).child('tasks').once('value', function(data) {
        data.forEach( function(taskId) {

          dataRefTasks.child(taskId.key).once('value', function (taskData) {
            var checkState = taskData.val().checked;
            var name = taskData.val().taskName;
            var desc = taskData.val().taskDesc;

            generateProjectTask(name, desc, checkState, color, taskId.key)
          })
        })
      }).then(function() {
        var li = generateProjectDetails(title, summary, description, color, percentage);
      })

  }).then(function() {
    NProgress.done();
  });
}
