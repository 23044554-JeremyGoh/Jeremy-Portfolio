document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".carousel-track");
    const slides = Array.from(track.children);
    const nextButton = document.querySelector(".carousel-button-right");
    const prevButton = document.querySelector(".carousel-button-left");
  
    const slideWidth = slides[0].getBoundingClientRect().width;
  
    // Arrange the slides next to one another
    slides.forEach((slide, index) => {
      slide.style.left = `${slideWidth * index}px`;
    });
  
    const moveToSlide = (track, currentSlide, targetSlide) => {
      track.style.transform = `translateX(-${targetSlide.style.left})`;
      currentSlide.classList.remove("current-slide");
      targetSlide.classList.add("current-slide");
    };
  
    // Click next button
    nextButton.addEventListener("click", () => {
      const currentSlide = track.querySelector(".current-slide");
      const nextSlide = currentSlide.nextElementSibling;
      if (nextSlide) {
        moveToSlide(track, currentSlide, nextSlide);
      }
    });
  
    // Click previous button
    prevButton.addEventListener("click", () => {
      const currentSlide = track.querySelector(".current-slide");
      const prevSlide = currentSlide.previousElementSibling;
      if (prevSlide) {
        moveToSlide(track, currentSlide, prevSlide);
      }
    });
  });
  
  const galleryImages = document.querySelectorAll(".gallery img");
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  const modalCaption = document.getElementById("modalCaption");
  
  let currentIndex = 0;
  
  // Open the modal with the clicked image
  galleryImages.forEach((img, index) => {
    img.addEventListener("click", () => {
      currentIndex = index;
      showModal();
    });
  });
  
  // Show modal with the current image
  function showModal() {
    const image = galleryImages[currentIndex];
    modal.style.display = "flex"; // Show modal
    modalImage.src = image.src; // Set image source
    modalCaption.textContent = image.dataset.caption; // Set caption
  }
  
  // Close the modal
  function closeModal() {
    modal.style.display = "none";
  }
  
  // Navigate through images in the modal
  function navigateModal(direction) {
    currentIndex = (currentIndex + direction + galleryImages.length) % galleryImages.length; // Loop back
    showModal();
  }
  
  // Close modal on click outside or Esc key
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  