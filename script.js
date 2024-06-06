function redirectToIndex() {
    window.location.href = "/index.html";
}

function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    const isOpen = menu.classList.contains("open");
    
    if (isOpen) {
      menu.classList.remove("open");
      icon.classList.remove("open");
    } else {
      menu.classList.add("open");
      icon.classList.add("open");
    }
  }
const toggle = document.getElementById("toggle");

function changeCSSFile(filename) {
    document.getElementById("stylesheet").href = filename;
}

function saveToggleState() {
    localStorage.setItem("darkModeEnabled", toggle.checked);
}

function loadToggleState() {
    const darkModeEnabled = localStorage.getItem("darkModeEnabled");
    if (darkModeEnabled === "true") {
        toggle.checked = true;
        changeCSSFile("dark.css");
    } else {
        toggle.checked = false;
        changeCSSFile("light.css");
    }
}

toggle.addEventListener("change", function() {
    if (toggle.checked) {
        changeCSSFile("dark.css");
    } else {
        changeCSSFile("light.css");
    }
    saveToggleState(); 
});


document.addEventListener("DOMContentLoaded", function() {
    loadToggleState();
    
});


// Define the admin code
const adminCode = 'japan';


function promptForAdminCode() {
    const enteredCode = prompt('Enter admin code:');

    
    if (enteredCode === adminCode) {
        window.location.href = '/gallery.html';
    } else {
        alert('Incorrect admin code. Access denied.');
    }
}

// Attach the click event to the "Gallery" links
document.getElementById('galleryLink').addEventListener('click', function(event) {
    event.preventDefault();

    document.getElementById('passwordOverlay').style.display = 'block';
});

document.getElementById('hamburger-galleryLink').addEventListener('click', function(event) {
    event.preventDefault();

    document.getElementById('passwordOverlay').style.display = 'block';
});


document.getElementById('galleryLinkFooter').addEventListener('click', function(event) {
    event.preventDefault();

    document.getElementById('passwordOverlay').style.display = 'block';
});

document.getElementById('adminCodeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    handleAdminPasswordSubmit();
});


function handleAdminPasswordSubmit() {
    const enteredCode = document.getElementById('adminCodeInput').value;

   
    if (enteredCode === adminCode) {
        
        window.location.href = '/gallery.html';
    } else {

        alert('Incorrect admin code. Access denied.');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.read-more-btn');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const container = this.closest('.details-container');
            const textContent = container.querySelector('.read-more-text');
            const isExpanded = container.classList.toggle('expanded');

            if (isExpanded) {
                textContent.style.display = 'block';
                this.textContent = 'Read Less';
            } else {
                textContent.style.display = 'none';
                this.textContent = 'Read More';
            }
        });
    });
});

