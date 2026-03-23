// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const icon = themeToggle.querySelector('i');
const body = document.body;

// Check for saved theme preference or OS default
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    body.setAttribute('data-theme', 'dark');
    icon.className = 'fas fa-sun';
}

themeToggle.addEventListener('click', () => {
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        icon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        icon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
    }
});

// Typewriter Effect
const textElement = document.querySelector('.typewriter');
const phrases = [
    'Backend Developer.',
    'Microservices Architect.',
    'Java & Spring Boot Enthusiast.',
    'I build scalable systems.'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        textElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50; // Faster when deleting
    } else {
        textElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 1500; // Pause before deleting
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500; // Pause before typing next phrase
    }

    setTimeout(type, typingSpeed);
}

// Start the typewriter effect
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, 1000);
});
