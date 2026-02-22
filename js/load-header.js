// ============================
// フェード用クラスを追加
// ============================
document.body.classList.add("fade-in");

// ============================
// ブラウザバック（bfcache）対応
// ============================
window.addEventListener('pageshow', function (event) {
    if (event.persisted || (window.performance && window.performance.navigation.type === 2)) {
        console.log(`[${new Date().toLocaleTimeString()}] pageshow detected bfcache, triggering fade-in`);

        // 一旦非表示にしてから再フェード
        document.body.classList.remove("visible");
        setTimeout(() => {
            document.body.classList.add("visible");
            console.log(`[${new Date().toLocaleTimeString()}] pageshow フェードイン完了`);
        }, 50);
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
    if (!document.querySelector(".site-header")) {
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

                // header読み込み後にフェードイン
                setTimeout(() => {
                    document.body.classList.add("visible");
                    console.log(`[${new Date().toLocaleTimeString()}] 初回フェードイン完了`);
                }, 50);
            })
            .catch(err => {
                console.error("Header error:", err);
            });
    } else {
        // header 既にある場合もフェードイン
        setTimeout(() => {
            document.body.classList.add("visible");
            console.log(`[${new Date().toLocaleTimeString()}] header 既存のままフェードイン`);
        }, 50);
    }
});