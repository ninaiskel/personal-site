const toggleSwitch = document.querySelector('.switch input[type="checkbox"]');

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
}

toggleSwitch.addEventListener("change", switchTheme);

//animations
const gaspAnimation = (id) =>
  gsap.to(id, {
    duration: 2,
    ease: "bounce.out",
    x: 0,
  });

gaspAnimation("#about-title");

function handleScroll() {
  const { top } = document.querySelector("body").getBoundingClientRect();

  if (top < -350) gaspAnimation("#projects-title");
  if (top < -1970) gaspAnimation("#articles-title");
  if (top < -2230) gaspAnimation("#contact-title");
}

document.addEventListener("scroll", handleScroll);
