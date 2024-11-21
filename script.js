// Import required modules
import { addCSSInHead } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.1.6/element.js";
import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js';
import { getCookie } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.3/cookie.js";



// Add SweetAlert2 CSS
await addCSSInHead("https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.css");

// Initialize jscroot after page load to trigger animations
document.addEventListener("DOMContentLoaded", () => {
    jscroot.init(); // This will initialize jscroot and trigger fade-in and other effects
});

// Carousel Script
// Carousel Script
const track = document.querySelector('.carousel-track');
const slides = Array.from(document.querySelectorAll('.product-card'));
const prevButton = document.querySelector('.prev-btn');
const nextButton = document.querySelector('.next-btn');

// Calculate slide width
const slideWidth = slides[0].offsetWidth;
let currentPosition = 0;

// Function to highlight the centered product
function updateHighlight() {
    const trackRect = track.getBoundingClientRect();
    const trackCenter = trackRect.left + trackRect.width / 2;

    slides.forEach((slide) => {
        const slideRect = slide.getBoundingClientRect();
        const slideCenter = slideRect.left + slideRect.width / 2;

        // Add or remove the highlight class based on position
        if (Math.abs(slideCenter - trackCenter) < slideWidth / 2) {
            slide.classList.add('highlight');
        } else {
            slide.classList.remove('highlight');
        }
    });
}

// Move the carousel to the right
nextButton.addEventListener('click', () => {
    const trackWidth = track.scrollWidth;
    const containerWidth = track.parentElement.offsetWidth;

    if (currentPosition + containerWidth < trackWidth) {
        currentPosition += slideWidth;
        track.style.transform = `translateX(-${currentPosition}px)`;
        updateHighlight();
    }
});

// Move the carousel to the left
prevButton.addEventListener('click', () => {
    if (currentPosition > 0) {
        currentPosition -= slideWidth;
        track.style.transform = `translateX(-${currentPosition}px)`;
        updateHighlight();
    }
});

// Initialize highlight on first load
updateHighlight();

// Recheck highlight when page is loaded
window.addEventListener('load', updateHighlight);

// Example of using SweetAlert2 for product info
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => {
        Swal.fire({
            title: 'Product Info',
            text: `Details about the product: ${card.querySelector('.product-name').innerText}`,
            icon: 'info',
            confirmButtonText: 'Close'
        });
    });
});

// Additional integration with cookies or DOM manipulation (if necessary)
const productInfo = getCookie('productInfo');  // Example if cookie.js provides a getCookie function
if (productInfo) {
    console.log(`Stored Product Info: ${productInfo}`);
}

// Example DOM manipulation with element.js
addClassToElement(track, 'initialized');  // Example if element.js provides a helper like addClassToElement
