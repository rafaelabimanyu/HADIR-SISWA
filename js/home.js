document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const closeBtn = document.querySelector('.close-btn');

    if (hamburger && navMenu && closeBtn) {
        function toggleMenu() {
            navMenu.classList.toggle('show');
            navMenu.classList.toggle('hide');
            hamburger.classList.toggle('active');
            closeBtn.classList.toggle('show');
            closeBtn.classList.toggle('hide');
        }

        hamburger.addEventListener('click', toggleMenu);
        closeBtn.addEventListener('click', toggleMenu);
    } else {
        console.error('Element hamburger, navMenu, atau closeBtn tidak ditemukan.');
    }

    const searchInput = document.querySelector('.search-input');
    const searchResults = document.getElementById('search-results');

    const content = Array.from(document.querySelectorAll('main section.article, main section.info, main section.announcements, main section.academic-calendar'))
        .map(section => ({
            title: section.querySelector('h2') ? section.querySelector('h2').innerText : '',
            id: section.id || section.querySelector('h2').innerText.toLowerCase().replace(/\s+/g, '-'),
            description: section.innerText.replace(section.querySelector('h2').innerText, '').trim(),
            element: section
        }));

    const navbarItems = Array.from(document.querySelectorAll('nav ul li a')).map(link => ({
        text: link.innerText.toLowerCase(),
        href: link.href
    }));

    function performSearch(query) {
        searchResults.innerHTML = '';

        const navbarMatch = navbarItems.find(item => item.text.includes(query));
        if (navbarMatch) {
            const resultItem = document.createElement('div');
            resultItem.classList.add('search-result-item');
            resultItem.innerHTML = `<strong>${navbarMatch.text}</strong> - Klik untuk pergi ke halaman.`;
            resultItem.addEventListener('click', () => {
                window.location.href = navbarMatch.href;
            });

            searchResults.appendChild(resultItem);
            searchResults.classList.add('active');
            return;
        }

        const results = content.filter(item =>
            item.title.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query)
        );

        if (results.length > 0) {
            results.forEach(item => {
                const resultItem = document.createElement('div');
                resultItem.classList.add('search-result-item');
                resultItem.innerHTML = `<strong>${item.title}</strong>: ${item.description}`;

                resultItem.addEventListener('click', () => {
                    const sectionElement = document.getElementById(item.id);
                    sectionElement.scrollIntoView({ behavior: 'smooth' });
                    highlightText(sectionElement, query);
                    searchResults.classList.remove('active');
                    searchInput.value = '';
                });

                searchResults.appendChild(resultItem);
            });
            searchResults.classList.add('active');
        } else {
            searchResults.classList.remove('active');
        }
    }

    searchInput.addEventListener('input', function () {
        const query = this.value.trim().toLowerCase();
        performSearch(query);
    });

    searchInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            const query = this.value.trim().toLowerCase();
            const navbarMatch = navbarItems.find(item => item.text.includes(query));
            if (navbarMatch) {
                window.location.href = navbarMatch.href;
            } else {
                performSearch(query);
            }
        }
    });

    function highlightText(section, keyword) {
        const contentText = section.innerHTML;
        const highlightedText = contentText.replace(
            new RegExp(keyword, 'gi'),
            match => `<mark>${match}</mark>`
        );
        section.innerHTML = highlightedText;

        setTimeout(() => {
            section.innerHTML = contentText;
        }, 3000);
    }

    document.addEventListener('click', function (event) {
        if (!searchInput.contains(event.target) && !searchResults.contains(event.target)) {
            searchResults.classList.remove('active');
        }
    });

    const searchButton = document.getElementById('search-btn');
    if (searchButton) {
        searchButton.addEventListener('click', () => {
            const query = searchInput.value.trim().toLowerCase();
            const navbarMatch = navbarItems.find(item => item.text.includes(query));
            if (navbarMatch) {
                window.location.href = navbarMatch.href;
            } else {
                performSearch(query);
            }
        });
    }

    let currentIndex = 0;
    const slides = document.querySelectorAll('.carousel-item');
    if (slides.length > 0) {
        slides[0].classList.add('active');
    }

    function moveSlide(step) {
        const totalSlides = slides.length;

        if (totalSlides > 0) {
            currentIndex += step;

            if (currentIndex >= totalSlides) {
                currentIndex = 0; 
            } else if (currentIndex < 0) {
                currentIndex = totalSlides - 1; 
            }

            const offset = -currentIndex * 100;
            const carouselElem = document.querySelector('.carousel');
            if (carouselElem) {
                carouselElem.style.transform = `translateX(${offset}%)`;
                slides.forEach((slide, index) => {
                    slide.style.opacity = index === currentIndex ? '1' : '0';
                    if (index === currentIndex) {
                        slide.classList.add('active');
                    } else {
                        slide.classList.remove('active');
                    }
                });
            }
        } else {
            console.error('Carousel items tidak ditemukan.');
        }
    }

    const nextBtn = document.getElementById('next-slide');
    const prevBtn = document.getElementById('prev-slide');

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', function () {
            moveSlide(1);
        });

        prevBtn.addEventListener('click', function () {
            moveSlide(-1);
        });
    } else {
        console.error('Element next-slide atau prev-slide tidak ditemukan.');
    }

    const openModalBtn = document.getElementById('open-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const modal = document.getElementById('modal');

    if (openModalBtn && closeModalBtn && modal) {
        function showModal() {
            modal.style.display = 'flex';
            setTimeout(function () {
                modal.classList.add('active'); 
            }, 10);
        }

        function hideModal() {
            modal.classList.add('hide');
            setTimeout(function () {
                modal.style.display = 'none';
                modal.classList.remove('active', 'hide');
            }, 500);
        }

        openModalBtn.addEventListener('click', function (e) {
            e.preventDefault();
            showModal();
        });

        closeModalBtn.addEventListener('click', function () {
            hideModal();
        });

        window.addEventListener('click', function (event) {
            if (event.target == modal) {
                hideModal();
            }
        });
    } else {
        console.error('Element openModalBtn, closeModalBtn, atau modal tidak ditemukan.');
    }

    // **Fungsi untuk menghitung waktu berjalan**
function calculateDevelopmentTime() {
    const startDate = new Date('2024-08-25T00:00:00');
    const currentDate = new Date(); 
    const timeDiff = currentDate - startDate;

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    const timeElapsed = `${days} hari, ${hours} jam, ${minutes} menit, ${seconds} detik`;

    const timeElapsedElem = document.getElementById('time-elapsed');
    if (timeElapsedElem) {
        timeElapsedElem.textContent = timeElapsed;
    }
}

let timeVisible = false;
let intervalId; // Untuk menyimpan ID interval

function showTimeElapsed() {
    const timeInfo = document.getElementById("time-info");
    const creationInfo = document.getElementById("creation-info");
    const timeButton = document.getElementById("time-button");

    if (!timeInfo || !timeButton || !creationInfo) {
        console.error('Element time-info, creation-info, atau time-button tidak ditemukan.');
        return;
    }

    if (!timeVisible) {
        timeInfo.classList.add('show'); // Menampilkan waktu
        creationInfo.classList.add('show'); // Menampilkan informasi pembuatan
        timeButton.innerText = "Tutup Waktu";

        // Mulai menghitung waktu berjalan
        if (!intervalId) { // Hanya mulai jika belum ada interval yang berjalan
            intervalId = setInterval(calculateDevelopmentTime, 1000);
        }
    } else {
        timeInfo.classList.remove('show'); // Menyembunyikan waktu
        creationInfo.classList.remove('show'); // Menyembunyikan informasi pembuatan
        timeButton.innerText = "Lihat Waktu";
        clearInterval(intervalId); // Hentikan interval
        intervalId = null; // Reset intervalId
    }
    timeVisible = !timeVisible; // Toggle status
}

const timeButton = document.getElementById("time-button");
if (timeButton) {
    timeButton.addEventListener("click", showTimeElapsed);
} else {
    console.error('Element time-button tidak ditemukan.');
}
}); 


//
