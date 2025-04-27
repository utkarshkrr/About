var tabLinks = document.getElementsByClassName("tab_links");
var tabContents = document.getElementsByClassName("tab_contents");

// Tab switching with smooth transition
function openTab(tabName) {
    var tabLinks = document.getElementsByClassName('tab_links');
    var tabContents = document.getElementsByClassName('tab_contents');

    for (var i = 0; i < tabLinks.length; i++) {
        tabLinks[i].classList.remove('activeLink');
    }

    for (var i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove('activeTab');
        tabContents[i].style.display = "none"; // Hide all tabs
    }

    event.currentTarget.classList.add('activeLink');

    var currentTab = document.getElementById(tabName);
    currentTab.style.display = "block"; // Show the clicked tab

    setTimeout(function() {
        currentTab.classList.add('activeTab'); // Trigger smooth transition
    }, 10);
}


var sideMenu = document.getElementById("sideMenu");

function openMenu() {
  sideMenu.style.right = "0";
}
function closeMenu() {
  sideMenu.style.right = "-200px";
}

let totalcount = 0; // use let (not var twice)

const scriptURL = 'https://script.google.com/macros/s/AKfycbx4_0LBjWRtdgfIu7vGkJoUOi0uyWdpFecYaCGo3lBCWgX4qZYkxZkVlN33TrA5rLE6/exec';
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById("msg");
const count = document.getElementById("count"); // fix here (no 'var totalcount' again)

form.addEventListener('submit', e => {
  e.preventDefault();

  const name = form['Name'].value.trim();
  const email = form['Email'].value.trim();
  const message = form['Message'].value.trim();

  // Validation
  const nameRegex = /^[a-zA-Z\s]{3,50}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!nameRegex.test(name)) {
    alert("Please enter a valid name (only letters and spaces, 2-50 characters).");
    return;
  }
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }
  if (message.length < 10) {
    alert("Message should be at least 10 characters long.");
    return;
  }

  // If all validations pass
  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then(response => {
      msg.innerHTML = "Your message was sent successfully.";
      setTimeout(function () {
        msg.innerHTML = "";
      }, 3000);
      form.reset();

      // Increment and update count only after successful submit
      totalcount++;
      count.innerHTML = `${totalcount}`;
    })
    .catch(error => console.error('Error!', error.message));
});

$(window).on("load", function () {
    $("#loaderContainer").fadeOut("slow");
});