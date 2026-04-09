let currentSlideIndex = 0;
let currentLightboxIndex = 0;
let currentLightboxImages = [];

// 1. 分類切換邏輯
function showSlider(sliderId) {
    const groups = document.querySelectorAll('.slider-group');
    groups.forEach(g => g.classList.remove('active'));

    const btns = document.querySelectorAll('.tab-btn');
    btns.forEach(b => b.classList.remove('active'));

    const target = document.getElementById(sliderId);
    if (target) {
        target.classList.add('active');
        currentSlideIndex = 0;
        const container = target.querySelector('.slider-container');
        if (container) container.scrollLeft = 0;
    }

    if (window.event && window.event.currentTarget) {
        window.event.currentTarget.classList.add('active');
    }
}

// 2. 輪播器控制邏輯
function moveSlide(sliderId, direction) {
    const container = document.querySelector(`#${sliderId} .slider-container`);
    if (!container) return;

    const items = container.querySelectorAll('.item');
    const totalSlides = items.length;

    currentSlideIndex += direction;
    if (currentSlideIndex >= totalSlides) currentSlideIndex = 0;
    else if (currentSlideIndex < 0) currentSlideIndex = totalSlides - 1;

    const targetLeft = container.clientWidth * currentSlideIndex;
    container.scrollTo({ left: targetLeft, behavior: 'smooth' });
}

// 3. Lightbox 手動控制邏輯
function openLightbox(imgElement) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");

    const container = imgElement.closest('.slider-container');
    const allImages = Array.from(container.querySelectorAll('img'));

    currentLightboxImages = allImages.map(img => img.src);
    currentLightboxIndex = currentLightboxImages.indexOf(imgElement.src);

    lightbox.style.display = "flex";
    lightboxImg.src = currentLightboxImages[currentLightboxIndex];
    document.body.style.overflow = "hidden"; 
}

function changeLightboxImage(direction) {
    currentLightboxIndex = (currentLightboxIndex + direction + currentLightboxImages.length) % currentLightboxImages.length;
    document.getElementById("lightbox-img").src = currentLightboxImages[currentLightboxIndex];
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
    document.body.style.overflow = "auto";
}

// 4. 事件監聽 (鍵盤 / 外部點擊)
document.addEventListener('keydown', function (e) {
    const lb = document.getElementById("lightbox");
    if (lb && lb.style.display === "flex") {
        if (e.key === "ArrowLeft") changeLightboxImage(-1);
        if (e.key === "ArrowRight") changeLightboxImage(1);
        if (e.key === "Escape") closeLightbox();
    }
});

// 點擊燈箱背景關閉
window.addEventListener('click', function(e) {
    const lb = document.getElementById("lightbox");
    if (e.target === lb) {
        closeLightbox();
    }
});