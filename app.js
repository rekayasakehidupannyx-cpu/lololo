// Manajemen Dynamic Admin PIN dari localStorage
let ADMIN_PIN = localStorage.getItem('umkm_admin_pin') || "1234";

// Helper untuk Konversi File Unggahan ke Format Permanen Base64 Data URL
function convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

// Toast Notification
function showToast(message) {
    const toast = document.getElementById("custom-toast");
    document.getElementById("toast-msg").innerText = message;
    toast.classList.remove("translate-x-full", "opacity-0");
    setTimeout(() => {
        toast.classList.add("translate-x-full", "opacity-0");
    }, 3000);
}

// Custom Confirm Modal
let confirmCallback = null;
function showCustomConfirm(title, text, callback) {
    document.getElementById("confirm-title").innerText = title;
    document.getElementById("confirm-text").innerText = text;
    confirmCallback = callback;
    document.getElementById("custom-confirm-modal").classList.remove("hidden");
}

document.getElementById("confirm-cancel-btn").addEventListener("click", () => {
    document.getElementById("custom-confirm-modal").classList.add("hidden");
    confirmCallback = null;
});

document.getElementById("confirm-yes-btn").addEventListener("click", () => {
    document.getElementById("custom-confirm-modal").classList.add("hidden");
    if(confirmCallback) confirmCallback();
    confirmCallback = null;
});

// Logo Toko Data
let logoToko = localStorage.getItem('umkm_logo_toko') || 'https://placehold.co/100x100/7A3E1D/ffffff?text=Logo';
function muatLogoToko() {
    document.getElementById("store-logo-display").src = logoToko;
}

// Data Foto Utama / Hero
function muatFotoUtama() {
    const storedHeroImg = localStorage.getItem('umkm_hero_img');
    if(storedHeroImg) {
        document.getElementById("hero-display-img").src = storedHeroImg;
    }
}

// Data Header & Hero Section Text
const defaultHeroText = {
    storeName: "Keripik Singkong Maknyus",
    storeLocation: "Singosari, Malang",
    badge: "Keripik rumahan khas Singosari",
    title: "Keripik Singkong Maknyus Singosari",
    subtext: "Renyahnya Bikin Nagih, Gurihnya Pas di Hati!"
};
let heroTextData = JSON.parse(localStorage.getItem('umkm_hero_text')) || defaultHeroText;

function renderHeroText() {
    document.getElementById("store-name-display").innerText = heroTextData.storeName;
    document.getElementById("store-location-display").innerText = heroTextData.storeLocation;
    document.getElementById("hero-badge-display").innerText = heroTextData.badge;
    document.getElementById("hero-title-display").innerText = heroTextData.title;
    document.getElementById("hero-subtext-display").innerText = heroTextData.subtext;

    // Update form inputs in admin
    document.getElementById("admin-store-name").value = heroTextData.storeName;
    document.getElementById("admin-store-location").value = heroTextData.storeLocation;
    document.getElementById("admin-hero-badge").value = heroTextData.badge;
    document.getElementById("admin-hero-title").value = heroTextData.title;
    document.getElementById("admin-hero-subtext").value = heroTextData.subtext;
}

// Data Informasi Usaha, Kontak & Jam Buka
const defaultKontak = {
    alamat: "Jl. Raya Singosari No. 45, Malang, Jawa Timur",
    wa: "0812-3456-7890",
    medsos: "@keripiksingkongsingosari",
    jamSenin: "08.00 - 17.00 WIB",
    jamMinggu: "Tutup",
    mapsUrl: "https://maps.google.com/?q=Singosari+Malang",
    mapsIframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.548074987216!2d112.6578!3d-7.8856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwNTMnMguMiJTIDExMsKwMzknMjguMSJF!5e0!3m2!1sid!2sid!4v1600000000000!5m2!1sid!2sid"
};
let kontakUsaha = JSON.parse(localStorage.getItem('umkm_kontak')) || defaultKontak;

function dapatkanNomorWaBersih(noWa) {
    let bersihkan = noWa.replace(/[^0-9]/g, '');
    if(bersihkan.startsWith('0')) {
        bersihkan = '62' + bersihkan.slice(1);
    }
    return bersihkan || "6281234567890";
}

