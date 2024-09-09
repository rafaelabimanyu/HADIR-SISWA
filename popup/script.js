// Password yang benar
const correctPassword = "MOCHWASROI69";

// Fungsi untuk memeriksa password
function checkPassword() {
    const passwordInput = document.getElementById('passwordInput').value;

    if (passwordInput === correctPassword) {
        // Password benar, tampilkan konten utama dan sembunyikan popup
        document.getElementById('passwordPopup').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
    } else {
        // Password salah, tampilkan pesan error
        document.getElementById('errorMessage').textContent = "Password salah!";
    }
}

// Fungsi absensi di halaman attendance
document.getElementById('attendanceForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const status = document.getElementById('status').value;
    const time = new Date().toLocaleString();

    const table = document.getElementById('attendanceTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    const cellName = newRow.insertCell(0);
    const cellStatus = newRow.insertCell(1);
    const cellTime = newRow.insertCell(2);

    cellName.textContent = name;
    cellStatus.textContent = status;
    cellTime.textContent = time;

    document.getElementById('attendanceForm').reset();
});
