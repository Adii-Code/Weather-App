const form = document.querySelector(".form");
const search = document.querySelector("#search");
const key = `f096662efbdf0b345a31cdcec630ce57`;


const clearDetails = () => {
      const icon = document.querySelector(".img");
      const weather = document.querySelector(".weather");
      const city = document.querySelector(".city");
      const humidity = document.querySelector(".humidity");
      const windSpeed = document.querySelector(".windSpeed");

      icon.innerHTML = "";
      weather.innerText = "";
      city.innerText = "";
      humidity.innerHTML = "";
      windSpeed.innerHTML = "";
};


async function checkWeather(location) {
      try {
            clearDetails(); // Clear details before fetching new data

            const icon = document.querySelector(".img");
            icon.innerHTML = `<h2>Loading...</h2>`;

            const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}&units=metric`;
            const response = await fetch(url);

            if (!response.ok) {
                  throw new Error(`Error: City Not Found`);
            }

            const data = await response.json();

            updateWeather(data);
      } catch (error) {
            console.error("Error fetching weather:", error);
            handleApiError(error.message);
      }
}


function handleApiError(message) {
      const icon = document.querySelector(".img");
      if (message.includes("City Not Found")) {
            icon.innerHTML = `<h2 class="error">Please enter a valid city</h2>`;
      } else {
            icon.innerHTML = `<h2 class="error">Error: ${message}</h2>`;
      }
}


function updateWeather(data) {
      const icon = document.querySelector(".img");
      const weather = document.querySelector(".weather");
      const city = document.querySelector(".city");
      const humidity = document.querySelector(".humidity");
      const windSpeed = document.querySelector(".windSpeed");


      const temperature = data.main.temp;
      const weatherDescription = data.weather[0].main;
      const cityName = data.name;
      const countryCode = data.sys.country;
      const windSpeedValue = data.wind.speed;
      const humidityValue = data.main.humidity;


      icon.innerHTML = `<div class="img">
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="" class="iconpng">
      <h2 class="temp">${temperature}°C</h2>
    </div>`;
      weather.innerText = weatherDescription;
      city.innerText = `${cityName}, ${countryCode}`;

      humidity.innerHTML = `<div class="humidity flex">
      <img src="humidity.png" alt="" class="icon-size">Humidity<br>${humidityValue}%
    </div>`;

      windSpeed.innerHTML = `<div class="windSpeed icon-size flex">
      <img src="storm.png" alt="" class="icon-size windIcon">Wind<br>${windSpeedValue}km/h
    </div>`;

}


form.addEventListener("submit", (event) => {
      checkWeather(search.value);
      event.preventDefault();
});