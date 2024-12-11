//javascript for the page
document.getElementById("currentYear").textContent = new Date().getFullYear() + " Utkarsh";
        
$(window).on("load", function () {
    $(".loader-container").fadeOut("slow");
});

function toggleTheme() {
    $('*').toggleClass('dark-mode');
    // Toggle dark mode preference
    if ($('*').hasClass('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.removeItem('darkMode');
    }
}
// Check if dark mode preference is saved and apply it
if (localStorage.getItem('darkMode') === 'enabled') {
    $('*').addClass('dark-mode');
}

document.onreadystatechange = function () {
    let progressBar = document.getElementById('progress-bar');
    if (document.readyState === 'interactive') {
        progressBar.style.width = '75%'; // Midway point
    } else if (document.readyState === 'complete') {
        progressBar.style.width = '100%'; // Fully loaded
        setTimeout(function () {
            document.getElementById('progress-bar-container').style.display = 'none'; // Hide the progress bar
        }, 1000); // Delay to allow the user to see the fully loaded state
    }
};
