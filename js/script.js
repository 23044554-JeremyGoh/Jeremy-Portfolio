// ===============================
// PRELOADER
// ===============================
const greetings = [
  "• Hello",
  "• Bonjour",
  "• Ciao",
  "• Ola",
  "• やあ",
  "• Hallå",
  "• مرحباً",
  "• Guten Tag",
  "• Hallo"
];

const preloader = document.querySelector(".preloader");
const preloaderText = document.querySelector(".preloader-text");

function playPreloaderAnimation() {
  if (!preloader || !preloaderText) return;

  let index = 0;
  preloaderText.textContent = greetings[0];
  requestAnimationFrame(() => preloaderText.classList.add("fade-in"));

  setTimeout(() => {
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
  if (!preloader) return;
  preloader.classList.add("slide-up");
  setTimeout(() => {
    if (typeof AOS !== "undefined") {
      AOS.init({ duration: 800, once: true });
    }
  }, 200);
  setTimeout(() => (preloader.style.display = "none"), 900);
}

window.addEventListener("load", () => {
  if (window.location.hash === "#portfolio") {
    if (preloader) preloader.style.display = "none";
    document.querySelector("#portfolio")?.scrollIntoView();
    if (typeof AOS !== "undefined") {
      AOS.init({ duration: 800, once: true });
    }
  } else {
    playPreloaderAnimation();
  }
});

// ==================================
// HOVER DESCRIPTION PREVIEW
// ==================================
const projectItems = document.querySelectorAll(".project-item");
const imagePreview = document.getElementById("image-preview");

const projectDescriptions = {
  "Name Card Design": "Front & back name card design created for a graded assignment.",
  "Chat Stickers Design": "A fun sticker set designed for messaging apps.",
  "Portfolio Website Design": "Personal portfolio website UI concept for a graded assignment.",
  "Grocery App UI": "A modern grocery shopping UI focusing on product browsing and checkout.",
  "StyleShop App": "Fashion e-commerce app UI with category browsing and product details.",
  "Football Apparel App": "Full-stack app built with MySQL, Node.js & Express for managing football products.",
  "Football Quiz App": "Quiz app built with React Native featuring football trivia questions.",
  "Recipe Manager App": "React Native app that manages recipes and calculates total cooking time.",
  "Cat Breed Finder App": "React Native app for exploring different cat breeds with details.",
  "Travel List App": "React app to manage travel packing lists and trip items.",
  "Laptop Inventory App": "React prototype to replace Excel-based laptop tracking."
};

projectItems.forEach(item => {
  item.addEventListener("mouseenter", () => {
    const titleEl = item.querySelector(".project-title");
    if (!titleEl) return;
    const title = titleEl.textContent.trim();
    if (projectDescriptions[title]) {
      imagePreview.textContent = projectDescriptions[title];
      imagePreview.style.display = "block";
    }
  });

  item.addEventListener("mousemove", e => {
    if (!imagePreview) return;
    imagePreview.style.top = `${e.pageY + 10}px`;
    imagePreview.style.left = `${e.pageX + 10}px`;
  });

  item.addEventListener("mouseleave", () => {
    if (!imagePreview) return;
    imagePreview.style.display = "none";
  });
});

// ==================================
// FILTER + SHOW MORE SYSTEM
// ==================================
// ==================================
// FILTER + SHOW MORE SYSTEM (UPDATED)
// ==================================
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".filter-button");
  const items = Array.from(document.querySelectorAll(".project-item"));
  const viewMoreButton = document.getElementById("view-more-button");

  const MAX_VISIBLE = 5;
  let currentFilter = "all";
  let showMoreActive = false;

  function updateProjects() {
    let filtered = [];

    if (currentFilter === "all") {
      filtered = items;
    } else {
      filtered = items.filter(i => i.dataset.category === currentFilter);
    }

    // Show only MAX_VISIBLE unless showMoreActive is true
    filtered.forEach((item, index) => {
      if (!showMoreActive && index >= MAX_VISIBLE) {
        item.style.display = "none";
      } else {
        item.style.display = "flex";
      }
    });

    // Hide items outside category
    items.forEach(item => {
      if (!filtered.includes(item)) {
        if (currentFilter === "design") {
          item.style.display = "none";
        } else {
          item.style.display = "none";
        }
      }
    });

    // Show/hide Show More button logic
    if (filtered.length > MAX_VISIBLE && (currentFilter === "all" || currentFilter === "app-development")) {
      viewMoreButton.style.display = "inline-block";
      viewMoreButton.textContent = showMoreActive ? "Show Less" : "Show More";
    } else {
      viewMoreButton.style.display = "none";
    }
  }

  // Filter click
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      buttons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      currentFilter = button.dataset.filter;
      showMoreActive = false; 
      updateProjects();
    });
  });

  // Show more click
  viewMoreButton.addEventListener("click", () => {
    showMoreActive = !showMoreActive;
    updateProjects();
  });

  updateProjects();
});


// ===================================
// SKIP PRELOADER ON HASH (safety double-check)
// ===================================
document.addEventListener("DOMContentLoaded", () => {
  const preloaderEl = document.querySelector(".preloader");
  if (window.location.hash === "#portfolio" && preloaderEl) {
    preloaderEl.style.display = "none";
    document.querySelector("#portfolio")?.scrollIntoView();
  }
});
