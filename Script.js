

const typingText = document.querySelector(".typing-text");

const words = [
    "Frontend Developer",
    "Web Designer",
    "JavaScript Developer",
    "UI/UX Designer"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    if (!typingText) return;

    const currentWord = words[wordIndex];

    if (!isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1200);
            return;
        }
    } else {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
    }

    setTimeout(typeEffect, isDeleting ? 60 : 100);
}

typeEffect();


const sections = document.querySelectorAll("section");

sections.forEach(section => {
    section.style.opacity = "0";
    section.style.transform = "translateY(30px)";
    section.style.transition = "all 0.6s ease";
});

function revealSections() {
    sections.forEach(section => {
        const top = section.getBoundingClientRect().top;

        if (top < window.innerHeight - 100) {
            section.style.opacity = "1";
            section.style.transform = "translateY(0)";
        }
    });
}

window.addEventListener("scroll", revealSections);
window.addEventListener("load", revealSections);


// Active Navbar 

const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});


// Sticky Navbar Shadow

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (!navbar) return;

    navbar.style.boxShadow =
        window.scrollY > 50
            ? "0 5px 20px rgba(0,0,0,0.15)"
            : "none";
});

//  HAMBURGER MENU 

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-links");

if (hamburger && navMenu) {

    hamburger.addEventListener("click", function(e) {
        e.stopPropagation(); 
        navMenu.classList.toggle("show");
        hamburger.classList.toggle("active");
    });


    navLinks.forEach(link => {
        link.addEventListener("click", function() {
            navMenu.classList.remove("show");
            hamburger.classList.remove("active");
        });
    });


    document.addEventListener("click", function(e) {
        if (navMenu.classList.contains("show") && !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            navMenu.classList.remove("show");
            hamburger.classList.remove("active");
        }
    });
}

// THEME TOGGLE 

const themeToggle = document.querySelector(".theme-toggle");

if (themeToggle) {
    themeToggle.addEventListener("click", function(e) {
        e.stopPropagation(); // <--- यह नई लाइन है
        document.body.classList.toggle("dark");

        const icon = themeToggle.querySelector("i");
        if (document.body.classList.contains("dark")) {
            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");
        } else {
            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");
        }
    });
}