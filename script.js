// Select the DOM elements
const input = document.querySelector('input');
const button = document.querySelector('button');
const result = document.querySelector('#weather-result');

// Your OpenWeatherMap API key
const API_KEY = "e68ef54f711445738c5fbccad8bbf9d2";

// Listen for clicks on the button
button.addEventListener('click', getWeather);

// Trigger on Enter key
input.addEventListener('keyup', function(event) {
    if (event.key === "Enter") {
        getWeather();
    }
});

// Make getWeather async and put fetch logic here directly
async function getWeather() {
    const city = input.value.trim().toLowerCase();

    if (!city) {
        result.innerHTML = "<p>Please enter a city name!</p>";
        return;
    }

    result.innerHTML = "<p>Loading...</p>";

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        if (!response.ok) throw new Error("City not found");
        const data = await response.json();
        showWeather(data);
        input.value = "";  // Clear the input after successfully fetching weather
    } catch (error) {
        result.innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
}

// Function to display the weather info
function showWeather(data) {
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    result.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <img src="${iconUrl}" alt="${data.weather[0].description}">
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
    `;
}
