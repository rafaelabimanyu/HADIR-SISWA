// Modal and button elements
const openModalButton = document.getElementById('openModal');
const modal = document.getElementById('passwordModal');
const closeModalButton = document.querySelector('.close');
const submitPasswordButton = document.getElementById('submitPassword');
const passwordInput = document.getElementById('password');
const togglePasswordButton = document.getElementById('togglePassword');
const errorMessage = document.getElementById('errorMessage');

// Open modal
openModalButton.addEventListener('click', () => {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';  // Disable scrolling when modal is open
});

// Close modal
closeModalButton.addEventListener('click', () => {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';  // Re-enable scrolling
});

// Toggle password visibility
togglePasswordButton.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePasswordButton.textContent = type === 'password' ? 'Show' : 'Hide';
});

// Submit password and validate
submitPasswordButton.addEventListener('click', validatePassword);
passwordInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        validatePassword();
    }
});

// Function to validate password
function validatePassword() {
    const password = passwordInput.value;
    if (password === 'mochwasroi69') {
        errorMessage.style.display = 'none';
        enterWebsite();  // Add animation and enter the website
    } else {
        errorMessage.textContent = 'Incorrect password, try again!';
        errorMessage.style.display = 'block';
    }
}

// Animation and enter website
function enterWebsite() {
    // Animation
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    setTimeout(() => {
        alert('Access Granted. Welcome!');
        // Redirect to the main page
        window.location.href = '/index.html';
    }, 500);
}