function renderKontakUsaha() {
    document.getElementById("display-alamat").innerText = kontakUsaha.alamat;
    document.getElementById("display-wa").innerText = kontakUsaha.wa;
    document.getElementById("display-medsos").innerText = kontakUsaha.medsos;
    document.getElementById("display-jambuka-senin").innerText = kontakUsaha.jamSenin;
    document.getElementById("display-jambuka-minggu").innerText = kontakUsaha.jamMinggu;
    
    if(kontakUsaha.mapsUrl) {
        document.getElementById("display-maps-link").href = kontakUsaha.mapsUrl;
    }

    // Isi Form Admin
    document.getElementById("admin-alamat").value = kontakUsaha.alamat;
    document.getElementById("admin-wa").value = kontakUsaha.wa;
    document.getElementById("admin-medsos").value = kontakUsaha.medsos;
    document.getElementById("admin-jambuka-senin").value = kontakUsaha.jamSenin;
    document.getElementById("admin-jambuka-minggu").value = kontakUsaha.jamMinggu;
    document.getElementById("admin-maps-url").value = kontakUsaha.mapsUrl;

    // Update WA Links
    updateSemuaTautanWA();
}

function buatTautanWA(pesan) {
    const numWA = dapatkanNomorWaBersih(kontakUsaha.wa);
    return `https://wa.me/${numWA}?text=${encodeURIComponent(pesan)}`;
}

function updateSemuaTautanWA() {
    const pesanUmum = "Halo Kak, saya ingin memesan produk Keripik Singkong Maknyus.";
    document.getElementById("hero-wa-btn").href = buatTautanWA(pesanUmum);
    document.getElementById("contact-wa-btn").href = buatTautanWA(pesanUmum);
    document.getElementById("floating-wa-btn").href = buatTautanWA(pesanUmum);
}

// Data Cerita Usaha & Statistik
const defaultCerita = {
    teks: "Keripik Singkong Maknyus dibuat dari singkong pilihan hasil tani lokal Singosari dengan resep turun-temurun. Kami mengutamakan kebersihan dan rasa gurih alami di setiap gigitannya untuk kepuasan pelanggan setia.",
    tahun: "2018",
    pemilik: "Ibu Siti",
    karyawan: "5 Orang"
};
let ceritaUsaha = JSON.parse(localStorage.getItem('umkm_cerita')) || defaultCerita;

function renderCeritaUsaha() {
    document.getElementById("cerita-usaha-display").innerText = ceritaUsaha.teks;
    document.getElementById("stat-tahun-display").innerText = ceritaUsaha.tahun;
    document.getElementById("stat-pemilik-display").innerText = ceritaUsaha.pemilik;
    document.getElementById("stat-karyawan-display").innerText = ceritaUsaha.karyawan;

    // Form Admin
    document.getElementById("admin-cerita-teks").value = ceritaUsaha.teks;
    document.getElementById("admin-stat-tahun").value = ceritaUsaha.tahun;
    document.getElementById("admin-stat-pemilik").value = ceritaUsaha.pemilik;
    document.getElementById("admin-stat-karyawan").value = ceritaUsaha.karyawan;
}

// Data 3 Poin Fakta Utama
const defaultFakta = [
    {
        id: 1,
        judul: "100% Singkong Pilihan Asli",
        deskripsi: "Dipilih langsung dari petani lokal terbaik.",
        iconSvg: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>'
    },
    {
        id: 2,
        judul: "Tanpa Bahan Pengawet Buatan",
        deskripsi: "Aman dan sehat dikonsumsi setiap hari.",
        iconSvg: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
    },
    {
        id: 3,
        judul: "Diproduksi Setiap Hari",
        deskripsi: "Menjaga kerenyahan dan kesegaran rasa.",
        iconSvg: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>'
    }
];
let faktaList = JSON.parse(localStorage.getItem('umkm_fakta')) || defaultFakta;

