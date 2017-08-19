
function loadAndAddProjects() {

  NProgress.start();
  NProgress.configure({ minimum: 0.1 });

  dataRefProject.once('value', function(project) {
    project.forEach(function (info) {
      info.forEach(function (data) {

        var dashDiv = document.getElementById('dash');
        var projectId = info.key;

        var title = data.val().projectTitle;
        var summary = data.val().projectSummary;
        var description = data.val().projectDesc;
        var color = data.val().projectColor;
        var percentage = data.val().percentage;

        generateProject(title, summary, color, percentage, projectId);
        dashDiv.insertBefore(projectDiv, addBtn);
      });
    });
  }).then(function() {
    NProgress.done();
  });
}
