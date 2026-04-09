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