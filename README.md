# weather-report-
https://sangamitraparamesh.github.io/weatherforecast/

# 7-Day Weather Forecast App

## Overview

The **7-Day Weather Forecast App** is a simple web application that allows users to view a 7-day weather forecast for any city worldwide. Users can enter a city name, and the app fetches and displays the forecast including maximum and minimum temperatures and weather conditions using the Open-Meteo API.

This app is fully **front-end**, responsive, and easy to use.

---

## Features

* Enter a city name to get a 7-day weather forecast.
* Displays:

  * Maximum and minimum temperatures for each day.
  * Weather code for each day.
* Shows the city name and country at the top of the forecast.
* Clean, modern, and responsive user interface.

---

## Technologies Used

* **HTML5** – Structure of the application.
* **CSS3** – Styling, including responsive design and interactive elements.
* **JavaScript (ES6+)** – Fetching data from APIs and dynamically rendering content.
* **Open-Meteo API** – Provides 7-day weather forecasts.
* **Open-Meteo Geocoding API** – Fetches city coordinates based on user input.

---

## How to Use

1. Open `index.html` in a web browser.
2. Enter a **city name** in the input box.
3. Click **"Get Forecast"**.
4. The forecast for the next 7 days will appear below with temperature and weather code.

---

## Project Structure

```
weather-forecast-app/
│
├── index.html         # Main HTML file containing the app layout
├── style.css         # (Optional) External CSS file if separated
|__ script.js
└── README.md          # Project documentation
```


---

## API References

* **Geocoding API:** `https://geocoding-api.open-meteo.com/v1/search`
* **Weather Forecast API:** `https://api.open-meteo.com/v1/forecast`

---

## Notes

* Ensure you have a stable internet connection, as the app fetches live data from Open-Meteo APIs.
* Weather codes are numeric representations of weather conditions. You can map them to descriptions using Open-Meteo's weather codes documentation.

---

## Author

**Sangamitra Paramesh**
Email: `sangamitraparamesh@gmail.com`
GitHub: [github.com/sangamitraparamesh](https://github.com/sangamitraparamesh)

---

