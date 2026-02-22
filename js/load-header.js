// ページの深さに応じて ../ を自動生成
function getBasePath() {
    const path = window.location.pathname.replace(/^\/WebPage/, "");
    const depth = path.split("/").length - 2;
    return "../".repeat(depth);
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

