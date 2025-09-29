import "./styles.css"

console.log("hello world");
const key = "XPVZZCBV5W42UK53V9SLR9CBY"
const baseUrl = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"

 async function fetchWeatherData (location) {
    const response = await fetch(`${baseUrl}${location}?key=${key}`)
    const {address, latitude, longitude} = await response.json()
    console.log(longitude);
    
 }


 console.log(fetchWeatherData("london"))