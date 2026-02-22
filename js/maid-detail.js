// 個人ページ用 JS
const params = new URLSearchParams(window.location.search);
const maidId = params.get("id"); // URLからID取得
const detail = document.getElementById("maid-detail"); // 個人ページに必要

const isSecret = localStorage.getItem("siteMode") === "secret";
const isMosaic = localStorage.getItem("mosaicMode") === "true";

fetch("../data/maids.json")
  .then(res => res.json())
  .then(data => {
    const maid = data.find(m => m.id === maidId);
    // スペシャルデータ
    const specialBlock = isSecret && maid.special
      ? `
    <div class="maid-info special-info">
      <p>３サイズ：${maid.special.sizes}</p>
      <p>オナニー：${maid.special.drinksPerWeek}</p>
      <p>頂いた精液：${maid.special.waterBottle}ml</p>
      <p>恋人：${maid.special.lover}</p>
    </div>
  `
      : "";

    if (!maid) {
      detail.innerHTML = "<p>メイドが見つかりません。</p>";
      return;
    }

    // 画像ファイル切替
    const imageFile = isSecret
      ? `${maid.id}_secret.png`
      : `${maid.id}.png`;

    // バッジテキスト切替
    const badgeText = isSecret ? "❤処女" : "❤新人";

    // 新人バッジ（文字だけ）
    const newMark = maid.isNew
      ? `<div class="newbie-badge">${badgeText}</div>`
      : "";

    // バッジテキスト切替
    const offText = isSecret ? "接客中" : "休憩中";
    // お休みバッジ
    const offMark = maid.isOff
      ? `<div class="off-badge">${offText}</div>`
      : "";

    // モザイク用オーバーレイ画像（元画像は blur なし）
    const overlay = isMosaic
      ? `<img src="../images/ui/mosaic_overlay.png" class="overlay-image" alt="モザイク">`
      : "";

    const recommendText = `
  <p class="recommend-text ${maid.isRecommended ? "" : "empty"}">
    ${maid.isRecommended
        ? (isSecret ? "排卵日❤" : "本日のおすすめ")
        : ""
      }
  </p>
`;



    detail.innerHTML = `
<div class="image-wrapper">
  <img src="../images/maids/${imageFile}" alt="${maid.name}">
  ${overlay}
  ${newMark}
  ${offMark}
</div>

${recommendText}

<h1>${isSecret && maid.special ? maid.special.name : maid.name}</h1>

<div class="profile-wrapper">
  <div class="maid-info">
    <p>タイプ：${isSecret && maid.special ? maid.special.type : maid.type}</p>
    <p>誕生日：${maid.birthday}</p>
    <p>${isSecret ? "性感帯" : "好きなもの"}：${isSecret && maid.special ? maid.special.likes : maid.likes}</p>    

    <p class="message">
      ${isSecret && maid.special ? maid.special.message : maid.message}
    </p>
  </div>

  ${specialBlock}
</div>

<a href="../maids.html" class="btn">一覧へ戻る</a>
`;


  });
