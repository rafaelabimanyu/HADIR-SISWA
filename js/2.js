document.addEventListener('DOMContentLoaded', function () {
    // Pop-up untuk memasukkan password saat pertama kali masuk
    function requestPassword() {
        let userPassword = prompt('Masukkan password untuk mengakses website:');
        
        // Cek password yang dimasukkan
        if (userPassword !== 'MOCHWASROI69') {
            alert('Password salah. Anda akan keluar dari website.');
            window.location.href = 'index.html'; // Ubah ke halaman lain atau keluarkan pengguna
        } else {
            alert('Password benar. Selamat datang!');
        }
    }

    // Panggil fungsi requestPassword saat halaman dimuat
    requestPassword();

    const form = document.getElementById('absensi-form');
    const namaInput = document.getElementById('nama');
    const namaError = document.getElementById('nama-error');
    const tableBody = document.querySelector('#data-table tbody');
    const clearDataBtn = document.getElementById('clear-data-btn');
    const passwordDialog = document.getElementById('password-dialog');
    const passwordInput = document.getElementById('password-input');
    const confirmPasswordBtn = document.getElementById('confirm-password-btn');
    const cancelPasswordBtn = document.getElementById('cancel-password-btn');
    const passwordError = document.getElementById('password-error');
    let attendanceCounts = { Hadir: 0, Izin: 0, Sakit: 0 };

    // Function to load attendance data from LocalStorage
    function loadAttendanceData() {
        const storedData = JSON.parse(localStorage.getItem('attendanceData'));
        if (storedData) {
            attendanceCounts = storedData.counts;
            const storedRows = storedData.rows;

            storedRows.forEach(rowData => {
                const row = document.createElement('tr');
                row.innerHTML = `<td>${rowData.nama}</td><td>${rowData.keterangan}</td><td>${rowData.tanggal}</td><td>${rowData.jam}</td>`;
                tableBody.appendChild(row);
            });

            updateChart(attendanceCounts);
        }
    }

    // Function to save attendance data to LocalStorage
    function saveAttendanceData() {
        const rows = [];
        tableBody.querySelectorAll('tr').forEach(row => {
            rows.push({
                nama: row.cells[0].textContent,
                keterangan: row.cells[1].textContent,
                tanggal: row.cells[2].textContent,
                jam: row.cells[3].textContent
            });
        });

        localStorage.setItem('attendanceData', JSON.stringify({
            counts: attendanceCounts,
            rows: rows
        }));
    }

    // Function to clear all attendance data
    function clearAttendanceData() {
        tableBody.innerHTML = '';
        attendanceCounts = { Hadir: 0, Izin: 0, Sakit: 0 };
        localStorage.removeItem('attendanceData');
        updateChart(attendanceCounts);
    }

    // Function to format the date as dd-mm-yyyy
    function formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
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

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        namaError.textContent = '';

        const nama = namaInput.value.trim();
        const keterangan = document.getElementById('keterangan').value;
        const tanggal = formatDate(new Date());
        const jam = formatTime(new Date());

        if (nama === '') {
            namaError.textContent = 'Nama siswa tidak boleh kosong.';
            return;
        }

        if (!/^[A-Za-z\s]+$/.test(nama)) {
            namaError.textContent = 'Nama siswa hanya boleh terdiri dari huruf dan spasi.';
            return;
        }

        if (isRecordExists(nama, tanggal)) {
            namaError.textContent = 'Siswa sudah mengisi absensi untuk hari ini.';
            return;
        }

        const row = document.createElement('tr');
        row.classList.add('new-row');
        row.innerHTML = `<td>${nama}</td><td>${keterangan}</td><td>${tanggal}</td><td>${jam}</td>`;
        tableBody.appendChild(row);

        attendanceCounts[keterangan]++;
        saveAttendanceData();
        updateChart(attendanceCounts);

        form.reset();

        const confirmationMessage = document.createElement('p');
        confirmationMessage.textContent = 'Absensi berhasil ditambahkan.';
        confirmationMessage.style.color = 'green';
        form.appendChild(confirmationMessage);

        setTimeout(() => {
            confirmationMessage.remove();
        }, 3000);
    });

    // Function to initialize the Chart.js graph
    function updateChart(data) {
        const ctx = document.getElementById('attendanceChart').getContext('2d');
        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Hadir', 'Izin', 'Sakit'],
                datasets: [{
                    label: 'Jumlah Kehadiran',
                    data: [data.Hadir, data.Izin, data.Sakit],
                    backgroundColor: ['#4caf50', '#ffeb3b', '#f44336'],
                    borderColor: ['#388e3c', '#fbc02d', '#d32f2f'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    loadAttendanceData();

    // Event listener for clear data button
    clearDataBtn.addEventListener('click', function () {
        passwordDialog.style.display = 'block'; // Show password dialog
    });

    // Event listener for confirm password button
    confirmPasswordBtn.addEventListener('click', function () {
        const password = passwordInput.value;
        if (password === 'mochwasroi69') {
            clearAttendanceData();
            passwordDialog.style.display = 'none'; // Hide dialog
            passwordInput.value = ''; // Clear password input
            passwordError.textContent = ''; // Clear error message
        } else {
            passwordError.textContent = 'Password salah. Silakan coba lagi.';
        }
    });

    // Event listener for cancel button
    cancelPasswordBtn.addEventListener('click', function () {
        passwordDialog.style.display = 'none'; // Hide dialog
        passwordInput.value = ''; // Clear password input
        passwordError.textContent = ''; // Clear error message
    });
});
