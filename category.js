import { postJSON } from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.7/croot.js";
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

// Fungsi getJSON dengan header Content-Type: application/json
function getJSONWithContentType(apiUrl, token, callback) {
    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json', // Header yang diubah
            'Authorization': `Bearer ${token}` // Header untuk autentikasi
        }
    })
    .then(response => response.json().then(data => ({ status: response.status, data })))
    .then(callback)
    .catch(error => console.error('Error fetching JSON:', error));
}

// Panggil getJSON untuk mengambil data kategori
getJSONWithContentType(apiUrl, token, (response) => {
    if (response.status === 200) {
        categories = response.data.data || []; // Menyimpan data kategori yang ada
        displayCategories(response);
    } else {
        console.error(`Error: ${response.status}`);
        alert("Gagal memuat data kategori. Silakan coba lagi.");
    }
});

// Fungsi untuk menampilkan data kategori di dalam menu-container
function displayCategories(response) {
    // Validasi apakah response.data.data ada
    if (!response || !response.data || !response.data.data) {
        console.error("Data kategori tidak ditemukan di respons API.");
        alert("Data kategori tidak valid. Silakan hubungi administrator.");
        return;
    }

    const categoryData = response.data.data; // Ambil data kategori dari respons
    const container = document.getElementById('menu-container'); // Menggunakan menu-container

    // Pastikan elemen container ditemukan
    if (!container) {
        console.error("Elemen dengan id 'menu-container' tidak ditemukan.");
        return;
    }
    // Tampilkan data di dalam container
    container.innerHTML = ''; // Hapus data lama jika ada

    categoryData.forEach((item, index) => {
        // Membuat div untuk setiap kategori
        const categoryCard = document.createElement('div');
        categoryCard.classList.add('category-card', 'd-flex', 'justify-content-between', 'align-items-center', 'p-3', 'border', 'rounded', 'mb-3');
        
        // Kolom Nama Kategori
        const nameDiv = document.createElement('div');
        nameDiv.classList.add('category-name');
        nameDiv.textContent = item.name;

        // Kolom Aksi
        const actionDiv = document.createElement('div');
        actionDiv.classList.add('category-actions');

        // Tombol Ubah
        const editButton = document.createElement('button');
        editButton.className = 'btn btn-warning me-2';
        editButton.innerHTML = '<i class="fas fa-pen"></i> Ubah';
        // Event listener untuk tombol Ubah
        editButton.addEventListener('click', () => {
            console.log(`Edit kategori dengan index: ${index}`);
            // Menyimpan index kategori yang sedang diedit
            currentEditIndex = index;

            // Menampilkan modal edit kategori
            const modal = new bootstrap.Modal(document.getElementById('editCategoryModal'));
            modal.show();

            // Mengisi input form dengan nama kategori yang dipilih
            document.getElementById('edit-category-name').value = categories[index].name;
        });

        // Tombol Hapus
        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger';
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i> Hapus';
        // Event listener untuk tombol Hapus
        deleteButton.addEventListener('click', () => {
            console.log(`Hapus kategori dengan index: ${index}`);
            openDeleteModal(index);
        });

        // Tambahkan tombol ke kolom aksi
        actionDiv.appendChild(editButton);
        actionDiv.appendChild(deleteButton);

        // Tambahkan kolom nama kategori dan aksi ke dalam card
        categoryCard.appendChild(nameDiv);
        categoryCard.appendChild(actionDiv);

        // Tambahkan card ke dalam container
        container.appendChild(categoryCard);
    });
}

// Fungsi untuk mendapatkan nilai cookie berdasarkan nama
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null; // Jika cookie tidak ditemukan
}

// Fungsi untuk menambah kategori
function addCategory(event) {
    event.preventDefault(); // Mencegah form submit biasa agar bisa menggunakan JavaScript

    const categoryName = document.getElementById('category-name').value.trim();

    // Validasi input kategori
    if (categoryName === '') {
        alert('Nama kategori tidak boleh kosong!');
        return false;
    }

    // Membuat objek kategori baru
    const newCategory = { name: categoryName };

    // Log untuk memeriksa data yang akan dikirim
    console.log('Kategori yang akan ditambahkan:', newCategory);

    // Memanggil fungsi postJSON dari library untuk mengirimkan data kategori ke API
    postJSON(apiUrl, 'Authorization', token, newCategory, (response) => {
        if (response.status >= 200 && response.status < 300) {
            alert('Kategori berhasil ditambahkan!');
            const modal = bootstrap.Modal.getInstance(document.getElementById('addCategoryModal'));
            modal.hide(); // Menutup modal
            getJSONWithContentType(apiUrl, token, displayCategories); // Ambil data terbaru
        } else {
            alert('Gagal menambah kategori!');
        }
    });
}

// Fungsi untuk membuka modal hapus kategori
function openDeleteModal(index) {
    currentDeleteIndex = index;
    const modal = new bootstrap.Modal(document.getElementById('deleteCategoryModal'));
    modal.show();
}

// Fungsi untuk menghapus kategori
document.getElementById('confirm-delete-btn').addEventListener('click', () => {
    if (currentDeleteIndex !== null) {
        const targetUrl = `${apiUrl}/${categories[currentDeleteIndex].id}`;

        fetch(targetUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.status === 200) {
                categories.splice(currentDeleteIndex, 1); // Hapus kategori dari array
                displayCategories({ data: { data: categories } }); // Render ulang daftar kategori
                alert('Kategori berhasil dihapus!');
                const modal = bootstrap.Modal.getInstance(document.getElementById('deleteCategoryModal'));
                modal.hide();
            } else {
                alert('Gagal menghapus kategori!');
            }
        })
        .catch(error => console.error('Error deleting category:', error));
    }
});

// Event listener untuk form tambah kategori
document.getElementById('add-category-form').addEventListener('submit', addCategory);
