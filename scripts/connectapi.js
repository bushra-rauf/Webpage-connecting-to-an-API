// Add the event listener 
document.addEventListener("DOMContentLoaded", () => {
    const fetchButton = document.querySelector("button");
    fetchButton.addEventListener("click", fetchData); // Attach event listener to button
});

// Check if data is in localStorage
        const cachedData = localStorage.getItem("city");
           if (cachedData) {
             console.log("Using cached data");
             displayData(JSON.parse(cachedData));
            } else {
             console.log("Fetching new data");
            }

function  fetchData(){
    console.log("hellooo");

    const city = document.getElementById("city").value;
        console.log(city);

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

function displayData(data){
document.getElementById("city-name").textContent = data.location.name;
document.getElementById("country").textContent = data.location.country;
document.getElementById("temperature").textContent = data.current.temp_c;
document.getElementById("condition").textContent = data.current.condition.text;
document.getElementById("weather-icon").src = "https:" + data.current.condition.icon;
document.getElementById("humidity").textContent = data.current.humidity;
document.getElementById("wind-speed").textContent = data.current.wind_kph;
document.getElementById("feels-like").textContent = data.current.feelslike_c;
} 