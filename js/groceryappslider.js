const galleryImages = document.querySelectorAll('.gallery img');
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');

// Open modal on image click
galleryImages.forEach(img => {
  img.addEventListener('click', () => {
    modal.style.display = 'flex'; // Show the modal
    modalImage.src = img.src; // Set the clicked image as the modal content
  });
});

// Close modal function
function closeModal() {
  modal.style.display = 'none'; // Hide the modal
}

// Close modal when clicking outside the image
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});


function goToPortfolio() {
    window.location.href = "index.html?skipPreloader=true#portfolio";
}


