document.addEventListener("DOMContentLoaded", function () {
    console.log(`[${new Date().toLocaleTimeString()}] loadHeader() が呼ばれました (DOMContentLoaded)`);

    // ===== ベースパス =====
    const BASE_PATH = location.hostname.includes("github.io")
        ? "/webPage/"
        : "/";

    function asset(path) {
        return BASE_PATH + path;
    }

    // ===== header読み込み =====
    function loadHeader() {
        console.log(`[${new Date().toLocaleTimeString()}] loadHeader() 実行`);
        if (document.querySelector(".site-header")) {
            console.log("header は既に描画済み");
            return;
        }

        fetch(asset("components/header.html"))
            .then(res => {
                if (!res.ok) throw new Error("Header load failed");
                return res.text();
            })
            .then(data => {
                document.body.insertAdjacentHTML("afterbegin", data);

                document.querySelectorAll("[data-link]").forEach(link => {
                    switch (link.dataset.link) {
                        case "home": link.href = asset("index.html"); break;
                        case "maids": link.href = asset("maids.html"); break;
                        case "menu": link.href = asset("menu.html"); break;
                        case "special": link.href = asset("special.html"); break;
                    }
                });

                console.log("header が DOM に挿入されました");
            })
            .catch(err => {
                console.error("Header error:", err);
            });
    }

    // 初回ロード
    loadHeader();

    // ========================
    // ブラウザバック対応
    // ========================
    window.addEventListener("pageshow", (event) => {
        console.log(`[${new Date().toLocaleTimeString()}] pageshow fired. persisted:`, event.persisted);
        loadHeader();
    });
});