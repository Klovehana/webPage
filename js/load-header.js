// ページの深さに応じて ../ を自動生成
function getBasePath() {
    // GitHub Pages の /webPage を除去（ローカルでは何もしない）
    const path = window.location.pathname.replace(/^\/webPage/, "");

    const segments = path.split("/").filter(Boolean);
    const depth = segments.length - 1;

    return depth > 0 ? "../".repeat(depth) : "";
}

// header を読み込む
fetch(getBasePath() + "components/header.html")
    .then(res => res.text())
    .then(data => {
        document.body.insertAdjacentHTML("afterbegin", data);

        const base = getBasePath();
        document.querySelectorAll("[data-link]").forEach(link => {
            if (link.dataset.link === "home") link.href = base + "index.html";
            if (link.dataset.link === "maids") link.href = base + "maids.html";
            if (link.dataset.link === "menu") link.href = base + "menu.html";
        });
    });