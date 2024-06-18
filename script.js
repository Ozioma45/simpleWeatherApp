// Define a function to update the datetime, date, city name, and weather icon
function updateWeatherInfo(
  localtime,
  city,
  country,
  iconUrl,
  temp,
  description,
  precipitation,
  humidity,
  wind
) {
  const localDate = new Date(localtime);

  // Format for datetime (including weekday)
  const datetimeOptions = {
    weekday: "long",
  };
  const formattedLocalTime = localDate.toLocaleDateString(
    undefined,
    datetimeOptions
  );
  document.querySelector(".datetime").innerText = formattedLocalTime;

  // Update city name with country
  document.querySelector(".cityName").innerText = `${city}, ${country}`;

  // Format for date (without weekday)
  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = localDate.toLocaleDateString(undefined, dateOptions);
  document.querySelector(".date").innerText = formattedDate;

  // Update weather icon
  const iconElement = document.getElementById("icon");
  iconElement.src = iconUrl;
  iconElement.alt = "Weather icon";

  // Update temperature
  document.querySelector(".temperature").innerText = `${temp}°C`;

  // Update description
  document.querySelector(".description").innerText = `${description}`;

  // Update precipitation
  document.querySelector(
    ".precipitation"
  ).innerText = `Precipitation: ${precipitation} mm`;

  // Update humidity
  document.querySelector(".humidity").innerText = `Humidity: ${humidity}%`;

  // Update wind
  document.querySelector(".wind").innerText = `Wind: ${wind} kph`;
}

// Define your fetchWeather function
async function fetchWeather(location) {
  const apiKey = "5e418667fd424e40a0f22356241706";
  try {
    const weatherResponse = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=5`
    );
    const weatherData = await weatherResponse.json();

    console.log(weatherData);

    if (!weatherData.location) {
      alert("Location not found");
      return;
    }

    const {
      location: { localtime, name: city, country },
      current: {
        condition: { icon, text: description },
        temp_c: temp,
        precip_mm: precipitation,
        humidity,
        wind_kph: wind,
      },
    } = weatherData;

    // Construct the icon URL based on the received icon code
    const iconUrl = `https:${icon}`;

    // Update the weather information on the page
    updateWeatherInfo(
      localtime,
      city,
      country,
      iconUrl,
      temp,
      description,
      precipitation,
      humidity,
      wind
    );
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("Failed to fetch weather data. Please try again later.");
  }
}

// Initial fetch to display default weather data for London
fetchWeather("London");

// Event listener for the form submission (assuming you want to add this functionality)
document.getElementById("subBtn").addEventListener("click", function () {
  const location = document.getElementById("title").value;
  fetchWeather(location);
});
