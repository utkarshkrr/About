const observer  = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting){
            entry.target.classList.add('show');
        }
        else{
            entry.target.classList.remove('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.home, .about, .projects, .html-css-project-button, .contact');
hiddenElements.forEach((el) => observer.observe(el));
