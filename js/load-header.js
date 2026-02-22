// ============================
// ブラウザバック（bfcache）対応
// ============================
window.addEventListener('pageshow', function (event) {
    if (event.persisted || (window.performance && window.performance.navigation.type === 2)) {
        console.log(`[${new Date().toLocaleTimeString()}] pageshow detected bfcache, reloading page`);
        window.location.reload();
    }
});

// ============================
// DOMContentLoaded で header 読み込み
// ============================
document.addEventListener("DOMContentLoaded", function () {
    console.log(`[${new Date().toLocaleTimeString()}] loadHeader() が呼ばれました`);

    // ===== ベースパス =====
    const BASE_PATH = location.hostname.includes("github.io")
        ? "/webPage/"
        : "/";

    function asset(path) {
        return BASE_PATH + path;
    }

    // ===== header読み込み =====
    if (document.querySelector(".site-header")) return;

    fetch(asset("components/header.html"))
        .then(res => {
            if (!res.ok) throw new Error("Header load failed");
            return res.text();
        })
        .then(data => {
            document.body.insertAdjacentHTML("afterbegin", data);
            console.log(`[${new Date().toLocaleTimeString()}] header が読み込まれました`);

            document.querySelectorAll("[data-link]").forEach(link => {
                switch (link.dataset.link) {
                    case "home": link.href = asset("index.html"); break;
                    case "maids": link.href = asset("maids.html"); break;
                    case "menu": link.href = asset("menu.html"); break;
                    case "special": link.href = asset("special.html"); break;
                }
            });
        })
        .catch(err => {
            console.error("Header error:", err);
        });
});