function renderFakta() {
    const container = document.getElementById("fakta-singkat-container");
    if(!container) return;
    container.innerHTML = "";

    faktaList.forEach(f => {
        const card = document.createElement("div");
        card.className = "bg-white p-6 rounded-2xl shadow-sm border border-amber-100/80 flex items-start space-x-4";
        card.innerHTML = `
            <div class="p-3 rounded-xl bg-amber-100/70 text-amber-800">
                ${f.iconSvg}
            </div>
            <div>
                <h3 class="font-bold text-gray-900">${f.judul}</h3>
                <p class="text-sm text-gray-500 mt-1">${f.deskripsi}</p>
            </div>
        `;
        container.appendChild(card);
    });

    // Form Admin Fakta
    const adminFaktaContainer = document.getElementById("admin-fakta-inputs");
    if(adminFaktaContainer) {
        adminFaktaContainer.innerHTML = "";
        faktaList.forEach((f, idx) => {
            const wrap = document.createElement("div");
            wrap.className = "p-4 bg-amber-50/40 border border-amber-200/80 rounded-2xl space-y-3";
            wrap.innerHTML = `
                <span class="font-bold text-amber-950 text-xs uppercase">Poin Fakta ${idx + 1}</span>
                <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1">Judul Fakta</label>
                    <input type="text" id="fakta-judul-${f.id}" value="${f.judul}" class="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm bg-white focus:ring-2 focus:ring-amber-600 focus:outline-none">
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1">Deskripsi Fakta</label>
                    <input type="text" id="fakta-desc-${f.id}" value="${f.deskripsi}" class="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm bg-white focus:ring-2 focus:ring-amber-600 focus:outline-none">
                </div>
            `;
            adminFaktaContainer.appendChild(wrap);
        });
    }
}

// Data Keunggulan Kami
const defaultKeunggulan = [
    {
        id: 1,
        judul: "Singkong segar pilihan petani lokal",
        deskripsi: "Dipetik langsung dari lahan petani terbaik di kawasan Singosari."
    },
    {
        id: 2,
        judul: "Bumbu rempah tradisional berkualitas",
        deskripsi: "Menggunakan racikan rempah murni tanpa bahan kimia tambahan."
    },
    {
        id: 3,
        judul: "Proses higienis dan terjamin",
        deskripsi: "Dibuat dengan standar kebersihan tinggi untuk menjaga kualitas produk."
    }
];
let keunggulanList = JSON.parse(localStorage.getItem('umkm_keunggulan')) || defaultKeunggulan;

function renderKeunggulan() {
    const container = document.getElementById("keunggulan-list-display");
    if (!container) return;
    container.innerHTML = "";

    keunggulanList.forEach((item, index) => {
        const elem = document.createElement("div");
        elem.className = "flex items-start space-x-4 p-4 rounded-xl bg-amber-50/30 border border-amber-100";
        elem.innerHTML = `
            <div class="w-8 h-8 rounded-full bg-amber-800 text-white flex items-center justify-center font-bold flex-shrink-0 text-sm">${index + 1}</div>
            <div>
                <h4 class="font-bold text-gray-900">${item.judul}</h4>
                <p class="text-sm text-gray-600 mt-0.5">${item.deskripsi}</p>
            </div>
        `;
        container.appendChild(elem);
    });

    renderAdminKeunggulanList();
}

function renderAdminKeunggulanList() {
    const adminContainer = document.getElementById("admin-keunggulan-list");
    if (!adminContainer) return;
    adminContainer.innerHTML = "";

    keunggulanList.forEach((item, index) => {
        const wrapper = document.createElement("div");
        wrapper.className = "p-4 bg-amber-50/40 border border-amber-200/80 rounded-2xl space-y-3";
        wrapper.innerHTML = `
            <div class="flex items-center space-x-2">
                <span class="w-6 h-6 rounded-full bg-amber-800 text-white flex items-center justify-center font-bold text-xs">${index + 1}</span>
                <span class="font-bold text-amber-950 text-sm">Poin Keunggulan ${index + 1}</span>
            </div>
            <div>
                <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Judul Keunggulan</label>
                <input type="text" id="keung-title-${item.id}" value="${item.judul}" class="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-amber-600 focus:outline-none bg-white">
            </div>
            <div>
                <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Deskripsi Singkat</label>
                <textarea id="keung-desc-${item.id}" rows="2" class="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-amber-600 focus:outline-none bg-white">${item.deskripsi}</textarea>
            </div>
        `;
        adminContainer.appendChild(wrapper);
    });
}

