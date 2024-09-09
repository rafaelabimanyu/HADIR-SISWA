document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const closeBtn = document.querySelector('.close-btn');
    const correctPassword = 'MOCHWASROI69';

    // Function to check password and restrict access
    function checkPassword() {
        const enteredPassword = prompt('Masukkan password untuk mengakses website:');
        if (enteredPassword === correctPassword) {
            // Password is correct, continue loading the page
            initializeNavbar();
        } else {
            // Password is incorrect, alert the user and exit
            alert('Password salah. Anda akan diarahkan keluar.');
            window.location.href = 'index.html'; // Redirect to another page, e.g., Google
        }
    }

    // Function to initialize the responsive navbar
    function initializeNavbar() {
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
    }

    // Check password before initializing navbar
    checkPassword();
});
