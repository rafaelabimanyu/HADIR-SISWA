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