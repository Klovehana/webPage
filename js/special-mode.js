// ---------------------------
// モード切替管理（フェード付き）
// ---------------------------

function switchMode(newMode) {
    // ボタン操作時だけフェード開始
    document.body.classList.add("fade");

    // 一旦通常モードに戻す
    document.body.classList.remove("secret-mode", "mosaic-mode-active");
    localStorage.removeItem("siteMode");
    localStorage.removeItem("mosaicMode");

    setTimeout(() => {
        if (newMode === "secret") {
            document.body.classList.add("secret-mode");
            localStorage.setItem("siteMode", "secret");
        } else if (newMode === "mosaic") {
            document.body.classList.add("mosaic-mode-active");
            localStorage.setItem("mosaicMode", "true");
        }

        // フェード終了
        setTimeout(() => {
            document.body.classList.remove("fade");
        }, 500);

    }, 50); // 少し待つとトランジションが滑らか
}

// ---------------------------
// パスワード判定
// ---------------------------
function checkPassword() {
    const input = document.getElementById("passwordInput").value;
    const message = document.getElementById("message");

    if (input === "mukuge815") {
        switchMode("secret");
        message.textContent = "スペシャルモードが有効になりました♡";
    } else if (input === "choppari") {
        switchMode("mosaic");
        message.textContent = "劣等遺伝子を検知";
    } else {
        message.textContent = "パスワードが違います…";
    }
}

// ---------------------------
// 通常モードに戻す
// ---------------------------
function resetMode() {
    document.body.classList.add("fade");
    document.body.classList.remove("secret-mode", "mosaic-mode-active");
    localStorage.removeItem("siteMode");
    localStorage.removeItem("mosaicMode");

    setTimeout(() => {
        document.body.classList.remove("fade");
    }, 500);

    alert("通常モードに戻りました♡");
}

// ---------------------------
// ページロード時に状態を復元（フェードなし）
// ---------------------------
window.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("siteMode") === "secret") {
        document.body.classList.add("secret-mode");
    }
    if (localStorage.getItem("mosaicMode") === "true") {
        document.body.classList.add("mosaic-mode-active");
    }
});

const heartImages = [
    "/images/ui/censored/heart1.png",
    "/images/ui/censored/heart2.png",
    "/images/ui/censored/heart3.png"
];

function createMosaicHeart() {
    const heart = document.createElement("img");
    heart.classList.add("mosaic-heart");

    const randomImage =
        heartImages[Math.floor(Math.random() * heartImages.length)];
    heart.src = randomImage;

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = Math.random() * 100 + "vh";
    heart.style.animationDuration = 6 + Math.random() * 4 + "s";

    heart.style.width = 400 + Math.random() * 200 + "px";


    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 10000);

}


setInterval(() => {
    if (document.body.classList.contains("mosaic-mode-active")) {
        for (let i = 0; i < 3; i++) {
            createMosaicHeart();
        }
    }
}, 700);

