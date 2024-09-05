document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('absensi-form');
    const namaInput = document.getElementById('nama');
    const namaError = document.getElementById('nama-error');
    const tableBody = document.querySelector('#data-table tbody');
    
    // Function to format the date as dd-mm-yyyy
    function formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }

    // Function to format the time as hh:mm:ss
    function formatTime(date) {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }

    // Function to check if a record exists for the current date
    function isRecordExists(nama, tanggal) {
        const rows = tableBody.querySelectorAll('tr');
        for (let row of rows) {
            if (row.cells[0].textContent === nama && row.cells[2].textContent === tanggal) {
                return true;
            }
        }
        return false;
    }
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Clear previous error messages
        namaError.textContent = '';

        const nama = namaInput.value.trim();
        const keterangan = document.getElementById('keterangan').value;
        const tanggal = formatDate(new Date());
        const jam = formatTime(new Date()); // Menambahkan jam absensi
        
        // Validate nama input
        if (nama === '') {
            namaError.textContent = 'Nama siswa tidak boleh kosong.';
            return;
        }

        // Validate format nama (hanya huruf dan spasi)
        if (!/^[A-Za-z\s]+$/.test(nama)) {
            namaError.textContent = 'Nama siswa hanya boleh terdiri dari huruf dan spasi.';
            return;
        }

        // Validate for duplicate record on the same day
        if (isRecordExists(nama, tanggal)) {
            namaError.textContent = 'Siswa sudah mengisi absensi untuk hari ini.';
            return;
        }

        // Add new record to the table
        const row = document.createElement('tr');
        row.classList.add('new-row'); // Tambah animasi fade-in
        row.innerHTML = `<td>${nama}</td><td>${keterangan}</td><td>${tanggal}</td><td>${jam}</td>`; // Tambahkan kolom jam
        tableBody.appendChild(row);

        // Clear the form
        form.reset();

        // Display confirmation message
        const confirmationMessage = document.createElement('p');
        confirmationMessage.textContent = 'Absensi berhasil ditambahkan.';
        confirmationMessage.style.color = 'green';
        form.appendChild(confirmationMessage);

        setTimeout(() => {
            confirmationMessage.remove(); // Hapus pesan setelah 3 detik
        }, 3000);
    });
});
