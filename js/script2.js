// Preloader script
const greetings = [
    "👋 Hello",
    "👋 你好", 
    "👋 Selemat Datang",
    "👋 வணக்கம்",
];

const preloader = document.querySelector('.preloader');
const preloaderText = document.querySelector('.preloader-text');
let currentIndex = 0;

function showNextGreeting() {
    preloaderText.classList.remove('fade-in');
    preloaderText.classList.add('fade-out');
    
    setTimeout(() => {
        preloaderText.textContent = greetings[currentIndex];
        preloaderText.classList.remove('fade-out');
        preloaderText.classList.add('fade-in');
        
        currentIndex = (currentIndex + 1) % greetings.length;
        
        if (currentIndex !== 0) {
            setTimeout(showNextGreeting, 500);
        } else {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                    startTypewriter();
                }, 200);
            }, 500);
        }
    }, 200);
}

// Move typewriter code into a separate function
function startTypewriter() {
    const text = "Hey there! Welcome to my portfolio! ";
    const typewriterElement = document.getElementById("typewriter");
    const emojiElement = document.querySelector(".wave-emoji");
    let index = 0;

    function type() {
        if (index < text.length) {
            typewriterElement.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, 75);
        } else {
            emojiElement.classList.add("waving-emoji");
        }
    }

    type();
}
// Remove the DOMContentLoaded event listener and just use load
window.addEventListener('load', showNextGreeting);