// Data Produk Makanan
const defaultProduk = [
    {
        id: 101,
        nama: "Tahu Kocek Pedas",
        berat: "1 Porsi",
        harga: "Rp 5.000",
        deskripsi: "Tahu goreng dipotong pedas dengan irisan kubis segar dan sambal ulek mantap.",
        foto: "yahu kocekk.jpeg",
        fallbackFoto: "https://placehold.co/400x300/7A3E1D/ffffff?text=Tahu+Kocek"
    },
    {
        id: 102,
        nama: "Tahu Walik Crispy",
        berat: "1 Porsi",
        harga: "Rp 8.000",
        deskripsi: "Tahu walik renyah gurih dengan isian adonan yang lezat dan nagih.",
        foto: "tahu walik.jpeg",
        fallbackFoto: "https://placehold.co/400x300/A0522D/ffffff?text=Tahu+Walik"
    },
    {
        id: 103,
        nama: "Cilok Pedas Rempah",
        berat: "1 Porsi",
        harga: "Rp 6.000",
        deskripsi: "Cilok kenyal disiram bumbu pedas rempah melimpah yang menggugah selera.",
        foto: "cilok pedas.jpeg",
        fallbackFoto: "https://placehold.co/400x300/D48806/ffffff?text=Cilok+Pedas"
    },
    {
        id: 104,
        nama: "Mie Cup Pedas Gurih",
        berat: "1 Cup",
        harga: "Rp 7.000",
        deskripsi: "Sajikan mie nikmat berkuah/kering dengan bumbu spesial dan taburan daun bawang.",
        foto: "mie cup.jpeg",
        fallbackFoto: "https://placehold.co/400x300/E67E22/ffffff?text=Mie+Cup"
    },
    {
        id: 105,
        nama: "Tempura Goreng Crispy",
        berat: "1 Porsi",
        harga: "Rp 5.000",
        deskripsi: "Aneka tempura goreng renyah disajikan dengan saus pedas manis mantap.",
        foto: "tempura.jpeg",
        fallbackFoto: "https://placehold.co/400x300/D35400/ffffff?text=Tempura"
    },
    {
        id: 1,
        nama: "Keripik Singkong Original",
        berat: "250 gram",
        harga: "Rp 12.000",
        deskripsi: "Rasa gurih klasik dengan garam pilihan yang renyah dan nikmat.",
        foto: "img/produk-original.jpg",
        fallbackFoto: "https://placehold.co/400x300/7A3E1D/ffffff?text=Original"
    },
    {
        id: 2,
        nama: "Keripik Singkong Pedas Manis",
        berat: "250 gram",
        harga: "Rp 14.000",
        deskripsi: "Perpaduan cabai segar dan gula jawa asli yang menggugah selera.",
        foto: "img/produk-pedas.jpg",
        fallbackFoto: "https://placehold.co/400x300/A0522D/ffffff?text=Pedas+Manis"
    },
    {
        id: 3,
        nama: "Keripik Singkong Balado",
        berat: "250 gram",
        harga: "Rp 14.000",
        deskripsi: "Bumbu balado khas Nusantara dengan sensasi pedas nendang.",
        foto: "img/produk-balado.jpg",
        fallbackFoto: "https://placehold.co/400x300/D48806/ffffff?text=Balado"
    },
    {
        id: 4,
        nama: "Keripik Singkong Keju Gurih",
        berat: "200 gram",
        harga: "Rp 15.000",
        deskripsi: "Taburan bumbu keju berkualitas tinggi yang gurih dan lumer di mulut.",
        foto: "img/produk-keju.jpg",
        fallbackFoto: "https://placehold.co/400x300/E67E22/ffffff?text=Keju+Gurih"
    },
    {
        id: 5,
        nama: "Keripik Singkong Jagung Bakar",
        berat: "200 gram",
        harga: "Rp 15.000",
        deskripsi: "Aroma manis gurih khas jagung bakar kesukaan semua anggota keluarga.",
        foto: "img/produk-jagung.jpg",
        fallbackFoto: "https://placehold.co/400x300/D35400/ffffff?text=Jagung+Bakar"
    },
    {
        id: 6,
        nama: "Paket Keluarga Puas",
        berat: "500 gram",
        harga: "Rp 25.000",
        deskripsi: "Campuran varian rasa favorit dalam kemasan besar hemat untuk kumpul bersama.",
        foto: "img/produk-paket.jpg",
        fallbackFoto: "https://placehold.co/400x300/8E44AD/ffffff?text=Paket+Keluarga"
    }
];

