async function loadWeather() {
    const city = cityInput.value.trim();
    const container = document.getElementById("weatherContainer");

    if (!city) return alert("Please enter a city name!");

    container.innerHTML = "Loading...";

    const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);
    const geoData = await geoRes.json();

    if (!geoData.results) {
        container.innerHTML = "City not found!";
        return;
    }

    const { latitude, longitude } = geoData.results[0];

    const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto&forecast_days=7`
    );
    const data = await res.json();

    container.innerHTML = "";

    const days = data.daily.time;
    const maxT = data.daily.temperature_2m_max;
    const minT = data.daily.temperature_2m_min;
    const codes = data.daily.weathercode;

    days.forEach((day, i) => {
        let card = document.createElement("div");
        card.classList.add("weather-card");

        const code = codes[i];
        let type = "Cloudy";
        let icon = "https://cdn-icons-png.flaticon.com/512/414/414825.png";

        if (code === 0) {
            type = "Sunny";
            icon = "https://cdn-icons-png.flaticon.com/512/869/869869.png";
            card.classList.add("sunny-card");
        } 
        else if ([51,53,55,61,63,65,80,81,82].includes(code)) {
            type = "Rainy";
            icon = "https://cdn-icons-png.flaticon.com/512/1163/1163624.png";
            card.classList.add("rainy-card");
        } 
        else {
            type = "Cloudy";
            card.classList.add("cloudy-card");
        }

        card.innerHTML = `
            <h3>${day}</h3>
            <img src="${icon}" width="60">
            <p class="temp">${maxT[i]}°C</p>
            <p class="minmax">${minT[i]}°C</p>
        `;

        if (type === "Rainy") {
            const rain = document.createElement("div");
            rain.classList.add("rain");
            for (let j = 0; j < 20; j++) {
                let drop = document.createElement("div");
                drop.classList.add("drop");
                drop.style.left = Math.random() * 160 + "px";
                drop.style.animationDelay = Math.random() * 1 + "s";
                rain.appendChild(drop);
            }
            card.appendChild(rain);
        }

        container.appendChild(card);
    });
}

