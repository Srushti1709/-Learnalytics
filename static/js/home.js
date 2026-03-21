// HERO CHART
const heroCtx = document.getElementById("heroChart");

new Chart(heroCtx, {
  type: "line",
  data: {
    labels: ["Study", "Attendance", "Sleep", "Stress", "Previous"],
    datasets: [
      {
        label: "Impact",
        data: [30, 25, 15, -20, 28],
        borderColor: "#7C3AED",
        backgroundColor: "rgba(124,58,237,0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  },
  options: {
    responsive: true,
  },
});

// BAR CHART

// ✅ GET DATA FROM HTML (NO ERROR)
const chartData = JSON.parse(document.getElementById("chart-data").textContent);

const hours = chartData.hours;
const scores = chartData.scores;

// 🔥 LIMIT DATA (last 10 records only)
const limitedHours = hours.slice(-10);
const limitedScores = scores.slice(-10);

// BAR CHART

const analysisCtx = document.getElementById("analysisChart");

const analysisChart = new Chart(analysisCtx, {
  type: "line", // 🔥 line chart looks better
  data: {
    labels: limitedHours,
    datasets: [
      {
        label: "Performance Score",
        data: limitedScores,
        borderColor: "#7C3AED",
        backgroundColor: "rgba(124,58,237,0.2)",
        fill: true,
        tension: 0.4, // smooth curve 🔥
        pointBackgroundColor: "#FFD60A",
        pointRadius: 5,
      },
    ],
  },
  options: {
    responsive: true,
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

// SCROLL REVEAL
const reveals = document.querySelectorAll(".section");

window.addEventListener("scroll", () => {
  reveals.forEach((section) => {
    const top = section.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      section.classList.add("active");
    }
  });
});

// COUNTER ANIMATION
const counters = document.querySelectorAll(".counter");

counters.forEach((counter) => {
  const updateCounter = () => {
    const target = +counter.getAttribute("data-target");
    const count = +counter.innerText;
    const increment = target / 100;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(updateCounter, 20);
    } else {
      counter.innerText = target;
    }
  };

  updateCounter();
});

function predictScore() {

    const study = document.getElementById('study').value;
    const attendance = document.getElementById('attendance').value;
    const sleep = document.getElementById('sleep').value;
    const stress = document.getElementById('stress').value;

    fetch("/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            study: study,
            attendance: attendance,
            sleep: sleep,
            stress: stress
        })
    })
    .then(response => response.json())
    .then(data => {

        document.getElementById('result').innerText =
            "Estimated Performance Score: " + data.score + "%";

        analysisChart.data.datasets[0].data = [
            study * 2,
            attendance * 0.3,
            sleep * 1.5,
            -stress * 2,
            data.score
        ];

        analysisChart.update();
    });
}

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const hero = document.querySelector(".hero");

  hero.style.transform = `translateY(${scrollY * 0.2}px)`;
});

// DASHBOARD CHARTS

if (document.getElementById("trendChart")) {
  const trendCtx = document.getElementById("trendChart");

  new Chart(trendCtx, {
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
  });

  const factorCtx = document.getElementById("factorChart");

  new Chart(factorCtx, {
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
  });
}

function showSection(sectionId) {
  const sections = document.querySelectorAll(".dash-section");
  sections.forEach((sec) => sec.classList.add("hidden"));

  document.getElementById(sectionId).classList.remove("hidden");

  const items = document.querySelectorAll(".sidebar li");
  items.forEach((item) => item.classList.remove("active"));

  event.target.classList.add("active");
}
