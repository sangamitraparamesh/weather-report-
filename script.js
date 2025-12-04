async function loadWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const forecastEl = document.getElementById("forecast");

    if (city === "") {
        alert("Please enter a city name!");
        return;
    }

    forecastEl.innerHTML = "Loading...";

    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;
    const geoRes = await fetch(geoUrl);
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
        forecastEl.innerHTML = "City not found!";
        return;
    }

    const { latitude, longitude, name, country } = geoData.results[0];

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
        const box = document.createElement("div");
        box.className = "day-box";
        box.innerHTML = `
            <strong>${day}</strong><br>
            Max: ${maxTemp[i]}°C | Min: ${minTemp[i]}°C<br>
            Weather Code: ${codes[i]}
        `;
        forecastEl.appendChild(box);
    });
}

