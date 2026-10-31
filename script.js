// ==========================================
// Weather App - Pure JavaScript (No Python, No JSON)
// Super Clean & Simplified
// ==========================================

// 1. Telangana & Major Cities Lists
const TELANGANA_CITIES = [
  "Maisammaguda", "Hyderabad", "Secunderabad", "Warangal", "Karimnagar",
  "Nizamabad", "Khammam", "Mahbubnagar", "Nalgonda", "Siddipet",
  "Suryapet", "Adilabad", "Kukatpally", "Miyapur", "Gachibowli",
  "Madhapur", "Kompally", "Medchal", "Ramagundam"
];

const INDIA_CITIES = [
  "Mumbai", "Delhi", "Bengaluru", "Chennai", "Kolkata",
  "Pune", "Ahmedabad", "Jaipur", "Visakhapatnam", "Vijayawada",
  "Tirupati", "Goa", "Dubai", "London", "New York"
];

// Common search shortcuts & typos
const ALIASES = {
  miassaguda: "Maisammaguda",
  maisamma: "Maisammaguda",
  mallareddy: "Maisammaguda",
  hyd: "Hyderabad",
  secbad: "Secunderabad",
  vizag: "Visakhapatnam",
  bangalore: "Bengaluru",
  bombay: "Mumbai",
  dilli: "Delhi"
};

// Unified Cities Catalog
const CITIES = [
  ...TELANGANA_CITIES.map((name) => ({ name, sub: `${name}, Telangana`, tag: "TG" })),
  ...INDIA_CITIES.map((name) => ({ name, sub: `${name}, India`, tag: "IN" }))
];

// Weather Conditions
const CONDITIONS = [
  { label: "Clear sky", icon: "sun" },
  { label: "Mainly clear", icon: "sun" },
  { label: "Partly cloudy", icon: "partly-cloudy" },
  { label: "Overcast", icon: "clouds" },
  { label: "Light drizzle", icon: "drizzle" },
  { label: "Slight rain", icon: "rain" },
  { label: "Thunderstorm", icon: "thunder" }
];

// 2. Weather Generator (Deterministic & Realistic)
function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i);
  return Math.abs(h | 0);
}

function getWeatherObject(cityName) {
  const clean = cityName.trim();
  const q = clean.toLowerCase();
  const resolvedName = ALIASES[q] || clean;

  const found = CITIES.find((c) => c.name.toLowerCase() === resolvedName.toLowerCase());
  const hash = hashString(resolvedName);

  const name = found ? found.name : resolvedName.charAt(0).toUpperCase() + resolvedName.slice(1);
  const tag = found ? found.tag : "IN";
  const temp = (name === "London") ? 14 : (name === "New York") ? 16 : 28 + (hash % 6);
  const cond = CONDITIONS[hash % CONDITIONS.length];

  return {
    name,
    tag,
    temp,
    feelsLike: temp + ((hash % 3) - 1),
    weather: cond.label,
    icon: cond.icon,
    humidity: 50 + (hash % 30),
    pressure: 1010 + (hash % 5),
    visibility: (8.5 + ((hash % 15) / 10)).toFixed(1),
    wind: 10 + (hash % 8),
    co: 120 + (hash % 50),
    so2: (3.2 + ((hash % 20) / 10)).toFixed(1),
    o3: 32 + (hash % 12),
    no2: 14 + (hash % 10),
    aqiStatus: "Good",
    sunrise: `06:${(hash % 25).toString().padStart(2, "0")} AM`,
    sunset: `05:${(45 + (hash % 15)).toString().padStart(2, "0")} PM`
  };
}

// 3. Compact Weather Icons (SVG)
function getIconSvg(iconType, isDay = 1) {
  if (iconType === "sun") {
    return isDay
      ? `<svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="#facc15" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line></svg>`
      : `<svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="#f1f5f9" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
  }
  if (iconType === "partly-cloudy") {
    return `<svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="#93c5fd" stroke-width="2"><path d="M12 2v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M20 12h2"></path><path d="M15.5 17a4.5 4.5 0 0 0 .5-8.97A6 6 0 0 0 5 11a4.5 4.5 0 0 0 2.5 8h8z"></path></svg>`;
  }
  if (iconType === "clouds" || iconType === "fog") {
    return `<svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="#cbd5e1" stroke-width="2"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>`;
  }
  if (iconType === "drizzle" || iconType === "rain") {
    return `<svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="#60a5fa" stroke-width="2"><path d="M16 13v6"></path><path d="M8 13v6"></path><path d="M12 15v6"></path><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path></svg>`;
  }
  return `<svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="#f59e0b" stroke-width="2"><path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"></path><polygon points="13 11 9 17 15 17 11 23"></polygon></svg>`;
}

// 4. DOM Helpers
const $ = (id) => document.getElementById(id);
const searchForm = $("search-form");
const searchInput = $("search-input");
const searchSuggestions = $("search-suggestions");
const toast = $("toast-message");

function showToast(msg) {
  if (!toast) return;
  toast.textContent = msg;
  toast.className = "toast-message info";
  toast.classList.remove("hidden");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.add("hidden"), 3000);
}

// 5. Live Clock
function runClock() {
  const update = () => {
    const now = new Date();
    $("current-date").textContent = now.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
    $("current-time").textContent = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", second: "2-digit", hour12: true });
  };
  update();
  setInterval(update, 1000);
}

