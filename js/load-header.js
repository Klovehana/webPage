function getBasePath() {
    const path = window.location.pathname;
    const cleanedPath = path.replace(/^\/webPage/, "");
    const segments = cleanedPath.split("/").filter(Boolean);
    const depth = segments.length > 0 ? segments.length - 1 : 0;
    return depth > 0 ? "../".repeat(depth) : "";
}

async function loadHeader() {
    const base = getBasePath();

    // 既にあるなら削除（重要）
    const existing = document.querySelector(".site-header");
    if (existing) existing.remove();

    try {
        const res = await fetch(base + "components/header.html", {
            cache: "no-store"   // ← 超重要
        });

        if (!res.ok) throw new Error("header.html not found");

        const data = await res.text();
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

    } catch (err) {
        console.error("Header読み込み失敗:", err);
    }
}

// 通常読み込み
window.addEventListener("DOMContentLoaded", loadHeader);

// ブラウザバック対応
window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
        loadHeader();
    }
});