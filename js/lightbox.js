let currentLightboxIndex = 0;
let currentLightboxImages = [];

// 1. 分類切換邏輯
function showSlider(categoryId) {
document.querySelectorAll('.slider-group, .note-content').forEach(el => el.classList.remove('active'));

    const targetSlider = document.getElementById(categoryId);
    const targetNote = document.getElementById('note-' + categoryId);

    if (targetSlider) {
        targetSlider.classList.add('active');
        const container = targetSlider.querySelector('.slider-container');
        if (container) container.scrollLeft = 0;
    }
    if (targetNote) targetNote.classList.add('active');
}

// 2. 輪播器控制邏輯
function moveSlide(sliderId, direction) {
const container = document.querySelector(`#${sliderId} .slider-container`);
    if (!container) return;

    const scrollWidth = container.clientWidth; 
    const currentScroll = container.scrollLeft; 
    
    let targetLeft = Math.round(currentScroll / scrollWidth + direction) * scrollWidth;

    const maxScroll = container.scrollWidth - scrollWidth;
    if (targetLeft > maxScroll) targetLeft = 0; // 超過最後一張回到第一張
    else if (targetLeft < 0) targetLeft = Math.floor(maxScroll / scrollWidth) * scrollWidth;  //低於第一張跳到最後一張

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