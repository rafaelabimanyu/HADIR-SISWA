// Toggle Navbar Menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('show');
    hamburger.classList.toggle('active');
});

// Optional: Close Navbar when clicking outside
window.addEventListener('click', function(event) {
    if (!event.target.closest('.nav-menu') && !event.target.closest('.hamburger')) {
        navMenu.classList.remove('show');
        hamburger.classList.remove('active');
    }
});


// Open Modal
document.getElementById('open-modal').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('modal').style.display = 'flex';
});

// Close Modal
document.getElementById('close-modal').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'none';
});

// Close Modal on Outside Click
window.addEventListener('click', function(event) {
    if (event.target === document.getElementById('modal')) {
        document.getElementById('modal').style.display = 'none';
    }
});

// JavaScript untuk menampilkan modal
const modal = document.querySelector('.modal');
const openModalBtn = document.querySelector('.open-modal');
const closeModalBtn = document.querySelector('.close');

openModalBtn.addEventListener('click', () => {
    modal.classList.add('active');
});

closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('active');
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
modal.classList.remove('active');
    }
});
