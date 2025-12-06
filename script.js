// ----------------------
// THEME TOGGLE (Dark mode by default)
// ----------------------
const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;

// Default: dark mode
if (localStorage.getItem("theme") === "light") {
    // User previously chose light mode
    body.classList.remove("dark");
    toggleBtn.textContent = "🌙";
} else {
    // Default dark mode
    body.classList.add("dark");
    toggleBtn.textContent = "☀️";
}

// Toggle theme
toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
        toggleBtn.textContent = "☀️";
        localStorage.setItem("theme", "dark");
    } else {
        toggleBtn.textContent = "🌙";
        localStorage.setItem("theme", "light");
    }
});

// ----------------------
// LIGHTBOX / GALLERY
// ----------------------
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const galleryImages = document.querySelectorAll('.gallery-img');
const closeBtn = document.querySelector('.lightbox .close');
const prevBtn = document.querySelector('.lightbox .prev');
const nextBtn = document.querySelector('.lightbox .next');

let currentIndex = 0;

// Show lightbox for clicked image
function showLightbox(index) {
    currentIndex = index;
    lightbox.style.display = 'flex';
    lightboxImg.src = galleryImages[currentIndex].src;
}

// Assign click event to all gallery images
galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => showLightbox(index));
});

// Close lightbox
closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

// Close if click outside image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.style.display = 'none';
});

// Next/Prev buttons
nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % galleryImages.length;
    lightboxImg.src = galleryImages[currentIndex].src;
});

prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentIndex].src;
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') {
        if (e.key === 'ArrowRight') nextBtn.click();
        if (e.key === 'ArrowLeft') prevBtn.click();
        if (e.key === 'Escape') closeBtn.click();
    }
});
