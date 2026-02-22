fetch("data/maids.json")
  .then(res => res.json())
  .then(data => {

    const list = document.getElementById("maid-list");

    const isSecret = localStorage.getItem("siteMode") === "secret";
    const isMosaic = localStorage.getItem("mosaicMode") === "true";

    data.forEach(maid => {

      // ★ スペシャル用データ上書き
      const displayData = (isSecret && maid.special)
        ? { ...maid, ...maid.special }
        : maid;

      // カード生成（←先に作る！）
      const card = document.createElement("div");
      card.className = "maid-card";

      if (maid.isOff) card.classList.add("off");
      if (maid.isRecommended) card.classList.add("recommended");

      // 画像
      const imageFile = isSecret
        ? `${maid.id}_secret.png`
        : `${maid.id}.png`;

      // 新人バッジ
      const badgeText = isSecret ? "処女" : "新人";
      const newMark = maid.isNew
        ? `<div class="newbie-badge"><span>${badgeText}</span></div>`
        : "";

      // お休みバッジ
      let offMark = "";
      if (maid.isOff) {
        const text = isSecret ? "接客中❤" : "休憩中";
        offMark = `<div class="off-badge">${text}</div>`;
      }

      // モザイク
      const overlay = isMosaic
        ? `<img src="images/ui/mosaic_overlay.png" class="overlay-image">`
        : "";

      // おすすめ
      const recommendText = `
  <p class="recommend-text ${maid.isRecommended ? "" : "empty"}">
    ${maid.isRecommended
          ? (isSecret ? "排卵日❤" : "本日のおすすめ")
          : ""
        }
  </p>
`;


      // ★ displayData を使うのが重要
      card.innerHTML = `
        <div class="image-wrapper">
          <img src="images/maids/${imageFile}" alt="${displayData.name}">
          ${overlay}
          ${newMark}
          ${offMark}
        </div>
        ${recommendText}
        <h2>${displayData.name}</h2>
        <p>${displayData.type}</p>
        <a class="btn" href="maids/maid.html?id=${maid.id}">
            プロフィール
        </a>
      `;

      list.appendChild(card);
    });
    // --- 名前自動フィット ---
    const nameEl = card.querySelector("h2");

    // 初期サイズ（CSSと合わせる）
    let fontSize = 20;
    nameEl.style.fontSize = fontSize + "px";

    // はみ出している間小さくする
    while (nameEl.scrollWidth > nameEl.clientWidth && fontSize > 12) {
      fontSize--;
      nameEl.style.fontSize = fontSize + "px";
    }

  });
