function refreshWeather(respond) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = respond.data.temperature.current;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = respond.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
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
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Cologne");
