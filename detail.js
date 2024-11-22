import { postJSON } from 'https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.4/api.js';  // Path API eksternal
import { onClick } from 'https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.4/element.js';  // Path element.js eksternal

// Data Produk
const products = {
    "kopisusu": {
        name: "Kopi Susu",
        description: "A delightful mix of rich coffee and creamy milk, perfect for any time of the day.",
        about: "Kopi susu adalah campuran kopi espresso dan susu segar, sering diberi tambahan gula atau sirup untuk rasa manis.",
        price: "Rp. 16.000",
        image: "bg/kopsu.png",
        orderLink: "https://logiccoffee.github.io/menu/"
    },
    "vanillabliss": {
        name: "Vanilla Bliss",
        description: "A smooth blend of coffee with a fragrant hint of vanilla.",
        about: "Minuman ini dibuat dari kopi, susu, dan sirup vanila yang memberikan rasa manis harum.",
        price: "Rp. 15.000",
        image: "bg/vanilla_bliss.png",
        orderLink: "https://logiccoffee.github.io/menu/"
    },
    "machastrawberry": {
        name: "Macha Strawberry",
        description: "A refreshing combination of matcha and strawberry.",
        about: "Minuman ini memadukan matcha premium dengan stroberi segar, menciptakan rasa segar yang unik.",
        price: "Rp. 18.000",
        image: "bg/sm.png",
        orderLink: "https://logiccoffee.github.io/menu/"
    }
};

// Ambil parameter dari URL
const urlParams = new URLSearchParams(window.location.search);
const productKey = urlParams.get('product');

// Ambil elemen untuk detail produk
const productNameElem = document.getElementById('product-name');
const productDescriptionElem = document.getElementById('product-description');
const productAboutElem = document.getElementById('product-about');
const productPriceElem = document.getElementById('product-price');
const productImageElem = document.getElementById('product-image');
const orderLinkElem = document.getElementById('order-link');

// Isi data produk berdasarkan query string
if (products[productKey]) {
    const product = products[productKey];
    productNameElem.textContent = product.name;
    productDescriptionElem.textContent = product.description;
    productAboutElem.textContent = product.about;
    productPriceElem.textContent = product.price;
    productImageElem.src = product.image;
    productImageElem.alt = product.name;
    orderLinkElem.href = product.orderLink;
} else {
    // Jika produk tidak ditemukan
    productNameElem.textContent = "Produk Tidak Ditemukan";
    productDescriptionElem.textContent = "";
    productAboutElem.textContent = "";
    productPriceElem.textContent = "";
    productImageElem.src = "";
    productImageElem.alt = "";
    orderLinkElem.style.display = "none";
}

// Event listener untuk tombol "Pesan"
onClick('order-link', function() {
    const orderData = {
        product: productKey,
        name: productNameElem.textContent,
        description: productDescriptionElem.textContent,
        price: productPriceElem.textContent,
        image: productImageElem.src
    };

    // Kirim data ke server (misalnya menggunakan postJSON untuk integrasi API)
    postJSON('https://your-api-endpoint', orderData, function(response) {
        console.log('Data berhasil dikirim', response);
    });
});
