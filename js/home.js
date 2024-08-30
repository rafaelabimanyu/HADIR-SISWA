// JavaScript for responsive navbar
document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const closeBtn = document.querySelector('.close-btn');
 
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
 
    closeBtn.addEventListener('click', function() {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
 });
 
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
