const suggestionsList = [
  "Dashboard",
  "Prediction",
  "Analytics",
  "Machine Learning",
  "Study Trends",
  "Reports",
  "Graphs",
  "Login",
  "Register",
];
const searchInput = document.querySelector(".search-input");
const suggestionsBox = document.querySelector(".suggestions");
const historyBox = document.querySelector(".history-box");

let history = JSON.parse(localStorage.getItem("history")) || [];

searchInput.addEventListener("input", function () {
  let value = this.value.toLowerCase();
  suggestionsBox.innerHTML = "";
  if (value) {
    suggestionsBox.style.display = "block";
    suggestionsList
      .filter((item) => item.toLowerCase().includes(value))
      .forEach((item) => {
        let div = document.createElement("div");
        div.innerText = item;
        div.onclick = () => selectSuggestion(item);
        suggestionsBox.appendChild(div);
      });
  } else {
    suggestionsBox.style.display = "none";
  }
});

function selectSuggestion(text) {
  searchInput.value = text;
  suggestionsBox.style.display = "none";
  saveHistory(text);
}

function saveHistory(text) {
  if (!history.includes(text)) {
    history.unshift(text);
    localStorage.setItem("history", JSON.stringify(history));
    showHistory();
  }
}

function showHistory() {
  historyBox.innerHTML = "";
  historyBox.style.display = "block";
  history.forEach((item, index) => {
    let div = document.createElement("div");
    div.className = "history-item";
    div.innerHTML = `${item} <span onclick="deleteHistory(${index})">✖</span>`;
    historyBox.appendChild(div);
  });
}

function deleteHistory(index) {
  history.splice(index, 1);
  localStorage.setItem("history", JSON.stringify(history));
  showHistory();
}

function openPopup(title) {
  document.getElementById("popupTitle").innerText = title;
  document.getElementById("popup").style.display = "flex";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

searchInput.addEventListener("focus", showHistory);

/* Scroll animation */
const faders = document.querySelectorAll(".fade-in");
window.addEventListener("scroll", () => {
  faders.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add("show");
    }
  });
});
