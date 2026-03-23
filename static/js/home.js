 // MOBILE MENU
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.querySelector(".nav-menu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
}

// HERO CHART
const heroCanvas = document.getElementById("heroChart");

if (heroCanvas) {
  const heroChart = new Chart(heroCanvas, {
    type: "line",
    data: {
      labels: ["Study", "Attendance", "Sleep", "Stress", "Previous"],
      datasets: [
        {
          label: "Impact",
          data: [30, 25, 15, 20, 28],
          borderColor: "#7C3AED",
          backgroundColor: "rgba(124,58,237,0.2)",
          fill: true,
          tension: 0.45,
          pointRadius: 4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      animation: {
        duration: 1800,
        easing: "easeInOutSine"
      }
    },
  });

  setInterval(() => {
    heroChart.data.datasets[0].data = [
      26 + Math.random() * 8,
      22 + Math.random() * 8,
      12 + Math.random() * 6,
      15 + Math.random() * 10,
      24 + Math.random() * 8
    ];
    heroChart.update();
  }, 2200);
}


// ANALYSIS CHART
let analysisChart = null;
const chartDataElement = document.getElementById("chart-data");
const analysisCanvas = document.getElementById("analysisChart");

if (chartDataElement && analysisCanvas) {
  const chartData = JSON.parse(chartDataElement.textContent);

  const hours = chartData.hours || [];
  const scores = chartData.scores || [];

  const limitedHours = hours.slice(-10);
  const limitedScores = scores.slice(-10);

  analysisChart = new Chart(analysisCanvas, {
    type: "line",
    data: {
      labels: limitedHours,
      datasets: [
        {
          label: "Performance Score",
          data: limitedScores,
          borderColor: "#7C3AED",
          backgroundColor: "rgba(124,58,237,0.2)",
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "#FFD60A",
          pointRadius: 5,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          labels: {
            color: "#fff",
          },
        },
      },
      scales: {
        x: {
          ticks: { color: "#fff" },
        },
        y: {
          ticks: { color: "#fff" },
        },
      },
    },
  });
}

// SCROLL REVEAL
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  reveals.forEach((section) => {
    const top = section.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      section.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// COUNTER ANIMATION
const counters = document.querySelectorAll(".counter");

counters.forEach((counter) => {
  const updateCounter = () => {
    const target = +counter.getAttribute("data-target");
    const count = +counter.innerText;
    const increment = Math.max(1, Math.ceil(target / 100));

    if (count < target) {
      counter.innerText = Math.min(count + increment, target);
      setTimeout(updateCounter, 20);
    } else {
      counter.innerText = target;
    }
  };

  updateCounter();
});

// OPTIONAL PREDICT FUNCTION
function predictScore() {
  const studyInput = document.getElementById("study");
  const attendanceInput = document.getElementById("attendance");
  const sleepInput = document.getElementById("sleep");
  const stressInput = document.getElementById("stress");
  const resultBox = document.getElementById("result");

  if (!studyInput || !attendanceInput || !sleepInput || !stressInput) return;

  const study = studyInput.value;
  const attendance = attendanceInput.value;
  const sleep = sleepInput.value;
  const stress = stressInput.value;

  fetch("/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      study: study,
      attendance: attendance,
      sleep: sleep,
      stress: stress,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (resultBox) {
        resultBox.innerText = "Estimated Performance Score: " + data.score + "%";
      }

      if (analysisChart) {
        analysisChart.data.datasets[0].data = [
          study * 2,
          attendance * 0.3,
          sleep * 1.5,
          -stress * 2,
          data.score,
        ];
        analysisChart.update();
      }
    })
    .catch((error) => {
      console.error("Prediction error:", error);
    });
}

// HERO PARALLAX
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const hero = document.querySelector(".hero");

  if (hero && window.innerWidth > 768) {
    hero.style.transform = `translateY(${scrollY * 0.08}px)`;
  }
});

// DASHBOARD CHARTS
const trendCanvas = document.getElementById("trendChart");
const factorCanvas = document.getElementById("factorChart");

if (trendCanvas) {
  new Chart(trendCanvas, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May"],
      datasets: [
        {
          label: "Performance Trend",
          data: [60, 65, 70, 78, 85],
          borderColor: "#7C3AED",
          backgroundColor: "rgba(124,58,237,0.2)",
          fill: true,
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
    },
  });
}

if (factorCanvas) {
  new Chart(factorCanvas, {
    type: "doughnut",
    data: {
      labels: ["Study", "Attendance", "Sleep", "Stress"],
      datasets: [
        {
          data: [40, 30, 15, 15],
          backgroundColor: ["#7C3AED", "#FFD60A", "#ffffff", "#555"],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
    },
  });
}

// DASHBOARD SECTION SWITCH
function showSection(sectionId, element) {
  const sections = document.querySelectorAll(".dash-section");
  sections.forEach((sec) => {
    sec.classList.add("hidden");
    sec.style.display = "none";
  });

  const target = document.getElementById(sectionId);
  if (target) {
    target.classList.remove("hidden");
    target.style.display = "block";
  }

  const items = document.querySelectorAll(".sidebar li");
  items.forEach((item) => item.classList.remove("active"));

  if (element) {
    element.classList.add("active");
  }
}