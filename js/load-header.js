// ページの深さに応じて ../ を自動生成
function getBasePath() {
    const path = window.location.pathname;

    // GitHub Pages の /webPage を除去（ローカルでは影響なし）
    const cleanedPath = path.replace(/^\/webPage/, "");

    const segments = cleanedPath.split("/").filter(Boolean);

    // ファイル名を除いた階層の深さ
    const depth = segments.length > 0 ? segments.length - 1 : 0;

    return depth > 0 ? "../".repeat(depth) : "";
}

// DOM読み込み後に実行（重要）
document.addEventListener("DOMContentLoaded", () => {
    const base = getBasePath();

    fetch(base + "components/header.html")
        .then(res => {
            if (!res.ok) throw new Error("header.html が見つかりません");
            return res.text();
        })
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
        })
        .catch(err => {
            console.error("Header読み込みエラー:", err);
        });
});