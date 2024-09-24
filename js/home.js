document.addEventListener("DOMContentLoaded", function () {
    // **Responsive Navbar**
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const closeBtn = document.querySelector('.close-btn');

    if (hamburger && navMenu && closeBtn) {
        function toggleMenu() {
            navMenu.classList.toggle('show');
            navMenu.classList.toggle('hide');
            hamburger.classList.toggle('active');
            closeBtn.classList.toggle('show');
            closeBtn.classList.toggle('hide');
        }

        hamburger.addEventListener('click', toggleMenu);
        closeBtn.addEventListener('click', toggleMenu);
    } else {
        console.error('Element hamburger, navMenu, atau closeBtn tidak ditemukan.');
    }

    // **Inisialisasi Carousel**
    let currentIndex = 0;

    // Menetapkan item pertama sebagai aktif
    const slides = document.querySelectorAll('.carousel-item');
    if (slides.length > 0) {
        slides[0].classList.add('active');
    }

    function moveSlide(step) {
        const totalSlides = slides.length;

        if (totalSlides > 0) {
            currentIndex += step;

            if (currentIndex >= totalSlides) {
                currentIndex = totalSlides - 1; 
            } else if (currentIndex < 0) {
                currentIndex = 0; 
            }

            const offset = -currentIndex * 100;
            const carouselElem = document.querySelector('.carousel');
            if (carouselElem) {
                carouselElem.style.transform = `translateX(${offset}%)`;
                slides.forEach((slide, index) => {
                    slide.style.opacity = index === currentIndex ? '1' : '0';
                    if (index === currentIndex) {
                        slide.classList.add('active'); // Tambahkan animasi saat aktif
                    } else {
                        slide.classList.remove('active');
                    }
                });
            }
        } else {
            console.error('Carousel items tidak ditemukan.');
        }
    }

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

    // **Fungsi Modal**
    const openModalBtn = document.getElementById('open-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const modal = document.getElementById('modal');

    if (openModalBtn && closeModalBtn && modal) {
        function showModal() {
            modal.style.display = 'flex';
            setTimeout(function () {
                modal.classList.add('active'); 
            }, 10);
        }

        function hideModal() {
            modal.classList.add('hide');
            setTimeout(function () {
                modal.style.display = 'none';
                modal.classList.remove('active', 'hide');
            }, 500);
        }

        openModalBtn.addEventListener('click', function (e) {
            e.preventDefault();
            showModal();
        });

        closeModalBtn.addEventListener('click', function () {
            hideModal();
        });

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
        const startDate = new Date('2024-08-25T00:00:00');
        const currentDate = new Date(); 
        const timeDiff = currentDate - startDate;

        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        const timeElapsed = `${days} hari, ${hours} jam, ${minutes} menit, ${seconds} detik`;

        const timeElapsedElem = document.getElementById('time-elapsed');
        if (timeElapsedElem) {
            timeElapsedElem.textContent = timeElapsed;
        }
    }

    let timeVisible = false;

    function showTimeElapsed() {
        const timeInfo = document.getElementById("time-info");
        const timeButton = document.getElementById("time-button");

        if (!timeInfo || !timeButton) {
            console.error('Element time-info atau time-button tidak ditemukan.');
            return;
        }

        if (!timeVisible) {
            timeInfo.classList.add('show');
            timeButton.innerText = "Tutup Waktu";
        } else {
            timeInfo.classList.remove('show');
            timeButton.innerText = "Tampilkan Waktu";
        }

        timeVisible = !timeVisible;
    }

    const timeButton = document.getElementById("time-button");
    if (timeButton) {
        timeButton.addEventListener("click", showTimeElapsed);
    } else {
        console.error('Element time-button tidak ditemukan.');
    }

    calculateDevelopmentTime();
});
