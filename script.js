document.getElementById("getForecastBtn").addEventListener("click", loadWeather);

async function loadWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const forecastEl = document.getElementById("forecast");

    if (city === "") {
        alert("Please enter a city name!");
        return;
    }

    forecastEl.innerHTML = "Loading...";

    try {
        // Step 1: Get location coordinates
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;
        const geoRes = await fetch(geoUrl);
        const geoData = await geoRes.json();

        if (!geoData.results || geoData.results.length === 0) {
            forecastEl.innerHTML = "City not found!";
            return;
        }

        const { latitude, longitude, name, country } = geoData.results[0];

        // Step 2: Fetch forecast using coordinates
        const forecastUrl =
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
            `&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto&forecast_days=7`;

        const weatherRes = await fetch(forecastUrl);
        const weatherData = await weatherRes.json();

        const days = weatherData.daily.time;
        const maxTemp = weatherData.daily.temperature_2m_max;
        const minTemp = weatherData.daily.temperature_2m_min;
        const codes = weatherData.daily.weathercode;

        forecastEl.innerHTML = `<h3>${name}, ${country}</h3>`;

        days.forEach((day, i) => {
            const card = document.createElement("div");
            card.className = "day-card";
            card.innerHTML = `
                <h4>${day}</h4>
                <div class="temp">🌡 Max: ${maxTemp[i]}°C | Min: ${minTemp[i]}°C</div>
                <div class="weather-code">Weather Code: ${codes[i]}</div>
            `;
            forecastEl.appendChild(card);
        });
    } catch (error) {
        forecastEl.innerHTML = "Error fetching weather data!";
        console.error(error);
    }
}
