document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('absensi-form');
    const namaInput = document.getElementById('nama');
    const namaError = document.getElementById('nama-error');
    const tableBody = document.querySelector('#data-table tbody');
    
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
        const tanggal = new Date().toLocaleDateString();
        
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
        row.innerHTML = `<td>${nama}</td><td>${keterangan}</td><td>${tanggal}</td>`;
        tableBody.appendChild(row);

        // Clear the form
        form.reset();
    });
});
