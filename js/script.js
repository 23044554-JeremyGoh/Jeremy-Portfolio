// Preloader script
const greetings = ["• Hello", "• Bonjour", "• Ciao", "• Ola", "• やあ", "• Hallå", "• مرحباً", "• Guten Tag", "• Hallo"];
const preloader = document.querySelector(".preloader");
const preloaderText = document.querySelector(".preloader-text");

function playPreloaderAnimation() {
  let index = 0;

  // 1. Show the first greeting immediately
  preloaderText.textContent = greetings[0];
  
  // Fade it in
  requestAnimationFrame(() => {
    preloaderText.classList.add("fade-in");
  });

  // 2. Wait for the first word to sit there (1.2 seconds)
  setTimeout(() => {
    
    // 3. Start the "Fast Forward" effect
    // We update the text every 150ms without fading out
    const interval = setInterval(() => {
      index++;

      // If we have greetings left to show
      if (index < greetings.length) {
        preloaderText.textContent = greetings[index];
      } else {
        // Stop the cycle and slide up
        clearInterval(interval);
        slideUpPreloader();
      }
    }, 150); // Speed of the fast forward (lower number = faster)

  }, 1200); // Duration the first "Hello" stays visible
}

function slideUpPreloader() {
  preloader.classList.add("slide-up");

  // Initialize AOS
  setTimeout(() => {
    if (typeof AOS !== 'undefined') {
      AOS.init({ duration: 800, once: true });
      AOS.refresh();
    }
  }, 200);

  // Remove from display after animation
  setTimeout(() => {
    preloader.style.display = "none";
  }, 900);
}

// Initial Load Logic
window.addEventListener("load", () => {
  const urlHash = window.location.hash;

  if (urlHash === "#portfolio") {
    preloader.style.display = "none";
    const portfolioSection = document.querySelector("#portfolio");
    if (portfolioSection) portfolioSection.scrollIntoView();
    if (typeof AOS !== 'undefined') AOS.init({ duration: 800, once: true });
  } else {
    // Start the new animation sequence
    playPreloaderAnimation();
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
    "A portfolio website design that i did for my graded assignment.",
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
    "Travel List App":
    "A travel list app done using react",
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

