const apiKey = "YOUR_API_KEY";

function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    
    if (city === "") {
        alert("Please enter a city name!");
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
        if(data.cod === 404) {
            document.getElementById("weatherResult").innerHTML = `<p>City not found!</p>`;
            return;
        }

        const weatherHTML = `
            <p><strong>${data.name}, ${data.sys.country}</strong></p>
            <p class="temp">${data.main.temp}°C</p>
            <p>${data.weather[0].main} - ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind: ${data.wind.speed} m/s</p>
        `;
        document.getElementById("weatherResult").innerHTML = weatherHTML;
    })
    .catch(err => {
        document.getElementById("weatherResult").innerHTML = `<p>Error fetching data</p>`;
    });
}