let produkList = JSON.parse(localStorage.getItem('umkm_produk')) || defaultProduk;

if (produkList.length < defaultProduk.length) {
    produkList = defaultProduk;
    localStorage.setItem('umkm_produk', JSON.stringify(defaultProduk));
}

function renderProduk() {
    const grid = document.getElementById("product-grid");
    const adminList = document.getElementById("admin-product-list");
    if (grid) grid.innerHTML = "";
    if (adminList) adminList.innerHTML = "";

    produkList.forEach((prod) => {
        if (grid) {
            const card = document.createElement("div");
            card.className = "bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-amber-100 transition duration-300 flex flex-col justify-between";
            const pesanTeks = `Halo Kak, saya mau pesan ${prod.nama} (${prod.berat}) - ${prod.harga}`;
            const linkWa = buatTautanWA(pesanTeks);

            card.innerHTML = `
                <div>
                    <div class="relative h-48 overflow-hidden bg-amber-100/50">
                        <img src="${prod.foto}" onerror="this.src='${prod.fallbackFoto}'" alt="${prod.nama}" class="w-full h-full object-cover transform hover:scale-105 transition duration-500">
                        <span class="absolute top-3 right-3 bg-amber-900/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">${prod.berat}</span>
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-bold text-gray-900 mb-1">${prod.nama}</h3>
                        <p class="text-sm text-gray-500 mb-4">${prod.deskripsi}</p>
                    </div>
                </div>
                <div class="px-6 pb-6 pt-0 flex justify-between items-center border-t border-amber-50 mt-auto">
                    <div>
                        <span class="text-xs text-gray-400 block font-medium">Harga</span>
                        <span class="text-lg font-bold text-amber-900">${prod.harga}</span>
                    </div>
                    <a href="${linkWa}" target="_blank" rel="noopener noreferrer" class="bg-amber-800 hover:bg-amber-900 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-sm transition">
                        Pesan
                    </a>
                </div>
            `;
            grid.appendChild(card);
        }

        if (adminList) {
            const item = document.createElement("div");
            item.className = "p-3 bg-amber-50/40 rounded-2xl border border-amber-200/60 flex items-center justify-between";
            item.innerHTML = `
                <div class="flex items-center space-x-3 overflow-hidden">
                    <img src="${prod.foto}" onerror="this.src='${prod.fallbackFoto}'" alt="${prod.nama}" class="w-12 h-12 object-cover rounded-xl border border-amber-200 flex-shrink-0">
                    <div class="truncate">
                        <h5 class="font-bold text-sm text-gray-900 truncate">${prod.nama}</h5>
                        <p class="text-xs text-gray-500">${prod.berat} · <span class="font-semibold text-amber-900">${prod.harga}</span></p>
                    </div>
                </div>
                <div class="flex space-x-1 flex-shrink-0">
                    <button type="button" onclick="editProduk(${prod.id})" class="p-2 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl text-xs font-bold transition">Edit</button>
                    <button type="button" onclick="hapusProduk(${prod.id})" class="p-2 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-xl text-xs font-bold transition">Hapus</button>
                </div>
            `;
            adminList.appendChild(item);
        }
    });
}

function editProduk(id) {
    const prod = produkList.find(p => p.id === id);
    if (!prod) return;

    document.getElementById("prod-edit-id").value = prod.id;
    document.getElementById("prod-name").value = prod.nama;
    document.getElementById("prod-weight").value = prod.berat;
    document.getElementById("prod-price").value = prod.harga;
    document.getElementById("prod-desc").value = prod.deskripsi;
    document.getElementById("prod-url-input").value = prod.foto.startsWith("data:") ? "" : prod.foto;

    document.getElementById("edit-prod-title").innerText = prod.nama;
    document.getElementById("edit-indicator").classList.remove("hidden");
    document.getElementById("submit-prod-btn").innerText = "Simpan Perubahan Produk";

    document.getElementById("produk-manager-wrapper").classList.add("hidden");
    document.getElementById("upload-product-form").classList.remove("hidden");
}

