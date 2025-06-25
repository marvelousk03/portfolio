const nums = [1, 2, 3, 4, 5, 6];
const items = [
  "Coke 🥤",
  "Kit Kat 🍫",
  "Bar One 🍫",
  "Fanta 🍊",
  "Simba Chips 🍟",
  "Chappies 🍬"
];

const prices = [7.5, 9.5, 8.5, 7.5, 6.5, 0.50];

let quantities = new Array(items.length).fill(0);
let totals = new Array(items.length).fill(0);
let totalOrderAmt = 0;

// Optional sounds (still included for fun)
const addSound = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-quick-win-video-game-notification-269.mp3");
const removeSound = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-player-losing-or-failing-2042.mp3");

function add_selection(x) {
  quantities[x]++;
  totals[x] = prices[x] * quantities[x];
  totalOrderAmt += prices[x];
  addSound.play();
  showToast(`✅ Added ${items[x]}`);
  display_all();
}

function remove_selection(x) {
  if (quantities[x] > 0) {
    quantities[x]--;
    totals[x] = prices[x] * quantities[x];
    totalOrderAmt -= prices[x];
    removeSound.play();
    showToast(`❌ Removed ${items[x]}`);
  }
  display_all();
}

function allToGetHer() {
  return totals.reduce((sum, val) => sum + val, 0);
}

function display_all() {
  let table = `
    <table>
      <tr>
        <th>#</th>
        <th>Item</th>
        <th>Price (R)</th>
        <th>Qty</th>
        <th>Total (R)</th>
        <th>Add</th>
        <th>Remove</th>
      </tr>
  `;

  for (let i = 0; i < items.length; i++) {
    table += `
      <tr>
        <td>${nums[i]}</td>
        <td>${items[i]}</td>
        <td>R${prices[i].toFixed(2)}</td>
        <td>${quantities[i]}</td>
        <td>R${totals[i].toFixed(2)}</td>
        <td><button onclick="add_selection(${i})">➕</button></td>
        <td><button onclick="remove_selection(${i})" ${quantities[i] === 0 ? 'disabled' : ''}>➖</button></td>
      </tr>
    `;
  }

  table += `</table>`;
  document.getElementById("demo").innerHTML = table;
  document.getElementById("totalDisplay").textContent = `💰 Total Order Amount: R${totalOrderAmt.toFixed(2)}`;
}

function TotalForEverything() {
  const final = allToGetHer();
  alert(`🎉 Final Total: R${final.toFixed(2)}\nThanks for shopping! 🛍️`);
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.classList.add("show-toast");
  setTimeout(() => toast.classList.remove("show-toast"), 2000);
}

// Dark Mode Toggle
document.getElementById("darkModeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Checkout button
document.getElementById("Shopright").addEventListener("click", TotalForEverything);

// Load table on page load
window.onload = display_all;
