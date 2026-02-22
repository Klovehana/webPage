function loadHeader() {

    if (document.querySelector(".site-header")) return;

    fetch(BASE_PATH + "components/header.html")
        .then(res => res.text())
        .then(data => {
            document.body.insertAdjacentHTML("afterbegin", data);

            document.querySelectorAll("[data-link]").forEach(link => {
                switch (link.dataset.link) {
                    case "home":
                        link.href = BASE_PATH + "index.html";
                        break;
                    case "maids":
                        link.href = BASE_PATH + "maids.html";
                        break;
                    case "menu":
                        link.href = BASE_PATH + "menu.html";
                        break;
                    case "special":
                        link.href = BASE_PATH + "special.html";
                        break;
                }
            });
        });
}

window.addEventListener("DOMContentLoaded", loadHeader);