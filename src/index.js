import { renderWeatherData } from "./modules/domController";
import "./styles.css"

console.log("hello world");
const key = "XPVZZCBV5W42UK53V9SLR9CBY"
const baseUrl = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"

 async function fetchWeatherData (location) {
    const response = await fetch(`${baseUrl}${location}?key=${key}&unitGroup=metric`)
    const data = await response.json()
    console.log(data);
    renderWeatherData(data)
    
 }


 console.log(fetchWeatherData("thiruvananthapuram"))