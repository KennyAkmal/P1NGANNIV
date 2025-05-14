// Fungsi untuk efek paralax saat scrolling
window.addEventListener('scroll', function() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const maxScroll = document.body.scrollHeight - windowHeight;
    const scrollProgress = scrollY / maxScroll; 
    
    // Efek pada bintang-bintang utama - EFEK MENGHILANG SAAT SCROLL KE BAWAH, MUNCUL SAAT SCROLL KE ATAS
    document.querySelectorAll('.main-star').forEach((star, index) => {
        const disappearThreshold = windowHeight * 0.3;
        const disappearDistance = windowHeight * 0.5;
        
        const isHovered = star.matches(':hover');
        
        if (!isHovered) {
            let opacity = 1 - (Math.min(scrollY - disappearThreshold, disappearDistance) / disappearDistance);
            opacity = Math.max(0, Math.min(1, opacity));
            
            star.style.opacity = opacity;
            
            if (scrollY > disappearThreshold) {
                const scaleValue = 0.5 + (opacity * 0.5);
                const moveUpDistance = 100 * (1 - opacity);
                const rotateValue = 360 * (1 - opacity);
                
                star.style.transform = `scale(${scaleValue}) translateY(-${moveUpDistance}px) rotate(${rotateValue}deg)`;
                star.style.filter = `blur(${(1 - opacity) * 5}px)`;
            } else {
                star.style.transform = 'scale(1) translateY(0) rotate(0deg)';
                star.style.filter = 'blur(0)';
            }
        }
    });
    
    // Efek pada teks bintang - menyesuaikan dengan bintang
    document.querySelectorAll('.star-text').forEach((text, index) => {
        const parentStar = text.closest('.main-star');
        const isParentHovered = parentStar && parentStar.matches(':hover');
        if (!isParentHovered) {
            const disappearThreshold = windowHeight * 0.3;
            const disappearDistance = windowHeight * 0.5;
            let opacity = 1 - (Math.min(scrollY - disappearThreshold, disappearDistance) / disappearDistance);
            opacity = Math.max(0, Math.min(1, opacity));
            text.style.opacity = opacity;           
            if (scrollY > disappearThreshold) {
                const moveUpDistance = 70 * (1 - opacity); 
                text.style.transform = `translateX(-50%) translateY(-${moveUpDistance}px)`;
            } else {
                text.style.transform = 'translateX(-50%) translateY(0)';
            }
        }
    });
    
    const starsBackground = document.querySelector('.stars');
    if (starsBackground) {
        starsBackground.style.transform = `translateY(${scrollY * 0.1}px)`;
    }
    
    const moonBottom = document.querySelector('.moon-bottom');
    if (moonBottom) {
        const moonBottomPosition = -250 + (scrollY * 0.1);
        const maxMoonBottomPosition = -150;
        const moonBottomFinalPosition = Math.min(moonBottomPosition, maxMoonBottomPosition);
        moonBottom.style.top = `${moonBottomFinalPosition}px`;
    }
    const cloudThreshold = windowHeight * 0.3; 
    const cloudAnimationDistance = windowHeight * 0.5;
    document.querySelectorAll('.cloud').forEach((cloud, index) => {
        const scrollPastThreshold = Math.max(0, scrollY - cloudThreshold);
        const animationProgress = Math.min(1, scrollPastThreshold / cloudAnimationDistance);
        
        // Pengecekan apakah ini cloud-2 (kiri) atau cloud-3 (kanan)
        const isLeftCloud = cloud.classList.contains('cloud-left');
        const isRightCloud = cloud.classList.contains('cloud-right');
        
        if (isLeftCloud) {
            // Cloud-2 (kiri): keluar ke kiri saat scroll ke bawah
            const moveDistance = -100 * animationProgress - 5;
            cloud.style.transform = `translateX(${moveDistance}%) translateY(${scrollY * 0.05}px)`;
            cloud.style.opacity = 1 - animationProgress * 0.7; 
        } else if (isRightCloud) {
            const moveDistance = 100 * animationProgress + 5;
            cloud.style.transform = `translateX(${moveDistance}%) translateY(${scrollY * 0.05}px)`;
            cloud.style.opacity = 1 - animationProgress * 0.7;
        }
    });
});

