
function loadAndAddProjects() {

  NProgress.start();
  NProgress.configure({ minimum: 0.1 });

  dataRefProject.once('value', function(project) {
    project.forEach(function (data) {
      var info = data.val().info;
      var dashDiv = document.getElementById('dash');
      var projectId = data.key;

      var title = info.projectTitle;
      var summary = info.projectSummary;
      var description = info.projectDesc;
      var color = info.projectColor;
      //var percentage = info.percentage;

      var tasks = data.val().tasks;
      if (tasks != null)
      {
        var taskCount = 0;
        var tasksCompleted = 0;
        var promiseList = [];

        for (taskID in tasks)
        {
          promiseList.push(dataRefTasks.child(taskID).once('value').then(function(task) {
            taskCount++;
            if (task.val().checked)
              tasksCompleted++;
          }));
        }
        Promise.all(promiseList).then(function (result)
        {
          percentage = Math.floor(tasksCompleted * 100 / taskCount);
          var projectDiv = generateProject(title, summary, color, percentage, projectId);
          dashDiv.insertBefore(projectDiv, addBtn);
        });
        
      }
      else
      {
        var projectDiv = generateProject(title, summary, color, 0, projectId);
        dashDiv.insertBefore(projectDiv, addBtn);
      }

    });
  }).then(function() {
    NProgress.done();
  });
}
