const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
const weatherDisplay = document.getElementById('weatherDisplay');
const errorDisplay = document.getElementById('errorDisplay');

document.getElementById('searchBtn').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    if (city) {
        fetchWeatherByCity(city);
    } else {
        displayError('Please enter a city name.');
    }
});

document.getElementById('locationBtn').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            fetchWeatherByLocation(position.coords.latitude, position.coords.longitude);
        }, () => {
            displayError('Unable to retrieve your location.');
        });
    } else {
        displayError('Geolocation is not supported by your browser.');
    }
});

function fetchWeatherByCity(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    fetchWeather(url);
}

function fetchWeatherByLocation(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    fetchWeather(url);
}

function fetchWeather(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => displayWeather(data))
        .catch(error => displayError(error.message));
}

function displayWeather(data) {
    errorDisplay.textContent = '';
    weatherDisplay.innerHTML = `
        <p id="cityName">City: ${data.name}, ${data.sys.country}</p>
        <p id="temperature">Temperature: ${data.main.temp}°C</p>
        <p id="conditions">Conditions: ${data.weather[0].description}</p>
        <p id="humidity">Humidity: ${data.main.humidity}%</p>
        <p id="wind">Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

function displayError(message) {
    weatherDisplay.innerHTML = '';
    errorDisplay.textContent = message;
}
