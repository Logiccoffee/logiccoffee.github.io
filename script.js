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

// Function to move the carousel to the right
nextButton.addEventListener('click', () => {
    const trackWidth = track.scrollWidth;
    const containerWidth = track.parentElement.offsetWidth;

    // If we have reached the end of the track, reset to the first product
    if (currentPosition + containerWidth < trackWidth) {
        currentPosition += slideWidth;
        track.style.transform = `translateX(-${currentPosition}px)`;
    } else {
        // Reset to the start of the carousel
        currentPosition = 0;
        track.style.transition = 'none'; // Disable transition during reset
        track.style.transform = `translateX(0)`;

        setTimeout(() => {
            track.style.transition = 'transform 0.3s ease'; // Re-enable transition
        }, 50);
    }
    updateHighlight();
});

// Function to move the carousel to the left
prevButton.addEventListener('click', () => {
    // If we are at the start of the carousel, move to the last product
    if (currentPosition > 0) {
        currentPosition -= slideWidth;
        track.style.transform = `translateX(-${currentPosition}px)`;
    } else {
        // Reset to the end of the carousel
        currentPosition = track.scrollWidth / 2;
        track.style.transition = 'none';
        track.style.transform = `translateX(-${currentPosition}px)`;

        setTimeout(() => {
            track.style.transition = 'transform 0.3s ease'; // Re-enable transition
        }, 50);
    }
    updateHighlight();
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

document.getElementById('heroImage').addEventListener('click', function () {
    const element = this;
    element.classList.add('animate__animated', 'animate__wobble');
    // Remove animation classes after completion for it to be reusable
    element.addEventListener('animationend', () => {
        element.classList.remove('animate__animated', 'animate__wobble');
    });
});

function searchProducts() {
    // Ambil nilai pencarian dari input
    const query = document.getElementById('search-input').value.toLowerCase();
 
    // Ambil semua elemen yang memiliki class "searchable"
    const items = document.querySelectorAll('.searchable');

    // Hapus highlight sebelumnya
    items.forEach(item => {
        item.classList.remove('highlight');
    });

    // Variabel untuk menentukan apakah ada hasil pencarian
    let found = false;

    // Loop untuk mengecek setiap item
    items.forEach(item => {
        const text = item.textContent.toLowerCase(); // Ambil teks dari elemen
        if (text.includes(query)) {
            item.classList.add('highlight'); // Tambahkan highlight
            found = true;
     
            // Scroll ke elemen yang ditemukan
            item.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    });

    // Jika tidak ditemukan, beri tahu pengguna
    if (!found) {
        alert("Produk tidak ditemukan!");
    }
}