//Tambahan fungsi untuk deteksi arah scroll
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    // Deteksi arah scroll (ke atas atau ke bawah)
    const isScrollingDown = scrollTop > lastScrollTop;
    // Efek khusus untuk awan saat scroll ke atas
    if (!isScrollingDown) {
        const cloudThreshold = window.innerHeight * 0.3;
        const cloudAnimationDistance = window.innerHeight * 0.5;
        const scrollPastThreshold = Math.max(0, scrollTop - cloudThreshold);
        const animationProgress = Math.min(1, scrollPastThreshold / cloudAnimationDistance);
        document.querySelectorAll('.cloud').forEach((cloud, index) => {
            const isLeftCloud = cloud.classList.contains('cloud-left');
            const isRightCloud = cloud.classList.contains('cloud-right');
            
            if (isLeftCloud) {
                const moveDistance = -100 * animationProgress - 5;
                cloud.style.transform = `translateX(${moveDistance}%) translateY(${scrollTop * 0.05}px)`;
                cloud.style.opacity = 1 - animationProgress * 0.7;
            } else if (isRightCloud) {
                const moveDistance = 100 * animationProgress + 5;
                cloud.style.transform = `translateX(${moveDistance}%) translateY(${scrollTop * 0.05}px)`;
                cloud.style.opacity = 1 - animationProgress * 0.7;
            }
        });
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, false);

