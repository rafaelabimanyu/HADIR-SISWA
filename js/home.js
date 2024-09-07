// JavaScript untuk website Anda

document.addEventListener("DOMContentLoaded", function() {
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
    const carouselItems = document.querySelectorAll('.carousel-item');
    if (carouselItems.length > 0) {
        carouselItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.5}s`; // Memberikan delay animasi
            item.classList.add('slideIn');
        });
    }

    // **Fungsi Modal**
    const openModalBtn = document.getElementById('open-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const modal = document.getElementById('modal');

    if (openModalBtn && closeModalBtn && modal) {
        // Fungsi untuk menampilkan modal
        function showModal() {
            modal.style.display = 'flex';
            setTimeout(function() {
                modal.classList.add('active'); // Menambahkan kelas untuk animasi
            }, 10); // Sedikit delay untuk memastikan CSS transition berjalan
        }

        // Fungsi untuk menyembunyikan modal
        function hideModal() {
            modal.classList.add('hide');
            setTimeout(function() {
                modal.style.display = 'none';
                modal.classList.remove('active', 'hide');
            }, 500); // Durasi harus sesuai dengan durasi animasi di CSS
        }

        // Event listener untuk membuka modal
        openModalBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showModal();
        });

        // Event listener untuk menutup modal
        closeModalBtn.addEventListener('click', function() {
            hideModal();
        });

        // Menutup modal jika pengguna mengklik di luar konten modal
        window.addEventListener('click', function(event) {
            if (event.target == modal) {
                hideModal();
            }
        });
    } else {
        console.error('Element openModalBtn, closeModalBtn, atau modal tidak ditemukan.');
    }
});

// **Fungsi Carousel Slide**
let currentIndex = 0;

function moveSlide(step) {
    const slides = document.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;

    if (totalSlides > 0) {
        currentIndex = (currentIndex + step + totalSlides) % totalSlides;
        const offset = -currentIndex * 100;

        document.querySelector('.carousel').style.transform = `translateX(${offset}%)`;
    } else {
        console.error('Carousel items tidak ditemukan.');
    }
}
