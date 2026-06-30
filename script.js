let selectedBride = "";
let selectedItems = [];

const hamperItems = [
  { name: "Lipstick", icon: "💄" },
  { name: "Lip Balm", icon: "🩷" },
  { name: "Mascara", icon: "👁️" },
  { name: "Blush", icon: "🌷" },
  { name: "Kajal", icon: "🖤" },

  { name: "Face Masks", icon: "🧖🏻‍♀️" },
  { name: "Hand Cream", icon: "🧴" },
  { name: "Sunscreen", icon: "☀️" },
  { name: "Face Mist", icon: "🌫️" },
  { name: "Under-eye Patches", icon: "✨" },

  { name: "Earrings", icon: "💎" },
  { name: "Bracelet", icon: "♡" },
  { name: "Charm Necklace", icon: "📿" },
  { name: "Rings", icon: "💍" },

  { name: "Perfume", icon: "🌸" },
  { name: "Body Mist", icon: "🍑" },
  { name: "Scented Lotion", icon: "🧁" },

  { name: "Chocolates", icon: "🍫" },
  { name: "Cookies", icon: "🍪" },
  { name: "Candy", icon: "🍬" },
  { name: "Tea", icon: "🍵" },
  { name: "Coffee", icon: "☕" },

  { name: "Candle", icon: "🕯️" },
  { name: "Bath Salt", icon: "🛁" },
  { name: "Sleep Mask", icon: "🌙" },
  { name: "Aromatherapy Roller", icon: "🌿" },

  { name: "Name Pouch", icon: "👝" },
  { name: "Tumbler", icon: "🥤" },
  { name: "Keychain", icon: "🗝️" },
  { name: "Personalized Compact Mirror", icon: "🪞" },
  { name: "Initials Charm", icon: "🔖" }
  { name: "Cermaic disesh/decor", icon: "🔖" }
];

function chooseBride(name) {
  selectedBride = name;

  document.querySelectorAll(".envelope-card").forEach(function(button) {
    button.disabled = true;
    if (button.textContent.includes(name)) {
      button.classList.add("opening");
    }
  });

  setTimeout(function() {
    document.getElementById("welcomePage").classList.remove("active");
    document.getElementById("hamperPage").classList.add("active");
    document.getElementById("hamperTitle").textContent = name + "'s Hamper";
    renderItems();
  }, 700);
}

function renderItems() {
  const grid = document.getElementById("itemsGrid");
  grid.innerHTML = "";

  hamperItems.forEach(function(item) {
    const card = document.createElement("button");
    card.className = "item-card";
    card.innerHTML = `
      <span class="item-icon">${item.icon}</span>
      <span>${item.name}</span>
    `;

    card.onclick = function() {
      addItem(item.name);
      card.classList.add("picked");
      setTimeout(function() {
        card.classList.remove("picked");
      }, 500);
    };

    grid.appendChild(card);
  });
}

function addItem(itemName) {
  if (!selectedItems.includes(itemName)) {
    selectedItems.push(itemName);
  }

  renderSelectedItems();
}

function removeItem(itemName) {
  selectedItems = selectedItems.filter(function(item) {
    return item !== itemName;
  });

  renderSelectedItems();
}

function renderSelectedItems() {
  const selectedBox = document.getElementById("selectedItems");
  selectedBox.innerHTML = "";

  if (selectedItems.length === 0) {
    selectedBox.innerHTML = `<p class="empty-text">Your chosen pieces will appear here</p>`;
    return;
  }

  selectedItems.forEach(function(itemName) {
    const pill = document.createElement("button");
    pill.className = "selected-pill";
    pill.textContent = itemName + " ×";
    pill.onclick = function() {
      removeItem(itemName);
    };
    selectedBox.appendChild(pill);
  });
}

function finishHamper() {
  const missedText = document.getElementById("missedText").value.trim();

  fetch("https://script.google.com/macros/s/AKfycbzSt8HM7ZBsi6dOcv4gnGYJuIuyuCQ1NbcHe1dEcLlNv32BU4Wso8FDgIpVyQ6fhZbE/exec", {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: selectedBride,
      items: selectedItems,
      notes: missedText
    })
  });

  document.getElementById("hamperPage").classList.remove("active");
  document.getElementById("thankYouPage").classList.add("active");
  document.getElementById("thankYouTitle").textContent = "Thank you, " + selectedBride;
}
