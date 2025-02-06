// Add the event listener 
document.addEventListener("DOMContentLoaded", () => {
    const fetchButton = document.querySelector("button");
    fetchButton.addEventListener("click", fetchData); // Attach event listener to button
});

function  fetchData(){
    console.log("hellooo");

    const city = document.getElementById("city").value;
        console.log(city);

// Check if data is in localStorage
        const cachedData = localStorage.getItem("city");
           if (cachedData) {
             console.log("Using cached data");
             displayData(JSON.parse(cachedData));
            } else {
             console.log("Fetching new data");
            
    const apiUrl = "https://api.weatherapi.com/v1/current.json?key=665a5354a85e4b75b40160832252601&q=" + city;

    fetch(apiUrl)
    .then(response =>   {
        if (!response.ok) {
            throw new Error("response was not ok");
        }
        return response.json();
    })
    .then( data =>{

        console.log(data);
        displayData(data);

        // Cache the data in localStorage
        localStorage.setItem("city", JSON.stringify(data));
    })

   .catch( error =>{
    console.error("There was a problem with the fetch operation:", error);
    alert("Error fetching data. Please try again later.");

    })
}


// function displayData(data){
// document.getElementById("city-name").textContent = data.location.name;
// document.getElementById("country").textContent = data.location.country;
// document.getElementById("temperature").textContent = data.current.temp_c;
// document.getElementById("condition").textContent = data.current.condition.text;
// document.getElementById("weather-icon").src = "https:" + data.current.condition.icon;
// document.getElementById("humidity").textContent = data.current.humidity;
// document.getElementById("wind-speed").textContent = data.current.wind_kph;
// document.getElementById("feels-like").textContent = data.current.feelslike_c;
// } }


function displayData(data) {
    const cityName = document.getElementById("city-name");
    const country = document.getElementById("country");
    const temperature = document.getElementById("temperature");
    const condition = document.getElementById("condition");
    const localTime = document.getElementById("local-time");
    const weatherIcon = document.getElementById("weather-icon");
    const humidity = document.getElementById("humidity");
    const windSpeed = document.getElementById("wind-speed");
    const feelsLike = document.getElementById("feels-like");
    

    if (cityName) cityName.textContent = data.location.name;
    if (country) country.textContent = data.location.country;
    if (temperature) temperature.textContent = data.current.temp_c;
    if (condition) condition.textContent = data.current.condition.text;
    if (localTime) localTime.textContent = data.location.localtime;
    if (humidity) humidity.textContent = data.current.humidity;
    if (windSpeed) windSpeed.textContent = data.current.wind_kph;
    if (feelsLike) feelsLike.textContent = data.current.feelslike_c;

    if (weatherIcon) {
        const iconUrl = "https:" + data.current.condition.icon;
        if (iconUrl) {
            weatherIcon.src = iconUrl;
        } else {
            console.error("Invalid URL for the weather icon");
            weatherIcon.src = ""; // Optionally, set a placeholder image or leave it empty
        }
    } else {
        console.error("Element with ID 'weather-icon' not found");
    }
}
}



