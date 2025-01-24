// Preloader script
const greetings = ["👋 Hello", "👋 你好", "👋 Selemat Datang", "👋 வணக்கம்"];

const preloader = document.querySelector(".preloader");
const preloaderText = document.querySelector(".preloader-text");
let currentIndex = 0;

// Function to show the next greeting
function showNextGreeting() {
  // Fade out the current greeting before changing to the next one
  preloaderText.classList.remove("fade-in");
  preloaderText.classList.add("fade-out");

  setTimeout(() => {
    // Set the new greeting text
    preloaderText.textContent = greetings[currentIndex];
    preloaderText.classList.remove("fade-out");
    preloaderText.classList.add("fade-in");

    // Move to the next greeting
    currentIndex = (currentIndex + 1) % greetings.length;

    // If not the last greeting, continue the sequence
    if (currentIndex !== 0) {
      setTimeout(showNextGreeting, 500);
    } else {
      // Once all greetings are displayed, fade out preloader
      fadeOutPreloader();
    }
  }, 200); // Short delay between greetings
}

// Function to fade out and hide the preloader
function fadeOutPreloader() {
  preloader.style.opacity = "0";

  // After fade out is complete, hide preloader
  setTimeout(() => {
    preloader.style.display = "none";

    // Initialize AOS after the preloader disappears
    AOS.init({
      duration: 1200, // Duration for animations
      once: true, // Ensure animations are triggered only once
    });
    AOS.refresh(); // Recalculate the positions and triggers for AOS
  }, 500); // Wait for the fade-out transition to complete
}

// Check if the preloader should be skipped
window.addEventListener("load", () => {
  const urlHash = window.location.hash;

  if (urlHash === "#portfolio") {
    // Skip preloader and directly scroll to the #portfolio section
    preloader.style.display = "none";

    const portfolioSection = document.querySelector("#portfolio");
    if (portfolioSection) {
      portfolioSection.scrollIntoView();
    }

    // Initialize AOS immediately
    AOS.init({
      duration: 1200,
      once: true,
    });
    AOS.refresh();
  } else {
    // Start the preloader sequence
    showNextGreeting();
  }
});

const projectItems = document.querySelectorAll(".project-item");
const imagePreview = document.getElementById("image-preview");

// Map project titles to their descriptions
const projectDescriptions = {
  "Name Card Design":
    "A front & backname card design that i did for my graded assignment.",
  "Chat Stickers Design":
    "A chat stickers design that i did for my graded assignment.",
  "Portfolio Website Design":
    "A portfolio website that i did for my graded assignment.",
  "Grocery App UI":
    "A Grocery App UI",
   "Football Apparel App":
    "A football apparel app done using mysql, node.js & express.",
    "Football Quiz App":
    "A football quiz app done using react native.",
    "Cuisine Section List App":
    "A cuisine section list app done using react native.",
    "Recipe Manager App":
    "A recipe manager app that calculates the total cooking time",
    "Cat Breed Finder App":
    "A cat breed finder App that allows users to search for and explore a variety of cat breeds",
    "StyleShop App":
    "An e-commerce ui design app",
};

projectItems.forEach((item) => {
  item.addEventListener("mouseenter", (e) => {
    const title = item.querySelector(".project-title").textContent.trim();
    if (projectDescriptions[title]) {
      imagePreview.textContent = projectDescriptions[title]; // Set the description text
      imagePreview.style.display = "block"; // Show the preview
    }
  });

  item.addEventListener("mousemove", (e) => {
    imagePreview.style.top = `${e.pageY + 10}px`;
    imagePreview.style.left = `${e.pageX + 10}px`;
  });

  item.addEventListener("mouseleave", () => {
    imagePreview.style.display = "none"; // Hide the preview when the mouse leaves
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".filter-button");
  const projectItems = document.querySelectorAll(".project-item");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove "active" class from all buttons
      buttons.forEach((btn) => btn.classList.remove("active"));
      // Add "active" class to the clicked button
      button.classList.add("active");

      const filter = button.getAttribute("data-filter");

      // Show/Hide project items based on the filter
      projectItems.forEach((item) => {
        if (filter === "all" || item.getAttribute("data-category") === filter) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.getElementById("preloader"); // Adjust ID based on your preloader
  if (window.location.hash === "#portfolio") {
    // Skip preloader if navigating directly to #portfolio
    if (preloader) {
      preloader.style.display = "none";
    }
    const portfolioSection = document.querySelector("#portfolio");
    if (portfolioSection) {
      portfolioSection.scrollIntoView();
    }
  }
});

const viewMoreButton = document.getElementById("view-more-button");
const hiddenItems = document.querySelectorAll(".project-item.hidden");

viewMoreButton.addEventListener("click", () => {
  hiddenItems.forEach((item) => {
    item.classList.toggle("hidden");
  });

  // Change button text based on state
  if (viewMoreButton.textContent === "Show More") {
    viewMoreButton.textContent = "Show Less";
  } else {
    viewMoreButton.textContent = "Show More";
  }
});
