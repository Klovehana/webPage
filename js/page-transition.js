document.addEventListener("DOMContentLoaded", function () {

    document.addEventListener("click", function (e) {

        const link = e.target.closest("a");
        if (!link) return;

        const href = link.getAttribute("href");

        if (!href || href.startsWith("#") || link.hostname !== location.hostname) {
            return;
        }

        e.preventDefault();

        // スクロール止める
        document.documentElement.style.overflow = "hidden";

        // まず少し待つ（描画確定）
        requestAnimationFrame(() => {
            document.body.classList.add("fade-out");

            setTimeout(function () {
                window.location.href = link.href;
            }, 600); // 少し長め
        });

    });

});
