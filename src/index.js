function refreshWeather(respond) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = respond.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(respond.data.time * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src="${respond.data.condition.icon_url}" class="weather-app-icon"/>`;
  cityElement.innerHTML = respond.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = respond.data.condition.description;
  humidityElement.innerHTML = `${respond.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${respond.data.wind.speed}km/h`;
  temperatureElement.innerHTML = Math.round(temperature);
  getForecast(respond.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "9tb7143e5ff804f5od02a6f195ae433e";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}
function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "9tb7143e5ff804f5od02a6f195ae433e";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(respond) {
  console.log(respond.data);
  let forecastElement = document.querySelector("#forecast");

  let forecastHtml = "";

  respond.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        ` 
    <div class="weather-forecast-day">
      <div class="weather-forecast-date">${formatDay(day.time)}</div>
      
        <img src="${day.condition.icon_url}" class="weather-forecast-icon"/>
      
      <div class="weather-forecast-temperatures">
        <span class="weather-forecast-temperatures">
           <strong>${Math.round(day.temperature.maximum)}°</strong>
        </span>
        <span class="weather-forecast-temperatures">${Math.round(
          day.temperature.minimum
        )}°</span>
      </div>
     </div>  
     `;
    }
  });
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
searchCity("Cologne");
