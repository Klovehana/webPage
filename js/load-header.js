document.addEventListener("DOMContentLoaded", function () {
    console.log("loadHeader() が呼ばれました1"); // ← ここで確認
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

            document.querySelectorAll("[data-link]").forEach(link => {
                switch (link.dataset.link) {
                    case "home":
                        link.href = asset("index.html");
                        break;
                    case "maids":
                        link.href = asset("maids.html");
                        break;
                    case "menu":
                        link.href = asset("menu.html");
                        break;
                    case "special":
                        link.href = asset("special.html");
                        break;
                }
            });
        })
        .catch(err => {
            console.error("Header error:", err);
        });
    console.log("loadHeader() が呼ばれました2"); // ← ここで確認

});