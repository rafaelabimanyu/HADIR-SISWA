document.addEventListener('DOMContentLoaded', function() {
   function updateDateTime() {
      const now = new Date();
      const options = { 
         weekday: 'long', 
         year: 'numeric', 
         month: 'long', 
         day: 'numeric', 
         hour: '2-digit', 
         minute: '2-digit', 
         second: '2-digit', 
         timeZone: 'Asia/Jakarta',
         timeZoneName: 'short'
      };
      const dateTimeString = now.toLocaleDateString('id-ID', options);
      document.getElementById('date-time').textContent = dateTimeString;
   }
   setInterval(updateDateTime, 1000); // Update every second
   updateDateTime(); // Initial call to set the date and time immediately

   document.getElementById('login-form').addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent form submission
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      const validEmailPattern = /^[a-zA-Z0-9._%+-]+.pplg1\@smkprestasiprima\.sch\.id$/;
      const validPassword = 'PRESTASIPRIMA2024';

      if (!validEmailPattern.test(email)) {
         alert('Maaf, email tidak terdaftar');
      } else if (password !== validPassword) {
         alert('Password salah');
      } else {
         alert('Login berhasil');
         window.location.href = 'home.html'; // Redirect to home.html
      }
   });

   document.getElementById('toggle-password').addEventListener('click', function() {
      const passwordInput = document.getElementById('password');
      const type = passwordInput.type === 'password' ? 'text' : 'password';
      passwordInput.type = type;
      this.textContent = type === 'password' ? '👁️' : '🙈'; // Change icon based on visibility
   });
});
