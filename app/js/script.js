const toggleSwitch = document.querySelector('.switch input[type="checkbox"]');

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
}

toggleSwitch.addEventListener("change", switchTheme);

// projects

// const container = document.querySelector(".container");
// const project = document.querySelector(".project");

// const prespectiveProject = function(e) {
//   console.log(project.offsetWidth, project.offsetHeight);
//   console.log(e.clientX, e.clientY);
// };

// project.addEventListener("mouseover", prespectiveProject);
