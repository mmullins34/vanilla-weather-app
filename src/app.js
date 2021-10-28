function displayTemp(response) {
  let tempElement = document.querySelector("#main-temp");
  tempElement.innerHTML = Math.round(response.data.main.temp);
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
}

let apiKey = "b5091d2318b2eb092f8861c48c11d8b3";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Atlanta&appid=${apiKey}&units=imperial`;

axios.get(apiUrl).then(displayTemp);
