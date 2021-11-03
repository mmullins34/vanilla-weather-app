let now = new Date();

let dateInput = document.querySelector("#date-input");

let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

dateInput.innerHTML = `${day} ${month} ${date} ${hours}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `
          <div class="col-2">
            <div class="forecast-date">${formatDay(forecastDay.dt)}</div>
            <img src="https://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" alt="" width="75" />
            <div class="forcast-temperatures">
              <span class="forecast-temp-max">${Math.round(
                forecastDay.temp.max
              )}º</span> |
              <span class="forecast-temp-min">${Math.round(
                forecastDay.temp.min
              )}º</span>
            </div>
          </div>
          `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "1d038ee28ef2727a9f0310860ac10ae9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemp(response) {
  fTemp = response.data.main.temp;

  let tempElement = document.querySelector("#main-temp");
  tempElement.innerHTML = Math.round(fTemp);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let rainElement = document.querySelector("#rain");
  rainElement.innerHTML = response.data.weather[0].main;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  let hiElement = document.querySelector("#high-temp");
  hiElement.innerHTML = Math.round(response.data.main.temp_max);
  let loElement = document.querySelector("#low-temp");
  loElement.innerHTML = Math.round(response.data.main.temp_min);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "1d038ee28ef2727a9f0310860ac10ae9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  searchCity(cityInput);
}

let fTemp = null;

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", handleSubmit);

function displayCTemp(event) {
  event.preventDefault();
  let cTemp = (fTemp - 32) * (5 / 9);
  fLink.classList.remove("active");
  cLink.classList.add("active");
  let tempElement = document.querySelector("#main-temp");
  tempElement.innerHTML = Math.round(cTemp);
}

let cLink = document.querySelector("#c-link");
cLink.addEventListener("click", displayCTemp);

function displayFTemp(event) {
  event.preventDefault();
  fLink.classList.add("active");
  cLink.classList.remove("active");
  let tempElement = document.querySelector("#main-temp");
  tempElement.innerHTML = Math.round(fTemp);
}

let fLink = document.querySelector("#f-link");
fLink.addEventListener("click", displayFTemp);

searchCity("Atlanta");