function hapusProduk(id) {
    showCustomConfirm("Hapus Produk", "Apakah Anda yakin ingin menghapus produk ini?", () => {
        produkList = produkList.filter(p => p.id !== id);
        localStorage.setItem('umkm_produk', JSON.stringify(produkList));
        renderProduk();
        showToast("Produk berhasil dihapus!");
    });
}

document.addEventListener("DOMContentLoaded", () => {
    muatLogoToko();
    muatFotoUtama();
    renderHeroText();
    renderKontakUsaha();
    renderCeritaUsaha();
    renderFakta();
    renderKeunggulan();
    renderProduk();

    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
        });
    }

    const adminModal = document.getElementById("admin-modal");
    const openAdminBtns = [document.getElementById("open-admin-btn"), document.getElementById("open-admin-btn-mobile")];
    const closeAdminBtn = document.getElementById("close-admin-btn");

    openAdminBtns.forEach(btn => {
        if (btn) btn.addEventListener("click", () => adminModal.classList.remove("hidden"));
    });

    if (closeAdminBtn) {
        closeAdminBtn.addEventListener("click", () => adminModal.classList.add("hidden"));
    }

    const loginBtn = document.getElementById("admin-login-btn");
    const pinInput = document.getElementById("admin-pin-input");
    const authBox = document.getElementById("admin-auth-box");
    const contentBox = document.getElementById("admin-content-box");
    const pinError = document.getElementById("pin-error-msg");

    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            if (pinInput.value === ADMIN_PIN) {
                authBox.classList.add("hidden");
                contentBox.classList.remove("hidden");
                pinError.classList.add("hidden");
            } else {
                pinError.classList.remove("hidden");
            }
        });
    }

    const tabs = [
        { btn: "tab-hero-text-btn", form: "edit-hero-text-form" },
        { btn: "tab-produk-btn", form: "produk-manager-wrapper" },
        { btn: "tab-cerita-btn", form: "edit-cerita-form" },
        { btn: "tab-fakta-btn", form: "edit-fakta-form" },
        { btn: "tab-keunggulan-btn", form: "keunggulan-manager-wrapper" },
        { btn: "tab-kontak-btn", form: "edit-kontak-form" },
        { btn: "tab-hero-btn", form: "upload-hero-form" },
        { btn: "tab-toko-btn", form: "edit-logo-form" },
        { btn: "tab-password-btn", form: "edit-password-form" }
    ];

    tabs.forEach(t => {
        const button = document.getElementById(t.btn);
        if (button) {
            button.addEventListener("click", () => {
                tabs.forEach(item => {
                    const b = document.getElementById(item.btn);
                    const f = document.getElementById(item.form);
                    if (b) {
                        b.classList.remove("border-b-2", "border-amber-800", "text-amber-900", "font-bold");
                        b.classList.add("text-gray-500");
                    }
                    if (f) f.classList.add("hidden");
                });

                document.getElementById("upload-product-form").classList.add("hidden");
                button.classList.add("border-b-2", "border-amber-800", "text-amber-900", "font-bold");
                button.classList.remove("text-gray-500");
                document.getElementById(t.form).classList.remove("hidden");
            });
        }
    });

    const openAddBtn = document.getElementById("open-add-new-prod-btn");
    if (openAddBtn) {
        openAddBtn.addEventListener("click", () => {
            document.getElementById("prod-edit-id").value = "";
            document.getElementById("upload-product-form").reset();
            document.getElementById("edit-indicator").classList.add("hidden");
            document.getElementById("submit-prod-btn").innerText = "Tambah Produk Baru";

            document.getElementById("produk-manager-wrapper").classList.add("hidden");
            document.getElementById("upload-product-form").classList.remove("hidden");
        });
    }

    const cancelEditBtn = document.getElementById("cancel-edit-btn");
    if (cancelEditBtn) {
        cancelEditBtn.addEventListener("click", () => {
            document.getElementById("upload-product-form").classList.add("hidden");
            document.getElementById("produk-manager-wrapper").classList.remove("hidden");
        });
    }

    // Form Submit Handlers
    const heroTextForm = document.getElementById("edit-hero-text-form");
    if (heroTextForm) {
        heroTextForm.addEventListener("submit", (e) => {
            e.preventDefault();
            heroTextData = {
                storeName: document.getElementById("admin-store-name").value,
                storeLocation: document.getElementById("admin-store-location").value,
                badge: document.getElementById("admin-hero-badge").value,
                title: document.getElementById("admin-hero-title").value,
                subtext: document.getElementById("admin-hero-subtext").value
            };
            localStorage.setItem('umkm_hero_text', JSON.stringify(heroTextData));
            renderHeroText();
            showToast("Header Beranda berhasil diperbarui!");
        });
    }

    // Simpan Produk (Mendukung Berkas Lokal Base64 & Link URL Permanen)
    const prodForm = document.getElementById("upload-product-form");
    if (prodForm) {
        prodForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const editId = document.getElementById("prod-edit-id").value;
            const name = document.getElementById("prod-name").value;
            const weight = document.getElementById("prod-weight").value;
            const price = document.getElementById("prod-price").value;
            const desc = document.getElementById("prod-desc").value;
            const url = document.getElementById("prod-url-input").value;
            const fileInput = document.getElementById("prod-file-input");

            let finalPhotoUrl = url;

            if (fileInput.files && fileInput.files[0]) {
                try {
                    finalPhotoUrl = await convertFileToBase64(fileInput.files[0]);
                } catch (err) {
                    showToast("Gagal mengunggah berkas gambar!");
                    return;
                }
            }

            if (editId) {
                const index = produkList.findIndex(p => p.id == editId);
                if (index !== -1) {
                    produkList[index] = {
                        ...produkList[index],
                        nama: name,
                        berat: weight,
                        harga: price,
                        deskripsi: desc,
                        foto: finalPhotoUrl || produkList[index].foto
                    };
                }
            } else {
                const newProd = {
                    id: Date.now(),
                    nama: name,
                    berat: weight,
                    harga: price,
                    deskripsi: desc,
                    foto: finalPhotoUrl || "https://placehold.co/400x300/7A3E1D/ffffff?text=Produk",
                    fallbackFoto: "https://placehold.co/400x300/7A3E1D/ffffff?text=Produk"
                };
                produkList.push(newProd);
            }

            localStorage.setItem('umkm_produk', JSON.stringify(produkList));
            renderProduk();
            document.getElementById("upload-product-form").classList.add("hidden");
            document.getElementById("produk-manager-wrapper").classList.remove("hidden");
            showToast("Data produk berhasil disimpan secara permanen!");
        });
    }

    const ceritaForm = document.getElementById("edit-cerita-form");
    if (ceritaForm) {
        ceritaForm.addEventListener("submit", (e) => {
            e.preventDefault();
            ceritaUsaha = {
                teks: document.getElementById("admin-cerita-teks").value,
                tahun: document.getElementById("admin-stat-tahun").value,
                pemilik: document.getElementById("admin-stat-pemilik").value,
                karyawan: document.getElementById("admin-stat-karyawan").value
            };
            localStorage.setItem('umkm_cerita', JSON.stringify(ceritaUsaha));
            renderCeritaUsaha();
            showToast("Cerita usaha berhasil diperbarui!");
        });
    }

    const faktaForm = document.getElementById("edit-fakta-form");
    if (faktaForm) {
        faktaForm.addEventListener("submit", (e) => {
            e.preventDefault();
            faktaList = faktaList.map(f => ({
                ...f,
                judul: document.getElementById(`fakta-judul-${f.id}`).value,
                deskripsi: document.getElementById(`fakta-desc-${f.id}`).value
            }));
            localStorage.setItem('umkm_fakta', JSON.stringify(faktaList));
            renderFakta();
            showToast("3 Poin fakta berhasil diperbarui!");
        });
    }

    const kontakForm = document.getElementById("edit-kontak-form");
    if (kontakForm) {
        kontakForm.addEventListener("submit", (e) => {
            e.preventDefault();
            kontakUsaha = {
                ...kontakUsaha,
                alamat: document.getElementById("admin-alamat").value,
                wa: document.getElementById("admin-wa").value,
                medsos: document.getElementById("admin-medsos").value,
                jamSenin: document.getElementById("admin-jambuka-senin").value,
                jamMinggu: document.getElementById("admin-jambuka-minggu").value,
                mapsUrl: document.getElementById("admin-maps-url").value
            };
            localStorage.setItem('umkm_kontak', JSON.stringify(kontakUsaha));
            renderKontakUsaha();
            showToast("Informasi kontak berhasil disimpan!");
        });
    }

    const saveKeungBtn = document.getElementById("save-all-keunggulan-btn");
    if (saveKeungBtn) {
        saveKeungBtn.addEventListener("click", () => {
            keunggulanList = keunggulanList.map(k => ({
                ...k,
                judul: document.getElementById(`keung-title-${k.id}`).value,
                deskripsi: document.getElementById(`keung-desc-${k.id}`).value
            }));
            localStorage.setItem('umkm_keunggulan', JSON.stringify(keunggulanList));
            renderKeunggulan();
            showToast("Daftar keunggulan berhasil diperbarui!");
        });
    }

    // Simpan Logo Toko (Permanen Base64 & URL Link)
    const logoForm = document.getElementById("edit-logo-form");
    if (logoForm) {
        logoForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const logoUrl = document.getElementById("logo-url-input").value;
            const fileInput = document.getElementById("logo-file-input");

            let finalLogo = logoUrl;

            if (fileInput.files && fileInput.files[0]) {
                try {
                    finalLogo = await convertFileToBase64(fileInput.files[0]);
                } catch (err) {
                    showToast("Gagal membaca gambar logo!");
                    return;
                }
            }

            if (finalLogo) {
                logoToko = finalLogo;
                localStorage.setItem('umkm_logo_toko', logoToko);
                muatLogoToko();
                showToast("Logo toko berhasil diperbarui secara permanen!");
            } else {
                showToast("Pilih berkas foto atau masukkan link gambar logo!");
            }
        });
    }

    // Simpan Foto Utama / Hero (Permanen Base64 & URL Link)
    const heroForm = document.getElementById("upload-hero-form");
    if (heroForm) {
        heroForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const heroUrl = document.getElementById("hero-url-input").value;
            const fileInput = document.getElementById("hero-file-input");

            let finalHero = heroUrl;

            if (fileInput.files && fileInput.files[0]) {
                try {
                    finalHero = await convertFileToBase64(fileInput.files[0]);
                } catch (err) {
                    showToast("Gagal membaca gambar foto utama!");
                    return;
                }
            }

            if (finalHero) {
                document.getElementById("hero-display-img").src = finalHero;
                localStorage.setItem('umkm_hero_img', finalHero);
                showToast("Foto utama berhasil diperbarui secara permanen!");
            } else {
                showToast("Pilih berkas foto atau masukkan link gambar foto utama!");
            }
        });
    }

    // Simpan Ubah Password / PIN Admin
    const passwordForm = document.getElementById("edit-password-form");
    if (passwordForm) {
        passwordForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const oldPin = document.getElementById("admin-old-pin").value;
            const newPin = document.getElementById("admin-new-pin").value;
            const confirmPin = document.getElementById("admin-confirm-pin").value;

            if (oldPin !== ADMIN_PIN) {
                showToast("PIN lama yang Anda masukkan salah!");
                return;
            }

            if (newPin !== confirmPin) {
                showToast("Konfirmasi PIN baru tidak cocok!");
                return;
            }

            if (newPin.trim() === "") {
                showToast("PIN baru tidak boleh kosong!");
                return;
            }

            ADMIN_PIN = newPin;
            localStorage.setItem('umkm_admin_pin', ADMIN_PIN);
            passwordForm.reset();
            showToast("Password/PIN Admin berhasil diubah!");
        });
    }
});