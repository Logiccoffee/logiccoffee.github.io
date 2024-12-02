import { getJSON, postJSON } from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.7/croot.js";
import { putJSON } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.3/api.js";

// Array untuk menyimpan data kategori
let categories = [];
let currentEditIndex = null; // Untuk menyimpan index kategori yang sedang diedit
let currentDeleteIndex = null; // Untuk menyimpan index kategori yang akan dihapus

const apiUrl = 'https://asia-southeast2-awangga.cloudfunctions.net/logiccoffee/data/category';

// Ambil token dari cookie dengan nama 'login'
const token = getCookie('login');
if (!token) {
    alert('Token tidak ditemukan, harap login terlebih dahulu!');
    throw new Error("Token tidak ditemukan. Harap login ulang.");
}

// Panggil getJSON untuk mengambil data kategori
getJSON(apiUrl, "Login", token, (response) => {
    if (response.status === 200) {
        categories = response.data.data || []; // Menyimpan data kategori yang ada
        displayCategories(response);
    } else {
        console.error(`Error: ${response.status}`);
        alert("Gagal memuat data kategori. Silakan coba lagi.");
    }
});

// Fungsi untuk menampilkan data kategori di dalam tabel
function displayCategories(response) {
    // Validasi apakah response.data.data ada
    if (!response || !response.data || !response.data.data) {
        console.error("Data kategori tidak ditemukan di respons API.");
        alert("Data kategori tidak valid. Silakan hubungi administrator.");
        return;
    }

    const categoryData = response.data.data; // Ambil data kategori dari respons
    const container = document.querySelector('.menu-container'); // Ambil container untuk kartu menu

    // Pastikan elemen container ditemukan
    if (!container) {
        console.error("Elemen dengan class 'menu-container' tidak ditemukan.");
        return;
    }

    // Hapus konten lama di dalam container
    container.innerHTML = '';

    // Loop melalui data kategori untuk membuat elemen kartu
    categoryData.forEach((item) => {
        // Membuat elemen kartu kategori
        const card = document.createElement('div');
        card.className = 'menu-card';

        // Menambahkan gambar kategori (jika ada)
        const img = document.createElement('img');
        img.src = item.image || 'placeholder.jpg'; // Gunakan 'placeholder.jpg' jika tidak ada gambar
        img.alt = item.name;

        // Menambahkan nama kategori
        const name = document.createElement('h3');
        name.className = 'searchable';
        name.textContent = item.name;

        // Menambahkan elemen ke dalam kartu
        card.appendChild(img);
        card.appendChild(name);

        // Menambahkan kartu ke dalam container
        container.appendChild(card);
    });
}



// Fungsi untuk mendapatkan nilai cookie berdasarkan nama
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null; // Jika cookie tidak ditemukan
}
function getCategoryImage(categoryName) {
    // Daftar gambar default berdasarkan nama kategori
    const defaultImages = {
        "Signature": "bg/noncaffee-removebg-preview.png",
        "Manual Brew": "bg/manual.png",
        "Coffee": "bg/coffee.png",
        "Non-Coffee": "bg/noncoffee.png",
        "Mocktail": "bg/mocktail.png",
        "Mojito": "bg/mojito.png",
    };

    // Kembalikan gambar yang sesuai, atau gunakan gambar placeholder
    return defaultImages[categoryName] || "bg/placeholder.png";
}

function displayCategories(response) {
    if (!response || !response.data || !response.data.data) {
        console.error("Data kategori tidak ditemukan di respons API.");
        alert("Data kategori tidak valid. Silakan hubungi administrator.");
        return;
    }

    const categoryData = response.data.data;
    const container = document.querySelector('.menu-container');

    if (!container) {
        console.error("Elemen dengan class 'menu-container' tidak ditemukan.");
        return;
    }

    container.innerHTML = '';

    categoryData.forEach((item) => {
        const card = document.createElement('div');
        card.className = 'menu-card';

        // Dapatkan gambar default berdasarkan nama kategori
        const img = document.createElement('img');
        img.src = getCategoryImage(item.name); // Panggil fungsi untuk menentukan gambar
        img.alt = item.name;

        const name = document.createElement('h3');
        name.className = 'searchable';
        name.textContent = item.name;

        card.appendChild(img);
        card.appendChild(name);
        container.appendChild(card);
    });
}