// 6. Forecasts Rendering
function renderForecasts(data) {
  const fList = $("forecast-list");
  const hList = $("hourly-list");
  fList.innerHTML = "";
  hList.innerHTML = "";

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const today = new Date();
  const hash = hashString(data.name);

  // 5-Day Forecast
  for (let i = 0; i < 5; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dayName = i === 0 ? "Today" : days[d.getDay()];
    const dateText = `${d.getDate()} ${months[d.getMonth()]}`;
    const maxT = data.temp + ((hash + i) % 3) - 1;
    const minT = maxT - 6;
    const cond = CONDITIONS[(hash + i) % CONDITIONS.length];

    fList.innerHTML += `
      <div class="forecast-row">
        <div class="forecast-day-wrap">
          <span class="forecast-day">${dayName}</span>
          <span class="forecast-date">${dateText}</span>
        </div>
        <div class="forecast-icon">${getIconSvg(cond.icon, 1)}</div>
        <span class="forecast-desc">${cond.label}</span>
        <div class="forecast-temps">
          <span class="temp-max">${maxT}°</span>
          <span class="temp-min">${minT}°</span>
        </div>
      </div>`;
  }

  // Hourly Forecast
  [3, 6, 9, 12, 15, 18, 21, 0].forEach((hour, idx) => {
    const period = hour >= 12 ? "PM" : "AM";
    const hDisplay = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    const timeStr = `${hDisplay.toString().padStart(2, "0")}:00 ${period}`;
    const isDay = hour >= 6 && hour < 18 ? 1 : 0;
    const cond = CONDITIONS[(hash + idx) % CONDITIONS.length];
    const hTemp = data.temp + (isDay ? 1 : -3);

    hList.innerHTML += `
      <div class="hourly-item">
        <span class="hourly-time">${timeStr}</span>
        <div class="hourly-icon">${getIconSvg(cond.icon, isDay)}</div>
        <span class="hourly-temp">${hTemp}°C</span>
        <span class="hourly-wind">${data.wind} km/h</span>
      </div>`;
  });
}

// 7. Update UI
function updateUI(city) {
  const d = getWeatherObject(city);

  $("city-name").textContent = d.name;
  $("country-tag").textContent = d.tag;
  $("current-temp").textContent = `${d.temp} °C`;
  $("sky-description").textContent = d.weather;
  $("current-weather-icon").innerHTML = getIconSvg(d.icon, 1);

  $("val-humidity").textContent = `${d.humidity}%`;
  $("val-pressure").textContent = `${d.pressure} hPa`;
  $("val-feels-like").textContent = `${d.feelsLike} °C`;
  $("val-visibility").textContent = `${d.visibility} km`;

  $("val-co").textContent = d.co;
  $("val-so2").textContent = d.so2;
  $("val-o3").textContent = d.o3;
  $("val-no2").textContent = d.no2;

  const aqiBadge = $("aqi-badge");
  aqiBadge.textContent = d.aqiStatus;
  aqiBadge.className = "badge aqi-badge " + (d.aqiStatus === "Good" ? "good" : "moderate");

  $("val-sunrise").textContent = d.sunrise;
  $("val-sunset").textContent = d.sunset;

  renderForecasts(d);
}

// 8. Search & Autocomplete
function renderSuggestions(q = "") {
  searchSuggestions.innerHTML = "";
  const query = q.toLowerCase().trim();

  let matches = [];
  if (!query) {
    matches = CITIES.slice(0, 8);
  } else {
    matches = CITIES.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        Object.keys(ALIASES).some((alias) => alias.includes(query) && ALIASES[alias] === c.name)
    ).slice(0, 8);
  }

  // Header
  const header = document.createElement("div");
  header.className = "suggestion-header";
  header.textContent = query ? `Matches (${matches.length})` : "Popular Cities";
  searchSuggestions.appendChild(header);

  // Suggestions List
  matches.forEach((c) => {
    const item = document.createElement("div");
    item.className = "suggestion-item";
    const d = getWeatherObject(c.name);

    item.innerHTML = `
      <div class="suggestion-left">
        <span class="suggestion-city">${c.name}</span>
        <span class="suggestion-sub">${c.sub}</span>
      </div>
      <div class="suggestion-right">
        <span class="suggestion-temp">${d.temp}°C</span>
        <span class="suggestion-cond">${d.weather}</span>
      </div>`;

    item.addEventListener("click", () => {
      searchInput.value = c.name;
      searchSuggestions.classList.add("hidden");
      updateUI(c.name);
      showToast(`Weather loaded for ${c.name}`);
    });

    searchSuggestions.appendChild(item);
  });

  // Option for typed custom place
  if (query) {
    const custom = document.createElement("div");
    custom.className = "suggestion-item";
    custom.style.background = "rgba(255, 255, 255, 0.05)";
    custom.innerHTML = `
      <div class="suggestion-left">
        <span class="suggestion-city">🔍 Search "${q}"</span>
        <span class="suggestion-sub">Check live weather forecast for ${q}</span>
      </div>`;
    custom.addEventListener("click", () => {
      searchInput.value = q;
      searchSuggestions.classList.add("hidden");
      updateUI(q);
      showToast(`Weather generated for ${q}`);
    });
    searchSuggestions.appendChild(custom);
  }

  searchSuggestions.classList.remove("hidden");
}

// 9. Event Listeners
searchInput.addEventListener("input", (e) => renderSuggestions(e.target.value));
searchInput.addEventListener("focus", (e) => renderSuggestions(e.target.value));

document.addEventListener("click", (e) => {
  if (!searchForm.contains(e.target)) searchSuggestions.classList.add("hidden");
});

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchSuggestions.classList.add("hidden");
  if (searchInput.value.trim()) {
    updateUI(searchInput.value.trim());
    showToast(`Weather loaded for ${searchInput.value.trim()}`);
  }
});

$("geo-btn").addEventListener("click", () => {
  showToast("Location detected: Hyderabad, Telangana");
  updateUI("Hyderabad");
});

// 10. Start App
window.addEventListener("DOMContentLoaded", () => {
  runClock();
  updateUI("Hyderabad");
});
