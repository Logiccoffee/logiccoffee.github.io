// Carousel Script
const track = document.querySelector('.carousel-track');
const slides = Array.from(document.querySelectorAll('.product-card'));
const prevButton = document.querySelector('.prev-btn');
const nextButton = document.querySelector('.next-btn');

// Hitung panjang slide
const slideWidth = slides[0].offsetWidth;
let currentPosition = 0;

// Highlight produk tengah
function updateHighlight() {
    const trackRect = track.getBoundingClientRect();
    const trackCenter = trackRect.left + trackRect.width / 2;

    slides.forEach((slide) => {
        const slideRect = slide.getBoundingClientRect();
        const slideCenter = slideRect.left + slideRect.width / 2;

        if (Math.abs(slideCenter - trackCenter) < slideWidth / 2) {
            slide.classList.add('highlight');
        } else {
            slide.classList.remove('highlight');
        }
    });
}

// Geser ke kanan
nextButton.addEventListener('click', () => {
    const trackWidth = track.scrollWidth;
    const containerWidth = track.parentElement.offsetWidth;

    if (currentPosition + containerWidth < trackWidth) {
        currentPosition += slideWidth;
        track.style.transform = `translateX(-${currentPosition}px)`;
        updateHighlight();
    }
});

// Geser ke kiri
prevButton.addEventListener('click', () => {
    if (currentPosition > 0) {
        currentPosition -= slideWidth;
        track.style.transform = `translateX(-${currentPosition}px)`;
        updateHighlight();
    }
});

// Inisialisasi highlight pertama
updateHighlight();
window.addEventListener('load', updateHighlight); 


