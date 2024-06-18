// Define a function to update the datetime and date elements
function updateDateTime(localtime) {
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

  // Format for date (without weekday)
  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = localDate.toLocaleDateString(undefined, dateOptions);
  document.querySelector(".date").innerText = formattedDate;
}

// Define your fetchWeather function
async function fetchWeather(location) {
  const apiKey = "5e418667fd424e40a0f22356241706";
  try {
    const weatherResponse = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=5`
    );
    const weatherData = await weatherResponse.json();

    if (!weatherData.location) {
      alert("Location not found");
      return;
    }

    const { localtime } = weatherData.location;

    // Update the datetime element with the formatted local time
    updateDateTime(localtime);
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
