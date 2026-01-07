// --- 1. INITIAL SETUP & LIBRARIES ---
gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);


// --- 2. PRELOADER LOGIC (PRESERVED) ---
// Note: I modified the sequence slightly to account for the new structure,
// but the words and timing logic remain.

const greetings = ["• Hello", "• Hallå", "• नमस्ते"];
const preloader = document.querySelector(".preloader");
const preloaderText = document.querySelector(".preloader-text");

function playPreloaderAnimation() {
    let index = 0;
    preloaderText.textContent = greetings[0];
    
    // Fade In
    requestAnimationFrame(() => preloaderText.classList.add("fade-in"));

    // Wait 1.2s for first word
    setTimeout(() => {
        // Fast forward effect
        const interval = setInterval(() => {
            index++;
            if (index < greetings.length) {
                preloaderText.textContent = greetings[index];
            } else {
                clearInterval(interval);
                slideUpPreloader();
            }
        }, 150);
    }, 1200);
}

function slideUpPreloader() {
    preloader.classList.add("slide-up");
    
    // Trigger Landing Animations after preloader moves
    setTimeout(() => {
        initLandingAnimations();
    }, 600);
}

// Check Load State
window.addEventListener("load", () => {
    if(window.location.hash === "#portfolio") {
        preloader.style.display = "none";
        initLandingAnimations();
    } else {
        playPreloaderAnimation();
    }
});


// --- 3. ANIMATIONS ---

function initLandingAnimations() {
    // Hero Text Stagger
    gsap.from(".hero-line", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power4.out"
    });
}

// Text Reveal on Scroll (About Section)
const textElements = document.querySelectorAll(".reveal-text");
textElements.forEach(text => {
    // Split text logic would go here for letter-by-letter, 
    // but for simplicity we use opacity scrub
    gsap.to(text, {
        backgroundPositionX: "0%",
        stagger: 1,
        scrollTrigger: {
            trigger: text,
            start: "top 80%",
            end: "bottom 20%",
            scrub: true,
            // We use a CSS gradient hack for the text reveal color change
            onEnter: () => text.style.color = "#fff" 
        }
    });
});

// Horizontal Scroll (Desktop Only)
if (window.innerWidth > 1024) {
    const workSection = document.querySelector(".work-section");
    const container = document.querySelector(".work-container");
    
    // Calculate total width to scroll
    let sections = gsap.utils.toArray(".work-container > div");
    
    gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
            trigger: ".work-section",
            pin: true,
            scrub: 1,
            // Snap to sections roughly
            // snap: 1 / (sections.length - 1),
            end: () => "+=" + container.offsetWidth
        }
    });
}


// --- 4. CUSTOM CURSOR & MAGNETISM ---

const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

window.addEventListener("mousemove", (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // Dot follows immediately
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Outline follows with lag
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Magnetic Buttons
const magneticBtns = document.querySelectorAll(".magnetic-link, .magnetic-btn");
magneticBtns.forEach(btn => {
    btn.addEventListener("mousemove", (e) => {
        const position = btn.getBoundingClientRect();
        const x = e.clientX - position.left - position.width / 2;
        const y = e.clientY - position.top - position.height / 2;

        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
        cursorOutline.style.width = "60px";
        cursorOutline.style.height = "60px";
        cursorOutline.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
    });

    btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translate(0px, 0px)";
        cursorOutline.style.width = "40px";
        cursorOutline.style.height = "40px";
        cursorOutline.style.backgroundColor = "transparent";
    });
});