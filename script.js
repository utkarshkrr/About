var tabLinks = document.getElementsByClassName("tab_links");
var tabContents = document.getElementsByClassName("tab_contents");

// Tab switching with smooth transition
function openTab(tabName) {
    for (var i = 0; i < tabLinks.length; i++) {
        tabLinks[i].classList.remove('activeLink');
    }

    for (var i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove('activeTab');
        tabContents[i].style.display = "none";
    }

    event.currentTarget.classList.add('activeLink');

    var currentTab = document.getElementById(tabName);
    currentTab.style.display = "block";

    setTimeout(function () {
        currentTab.classList.add('activeTab');
    }, 10);
}

// Mobile menu open/close
var sideMenu = document.getElementById("sideMenu");

function openMenu() {
    sideMenu.style.right = "0";
}

function closeMenu() {
    sideMenu.style.right = "-200px";
}

// Close menu when clicking outside
document.addEventListener('click', function (event) {
    const isClickInsideMenu = sideMenu.contains(event.target);
    const isHamburger = event.target.closest('.fa-bars');

    if (!isClickInsideMenu && !isHamburger) {
        closeMenu();
    }
});

// Contact form submission
const scriptURL = 'https://script.google.com/macros/s/AKfycbx4_0LBjWRtdgfIu7vGkJoUOi0uyWdpFecYaCGo3lBCWgX4qZYkxZkVlN33TrA5rLE6/exec';
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById("msg");

form.addEventListener('submit', e => {
    e.preventDefault();

    const submitButton = form.querySelector("button[type='submit']");
    submitButton.disabled = true;
    submitButton.innerText = "Sending...";

    const name = form['Name'].value.trim();
    const email = form['Email'].value.trim();
    const message = form['Message'].value.trim();

    const nameRegex = /^[a-zA-Z\s]{3,50}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRegex.test(name)) {
        alert("Please enter a valid name (only letters and spaces, 3-50 characters).");
        resetSubmitButton(submitButton);
        return;
    }

    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        resetSubmitButton(submitButton);
        return;
    }

    if (message.length < 3) {
        alert("Message should be at least 3 characters long.");
        resetSubmitButton(submitButton);
        return;
    }

    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            msg.innerHTML = "Your message was sent successfully.";
            form.reset();
            setTimeout(() => {
                msg.innerHTML = "";
                resetSubmitButton(submitButton);
            }, 1000);
        })
        .catch(error => {
            console.error('Error!', error.message);
            alert("Something went wrong. Please try again.");
            resetSubmitButton(submitButton);
        });
});

function resetSubmitButton(button) {
    button.disabled = false;
    button.innerText = "Send";
    updateTotalResponses();
}

//total responses
function updateTotalResponses() {
    fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vT-F73pp_2T24hMqYgATPMW0KE68iOYHC15W8FqwM3I_GCFPVhuOnhwwVT9uW4CA5xv0oIXLMfVWPtq/pub?gid=1037094470&single=true&output=csv')
        .then(response => response.text())
        .then(csvText => {
            const rows = csvText.trim().split('\n').map(row => row.split(','));
            const totalResponses = rows[2][1];

            document.getElementById('count').innerHTML = `<span class="number">${totalResponses}</span> messages and counting.`;
        })
        .catch(err => {
            console.error('Error loading CSV:', err);
            document.getElementById('count').innerHTML = 'Loading...';
        });
}

updateTotalResponses();

// Loader fade out on page load
$(window).on("load", function () {
    $("#loaderContainer").fadeOut("slow");
});



console.log("%cHold up, you really check console logs huh? 🤨😂", "color: #1298ff; font-size: 16px; font-weight: bold;");
setTimeout(() => {
    console.log("Loading secret data...");
}, 500);
setTimeout(() => {
    console.log("%c[###@4$%*GARBLED DATA*%$#@!###]", "color: #0b66ab;");
}, 1500);
setTimeout(() => {
    console.log("%cFetching XOR matrices... 10101010101", "color: #ff69b4;");
}, 2000);
setTimeout(() => {
    console.log("%cDecrypting hex payload... cafebabe1234deadbeef", "color: #f39c12;");
}, 2500);
setTimeout(() => {
    console.log("Just kidding, there's nothing here 😁");
}, 3000);
setTimeout(() => {
    console.log("But since you're here... https://www.youtube.com/watch?v=dQw4w9WgXcQ 🎶");
}, 3500);
