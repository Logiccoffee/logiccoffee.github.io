import { getJSON } from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.7/croot.js";

// Array untuk menyimpan data kategori
let categories = [];
const apiUrl = 'https://asia-southeast2-awangga.cloudfunctions.net/logiccoffee/data/category';

// Ambil token dari cookie dengan nama 'login'
const token = getCookie('login');
if (!token) {
    alert('Token tidak ditemukan, harap login terlebih dahulu!');
    throw new Error("Token tidak ditemukan. Harap login ulang.");
}

// Panggil API untuk mendapatkan data kategori
getJSON(apiUrl, "Login", token, (response) => {
    if (response.status === 200) {
        categories = response.data.data || []; // Simpan data kategori ke array
        displayCategories(response);
    } else {
        console.error(`Error: ${response.status}`);
        alert("Gagal memuat data kategori. Silakan coba lagi.");
    }
});

// Fungsi untuk menampilkan data kategori
function displayCategories(response) {
    // Validasi data kategori dari respons
    if (!response?.data?.data) {
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

    // Kosongkan kontainer sebelum menampilkan data
    container.innerHTML = '';

    // Iterasi untuk setiap kategori dan tambahkan ke dalam kontainer
    categoryData.forEach((item) => {
        const card = document.createElement('div');
        card.className = 'menu-card';

        const name = document.createElement('h3');
        name.className = 'searchable';
        name.textContent = item.name;

        card.appendChild(name);
        container.appendChild(card);
    });
}

// Fungsi untuk mendapatkan nilai cookie berdasarkan nama
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    return parts.length === 2 ? parts.pop().split(';').shift() : null;
}
