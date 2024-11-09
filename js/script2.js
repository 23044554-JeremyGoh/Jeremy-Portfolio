// Preloader script
const greetings = [
    "Hello",
    "你好",
    "Selemat Datang",
    "안녕하세요",
    "Ciao",
    "Olá",
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
        
        if (currentIndex < greetings.length - 1) {
            setTimeout(showNextGreeting, 800); // Faster delay between greetings (800ms instead of 1000ms)
        } else {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 300); // Shortened fade-out duration (300ms instead of 500ms)
            }, 800); // Faster transition before hiding preloader
        }
    }, 300); // Shortened fade-out duration before the next greeting (300ms instead of 500ms)
}

window.addEventListener('load', showNextGreeting);





document.addEventListener('DOMContentLoaded', function () {
    const text = "Hey there! Welcome to my portfolio! ";
    const typewriterElement = document.getElementById("typewriter");
    const emojiElement = document.querySelector(".wave-emoji");
    let index = 0;

    function type() {
        if (index < text.length) {
            typewriterElement.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, 75); // Faster typing speed (75ms instead of 100ms)
        } else {
            // Once typing is done, add the waving class to the emoji
            emojiElement.classList.add("waving-emoji");
        }
    }

    type();
});

