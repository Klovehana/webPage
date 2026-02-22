document.addEventListener("DOMContentLoaded", function () {

    // ===== ベースパス自動判定 =====
    const BASE_PATH = location.hostname.includes("github.io")
        ? "/webPage/"
        : "/";

    function asset(path) {
        return BASE_PATH + path;
    }

    const heartContainer = document.querySelector('.heart-bg');
    if (!heartContainer) return;

    for (let i = 0; i < 35; i++) {

        const heart = document.createElement('img');

        // 🔥 ここを修正
        heart.src = asset("images/ui/heart.png");

        heart.classList.add('heart');

        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (6 + Math.random() * 6) + 's';
        heart.style.animationDelay = Math.random() * 5 + 's';
        heart.style.width = (20 + Math.random() * 40) + 'px';

        heartContainer.appendChild(heart);
    }

});