// Menambahkan event listeners untuk hover dan klik pada bintang
document.querySelectorAll('.main-star').forEach(star => {
    star.addEventListener('mouseenter', function() {
        if (this.classList.contains('star-1')) {
            this.style.transform = 'scale(1.8) translateY(-15px) rotate(-10deg)';
            this.style.filter = 'drop-shadow(0 0 15px rgba(0, 191, 255, 0.7))'; 
        } else if (this.classList.contains('star-7')) {
            this.style.transform = 'scale(1.8) translateY(-15px) rotate(10deg)';
            this.style.filter = 'drop-shadow(0 0 15px rgba(255, 215, 0, 0.7))'; 
        } else {

            this.style.transform = 'scale(1.8) translateY(-15px)';
            this.style.filter = 'drop-shadow(0 0 15px rgba(255, 255, 0, 0.7))';
        }
        
        this.style.zIndex = '10';
        
        // Efek pada teks bintang
        const starText = this.querySelector('.star-text');
        if (starText) {
            starText.style.transform = 'translateX(-50%) translateY(-15px)';
            if (this.classList.contains('star-1')) {
                starText.style.color = '#00bfff';
                starText.style.textShadow = '0 0 12px rgba(0, 191, 255, 0.8)';
            } else if (this.classList.contains('star-7')) {
                starText.style.color = '#ffd700';
                starText.style.textShadow = '0 0 12px rgba(255, 215, 0, 0.8)';
            } else {
                starText.style.color = '#ffeb3b';
                starText.style.textShadow = '0 0 12px rgba(255, 235, 59, 0.8)';
            }
            
            starText.style.letterSpacing = '1px';
        }
    });
    
    // Event mouseleave (akhir hover)
    star.addEventListener('mouseleave', function() {
        const scrollEvent = new Event('scroll');
        window.dispatchEvent(scrollEvent);
    });
    
    // Event klik pada bintang
    const starData = {
    'star-1': {
        title: 'Debut',
        image: 'assets/debut-image.png',
        description: 'Langkah pertama kami ke dunia baru. Hari bersejarah dimana semua berawal dan impian mulai terbentuk. Debut kami ditandai dengan peluncuran single pertama yang mendapatkan sambutan hangat dari penggemar.'
    },
    'star-2': {
        title: 'First Album',
        image: 'assets/album-image.png',
        description: 'Album perdana yang menandai kehadiran kami di industri musik. Penuh dengan semangat dan kreativitas baru. Album ini berisi 10 lagu yang menggambarkan perjalanan awal kami.'
    },
    'star-3': {
        title: 'First Concert',
        image: 'assets/concert-image.png',
        description: 'Pertunjukan pertama di depan penggemar setia. Momen penuh emosi dan kebahagiaan yang tak terlupakan. Konser ini diadakan di venue kecil namun penuh dengan energi yang luar biasa.'
    },
    'star-4': {
        title: 'First Merch',
        image: 'assets/merch-image.png',
        description: 'Peluncuran merchandise pertama kami. Cara baru untuk terhubung dengan penggemar dan berbagi kenangan. Merch ini dirancang dengan penuh cinta untuk para penggemar setia.'
    },
    'star-5': {
        title: 'First Award',
        image: 'assets/award-image.png',
        description: 'Penghargaan pertama yang kami terima. Bukti kerja keras dan dedikasi selama perjalanan ini. Momen penuh haru saat nama kami diumumkan sebagai pemenang.'
    },
    'star-6': {
        title: 'World Tour',
        image: 'assets/tour-image.png',
        description: 'Tur keliling dunia pertama kami. Bertemu penggemar dari berbagai negara dan budaya. Tur ini membawa kami ke 15 kota di 10 negara berbeda dan menjadi pengalaman tak terlupakan.'
    },
    'star-7': {
        title: 'Anniversary',
        image: 'assets/anniversary-image.png',
        description: 'Perayaan satu tahun perjalanan kami. Melihat kembali pencapaian dan merencanakan masa depan. Kami merayakannya dengan konser spesial dan merilis single baru sebagai hadiah untuk penggemar.'
    }
};

// Tambahkan kode ini pada bagian event listener untuk bintang
document.addEventListener('DOMContentLoaded', function() {
    const cardContainer = document.getElementById('starCardContainer');
    const cardTitle = document.getElementById('cardTitle');
    const cardImage = document.getElementById('cardImage');
    const cardDescription = document.getElementById('cardDescription');
    const closeCardBtn = document.getElementById('closeCard');
    const starCard = document.querySelector('.star-card');
    
    // Menampilkan card saat bintang diklik
    document.querySelectorAll('.main-star').forEach(star => {
        // Tambahkan event listener klik untuk menampilkan card
        star.addEventListener('click', function() {
            // Identifikasi bintang mana yang diklik berdasarkan class
            let starId = '';
            for (let i = 1; i <= 7; i++) {
                if (this.classList.contains('star-' + i)) {
                    starId = 'star-' + i;
                    break;
                }
            }
            
            if (starId && starData[starId]) {
                // Isi konten card berdasarkan data bintang
                cardTitle.textContent = starData[starId].title;
                cardImage.src = starData[starId].image;
                cardImage.alt = starData[starId].title;
                cardDescription.textContent = starData[starId].description;
                
                // Reset class untuk styling khusus
                starCard.classList.remove('debut-card', 'anniversary-card');
                
                // Tambahkan class khusus jika bintang spesial
                if (starId === 'star-1') {
                    starCard.classList.add('debut-card');
                } else if (starId === 'star-7') {
                    starCard.classList.add('anniversary-card');
                }
                
                // Tampilkan card dengan animasi
                cardContainer.classList.add('active');
                
                // Menghentikan propagasi event agar tidak mengganggu event scroll
                event.stopPropagation();
            }
        });
    });
    
    // Menutup card saat tombol close diklik
    closeCardBtn.addEventListener('click', function() {
        cardContainer.classList.remove('active');
    });
    
    // Menutup card saat klik di luar card
    cardContainer.addEventListener('click', function(event) {
        if (event.target === cardContainer) {
            cardContainer.classList.remove('active');
        }
    });
    
    // Mencegah card tertutup saat klik di dalam card
    document.querySelector('.star-card').addEventListener('click', function(event) {
        event.stopPropagation();
    });
});
});