document.addEventListener("DOMContentLoaded", function () {
    // **Responsive Navbar**
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const closeBtn = document.querySelector('.close-btn');

    if (hamburger && navMenu && closeBtn) {
        // Fungsi untuk membuka dan menutup navbar
        function toggleMenu() {
            navMenu.classList.toggle('show');
            navMenu.classList.toggle('hide');
            hamburger.classList.toggle('active');
            closeBtn.classList.toggle('show');
            closeBtn.classList.toggle('hide');
        }

        // Event listener untuk ikon hamburger
        hamburger.addEventListener('click', toggleMenu);

        // Event listener untuk tombol close
        closeBtn.addEventListener('click', toggleMenu);
    } else {
        console.error('Element hamburger, navMenu, atau closeBtn tidak ditemukan.');
    }

    // **Animasi Hero Section**
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.classList.add('fadeIn');
    }

    // **Inisialisasi Carousel**
    let currentIndex = 0;

    function moveSlide(step) {
        const slides = document.querySelectorAll('.carousel-item');
        const totalSlides = slides.length;

        if (totalSlides > 0) {
            currentIndex += step;

            // Mencegah keluar dari batas slide
            if (currentIndex >= totalSlides) {
                currentIndex = totalSlides - 1; // Tetap di slide terakhir
            } else if (currentIndex < 0) {
                currentIndex = 0; // Kembali ke slide pertama
            }

            const offset = -currentIndex * 100;
            const carouselElem = document.querySelector('.carousel');
            if (carouselElem) {
                carouselElem.style.transform = `translateX(${offset}%)`;
                // Perbarui opacity item carousel
                slides.forEach((slide, index) => {
                    slide.style.opacity = index === currentIndex ? '1' : '0';
                });
            }
        } else {
            console.error('Carousel items tidak ditemukan.');
        }
    }

    // Event listener untuk tombol navigasi carousel
    const nextBtn = document.getElementById('next-slide');
    const prevBtn = document.getElementById('prev-slide');

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', function () {
            moveSlide(1);
        });

        prevBtn.addEventListener('click', function () {
            moveSlide(-1);
        });
    } else {
        console.error('Element next-slide atau prev-slide tidak ditemukan.');
    }

    // Event listener untuk mengklik gambar untuk berpindah slide
    const carouselItems = document.querySelectorAll('.carousel-item');
    carouselItems.forEach((item, index) => {
        item.addEventListener('click', function () {
            const step = index === currentIndex ? 1 : (index > currentIndex ? 1 : -1);
            moveSlide(step);
        });
    });

    // **Fungsi Modal**
    const openModalBtn = document.getElementById('open-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const modal = document.getElementById('modal');

    if (openModalBtn && closeModalBtn && modal) {
        // Fungsi untuk menampilkan modal
        function showModal() {
            modal.style.display = 'flex';
            setTimeout(function () {
                modal.classList.add('active'); // Menambahkan kelas untuk animasi
            }, 10); // Sedikit delay untuk memastikan CSS transition berjalan
        }

        // Fungsi untuk menyembunyikan modal
        function hideModal() {
            modal.classList.add('hide');
            setTimeout(function () {
                modal.style.display = 'none';
                modal.classList.remove('active', 'hide');
            }, 500); // Durasi harus sesuai dengan durasi animasi di CSS
        }

        // Event listener untuk membuka modal
        openModalBtn.addEventListener('click', function (e) {
            e.preventDefault();
            showModal();
        });

        // Event listener untuk menutup modal
        closeModalBtn.addEventListener('click', function () {
            hideModal();
        });

        // Menutup modal jika pengguna mengklik di luar konten modal
        window.addEventListener('click', function (event) {
            if (event.target == modal) {
                hideModal();
            }
        });
    } else {
        console.error('Element openModalBtn, closeModalBtn, atau modal tidak ditemukan.');
    }

    // **Fungsi untuk menghitung waktu berjalan**
    function calculateDevelopmentTime() {
        const startDate = new Date('2024-08-25T00:00:00'); // Tanggal pembuatan website
        const currentDate = new Date(); // Tanggal saat ini
        const timeDiff = currentDate - startDate; // Selisih waktu dalam milidetik

        // Konversi milidetik menjadi hari, jam, menit, detik
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        // Format hasilnya
        const timeElapsed = `${days} hari, ${hours} jam, ${minutes} menit, ${seconds} detik`;

        // Menampilkan hasil pada elemen dengan id 'time-elapsed'
        const timeElapsedElem = document.getElementById('time-elapsed');
        if (timeElapsedElem) {
            timeElapsedElem.textContent = timeElapsed;
        }
    }

    // Fungsi untuk menampilkan dan menyembunyikan waktu dengan animasi
    let timeVisible = false;

    function showTimeElapsed() {
        const timeInfo = document.getElementById("time-info");
        const timeButton = document.getElementById("time-button");

        if (!timeInfo || !timeButton) {
            console.error('Element time-info atau time-button tidak ditemukan.');
            return;
        }

        if (!timeVisible) {
            // Tampilkan elemen waktu dengan animasi
            timeInfo.classList.add('show');
            timeButton.innerText = "Tutup Waktu";
        } else {
            // Sembunyikan elemen waktu dengan animasi
            timeInfo.classList.remove('show');
            timeButton.innerText = "Tampilkan Waktu";
        }

        timeVisible = !timeVisible;
    }

    // Jalankan fungsi setiap detik agar waktu selalu terupdate
    setInterval(calculateDevelopmentTime, 1000);

    // Event listener untuk tombol
    const timeButtonElem = document.getElementById("time-button");
    if (timeButtonElem) {
        timeButtonElem.addEventListener("click", showTimeElapsed);
    } else {
        console.error('Element time-button tidak ditemukan.');
    }
});
