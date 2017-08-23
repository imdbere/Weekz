
function loadDetailData(id) {

  NProgress.start();
  NProgress.configure({ minimum: 0.1 });

  dataRefProject.child(id).once('value', function(snap) {
      var title = snap.val().info.projectTitle;
      var summary = snap.val().info.projectSummary;
      var description = snap.val().info.projectDesc;
      var color = snap.val().info.projectColor;

      var tasks = snap.val().tasks;
      console.log(tasks);
      if (tasks != null)
      {
        var taskCount = 0;
        var tasksCompleted = 0;
        var promiseList = [];

        for (taskID in tasks)
        {
          promiseList.push(dataRefTasks.child(taskID).once('value').then(function(task) {

            var checkState = task.val().checked;
            var name = task.val().taskName;
            var desc = task.val().taskDesc;

            console.log(task.key);

            taskCount++;
            if (checkState)
              tasksCompleted++;

            generateProjectTask(name, desc, checkState, color, task.key);
          }));
        }
        Promise.all(promiseList).then(function (result)
        {
          generateProjectDetails(title, summary, description, color, taskCount, tasksCompleted);
        });

      }
      else
      {
        generateProjectDetails(title, summary, description, color, 0, 0);
      }

  }).then(function() {
    NProgress.done();
  });
}
