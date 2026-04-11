function toggleMenu() {
    const menu = document.getElementById("side-menu");
    if (menu.style.display === "flex") {
        menu.style.display = "none";
    } else {
        menu.style.display = "flex";
    }
}

// 點擊網頁其他地方時，自動關閉選單）
window.onclick = function (event) {
    if (!event.target.matches('.menu-btn')) {
        const menu = document.getElementById("side-menu");
        if (menu && menu.style.display === "flex") {
            menu.style.display = "none";
        }
    }
}

window.addEventListener('load', function() {
    const bgm = document.getElementById('bgm');
    const btn = document.getElementById('music-toggle');
    const icon = btn ? btn.querySelector('.icon') : null;

    const shouldPlay = localStorage.getItem('playBgm');
    const isFromIndex = localStorage.getItem('resetMusic');

    const savedTime = localStorage.getItem('musicCurrentTime');

    if (bgm) {
        bgm.volume = 0.8;

        // Index to Home 
        if (isFromIndex === 'true') {
            bgm.currentTime = 0;
            localStorage.removeItem('resetMusic');
            playAndSync(bgm, btn);
        } 
        else if (shouldPlay === 'true') {
            if (savedTime) {
                const offset = 0.5;
                bgm.currentTime = parseFloat(savedTime) + offset;
            }
            playAndSync(bgm, btn);
        }
    }

    setInterval(() => {
        if (bgm && !bgm.paused) {
            localStorage.setItem('musicCurrentTime', bgm.currentTime);
        }
    }, 1000);
});


function playAndSync(bgm, btn) {
    bgm.volume = 0;
    
    bgm.play().then(() => {
        if (btn) btn.classList.add('playing');
        
        // Fade-in
        let targetVolume = 0.5; 
        let duration = 500;    
        let step = 0.05;       
        let interval = duration / (targetVolume / step);
        
        let fadeIn = setInterval(() => {
            if (bgm.volume < targetVolume) {
                bgm.volume = Math.min(bgm.volume + step, targetVolume);
            } else {
                clearInterval(fadeIn);
            }
        }, interval);

    }).catch(err => {
        console.log("等待點擊後接續音樂...");
    });
}


function toggleMusic() {
    const bgm = document.getElementById('bgm');
    const btn = document.getElementById('music-toggle');
    
    if (bgm.paused) {
        bgm.play();
        btn.classList.add('playing');
        localStorage.setItem('playBgm', 'true');
    } else {
        bgm.pause();
        btn.classList.remove('playing');
        localStorage.setItem('playBgm', 'false');

        localStorage.setItem('musicCurrentTime', bgm.currentTime);
    }
}