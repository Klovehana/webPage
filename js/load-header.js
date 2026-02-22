function getBasePath() {
    const path = window.location.pathname;
    const cleanedPath = path.replace(/^\/webPage/, "");
    const segments = cleanedPath.split("/").filter(Boolean);
    const depth = segments.length > 0 ? segments.length - 1 : 0;
    return depth > 0 ? "../".repeat(depth) : "";
}

function loadHeader() {
    const base = getBasePath();

    // すでにヘッダーがあるなら何もしない
    if (document.querySelector(".site-header")) return;

    fetch(base + "components/header.html")
        .then(res => res.text())
        .then(data => {
            document.body.insertAdjacentHTML("afterbegin", data);

            document.querySelectorAll("[data-link]").forEach(link => {
                switch (link.dataset.link) {
                    case "home":
                        link.href = base + "index.html";
                        break;
                    case "maids":
                        link.href = base + "maids.html";
                        break;
                    case "menu":
                        link.href = base + "menu.html";
                        break;
                    case "special":
                        link.href = base + "special.html";
                        break;
                }
            });
        });
}

// 通常読み込み
window.addEventListener("DOMContentLoaded", loadHeader);

// ブラウザバック対応（←これが重要）
window.addEventListener("pageshow", loadHeader);