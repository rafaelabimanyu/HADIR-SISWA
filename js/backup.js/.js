// JavaScript for responsive navbar
document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const closeBtn = document.querySelector('.close-btn');

    if (hamburger && navMenu && closeBtn) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('show');  // Toggle menu visibility
            navMenu.classList.toggle('hide');  // Menambahkan kelas hide untuk animasi
            hamburger.classList.toggle('active');
            closeBtn.classList.toggle('show');
            closeBtn.classList.toggle('hide');
        });

        closeBtn.addEventListener('click', function() {
            navMenu.classList.remove('show');  // Hide menu
            navMenu.classList.add('hide');  // Menambahkan kelas hide untuk animasi
            hamburger.classList.remove('active');
            closeBtn.classList.remove('show');
            closeBtn.classList.add('hide');
        });
    } else {
        console.error('Required elements not found in the DOM.');
    }
});





document.addEventListener('DOMContentLoaded', function () {
    // Start the fadeIn animation for the hero section
    document.querySelector('.hero').classList.add('fadeIn');

    // Start the slideIn animation for each carousel item
    const carouselItems = document.querySelectorAll('.carousel-item');
    carouselItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.5}s`; // Stagger the animation
        item.classList.add('slideIn');
    });
});

function moveSlide(n) {
    const carousel = document.querySelector('.carousel');
    const carouselItems = document.querySelectorAll('.carousel-item');
    let currentIndex = 0;

    // Find the current visible item
    carouselItems.forEach((item, index) => {
        if (item.style.transform === "translateX(0%)") {
            currentIndex = index;
        }
    });

    // Calculate new index
    let newIndex = currentIndex + n;
    if (newIndex >= carouselItems.length) {
        newIndex = 0;
    } else if (newIndex < 0) {
        newIndex = carouselItems.length - 1;
    }

    // Move to the new slide
    carousel.style.transform = `translateX(-${newIndex * 100}%)`;
}


let currentIndex = 0;

function moveSlide(step) {
    const slides = document.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;

    currentIndex = (currentIndex + step + totalSlides) % totalSlides;
    const offset = -currentIndex * 100;

    document.querySelector('.carousel').style.transform = `translateX(${offset}%)`;
}


 
document.addEventListener('DOMContentLoaded', function() {
    const openModalBtn = document.getElementById('open-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const modal = document.getElementById('modal');

    // Fungsi untuk menampilkan modal
    function showModal() {
        modal.style.display = 'flex';
        setTimeout(function() {
            modal.classList.add('active');
        }, 10); // Timeout untuk memastikan modal muncul dengan animasi
    }

    // Fungsi untuk menyembunyikan modal
    function hideModal() {
        modal.classList.add('hide');
        setTimeout(function() {
            modal.style.display = 'none';
            modal.classList.remove('active', 'hide');
        }, 500); // Durasi animasi fadeOutScale
    }

    openModalBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showModal();
    });

    closeModalBtn.addEventListener('click', function() {
        hideModal();
    });

    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            hideModal();
        }
    });
});
