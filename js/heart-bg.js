document.addEventListener("DOMContentLoaded", function () {

    const heartContainer = document.querySelector('.heart-bg');
    if (!heartContainer) return;

    for (let i = 0; i < 35; i++) {   // ← 数で量調整
        const heart = document.createElement('img');
        heart.src = '/images/ui/heart.png';  // ← ここ重要
        heart.classList.add('heart');

        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (6 + Math.random() * 6) + 's';
        heart.style.animationDelay = Math.random() * 5 + 's';
        heart.style.width = (20 + Math.random() * 40) + 'px';

        heartContainer.appendChild(heart);
    }

});
