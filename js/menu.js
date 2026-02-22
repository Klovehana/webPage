fetch("data/menu.json")
  .then(res => res.json())
  .then(data => {

    const container = document.getElementById("menu-container");

    data.forEach(item => {

      const card = document.createElement("div");
      card.className = "menu-card";

      card.innerHTML = `
        <img src="${item.image}">
        <h2>${item.name}</h2>
        <p>¥${item.price}</p>
        <p>${item.description}</p>
      `;

      container.appendChild(card);
    });
  });
