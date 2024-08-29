document.getElementById('attendance-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
 
    // Handle form data here
    alert('Absensi berhasil dikirim!');
 });
 
 document.getElementById('open-modal').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'flex';
});

document.getElementById('close-modal').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'none';
});

window.addEventListener('click', function(event) {
    if (event.target === document.getElementById('modal')) {
        document.getElementById('modal').style.display = 'none';
    }
});
