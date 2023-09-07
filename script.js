function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", function () {
  const stylesheetLink = document.getElementById("stylesheet");

  // Function to change the CSS file
  function changeCSSFile(newCSSFileName) {
    stylesheetLink.href = newCSSFileName;
  }

  

  const toggle = document.getElementById("toggle");
  toggle.addEventListener("change", function() {
    if (toggle.checked) {
        changeCSSFile("dark.css");
    } else {
        changeCSSFile("light.css");
    }
});
});
