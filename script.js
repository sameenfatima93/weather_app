const apiKey = "5735911e62e3eb5c6bcc532d631e31e6"; // ← yahan apni OpenWeatherMap API key paste karo
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

const weatherIcon = document.querySelector(".wt-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status === 404) {
        alert("City not found. Please enter a valid city name.");
        return;
    }

    const data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humedity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    // Change icon based on weather condition
    const condition = data.weather[0].main.toLowerCase();

    if (condition === "clouds") {
        weatherIcon.src = "images/clouds.png";
    } else if (condition === "clear") {
        weatherIcon.src = "images/clear.png";
    } else if (condition === "rain") {
        weatherIcon.src = "images/rain.png";
    } else if (condition === "drizzle") {
        weatherIcon.src = "images/drizzle.png";
    } else if (condition === "mist") {
        weatherIcon.src = "images/mist.png";
    } else {
        weatherIcon.src = "images/clouds.png"; // default
    }
}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city !== "") {
        checkWeather(city);
    }
});
