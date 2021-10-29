function displayTemp(response) {
  fTemp = response.data.main.temp;

  let tempElement = document.querySelector("#main-temp");
  tempElement.innerHTML = Math.round(fTemp);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let feelElement = document.querySelector("#feels-like");
  feelElement.innerHTML = Math.round(response.data.main.feels_like);
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
}

let apiKey = "b5091d2318b2eb092f8861c48c11d8b3";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Atlanta&appid=${apiKey}&units=imperial`;

axios.get(apiUrl).then(displayTemp);

let now = new Date();

let dateInput = document.querySelector("#date-input");

let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  hours = `0${minutes}`;
}
let year = now.getFullYear();

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

dateInput.innerHTML = `${day} ${month} ${date}, ${hours}:${minutes}, ${year}`;

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
