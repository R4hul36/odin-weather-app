import { renderWeatherData } from './modules/domController'
import { fetchWeatherData } from './modules/fetchWeatherData'
import { loadingComponent } from './modules/loading'
import './styles.css'

console.log('hello world')

const form = document.querySelector('.form')
const input = document.querySelector('.search-field')
const weatherContainer = document.querySelector(".weather-card")

input.addEventListener('input', () => {
  input.setCustomValidity('')
})

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  loadingComponent(weatherContainer)
  if (input.value.trim().length < 3) {
    input.setCustomValidity('Please Enter 3 characters or more')
    input.reportValidity()
    return
  }
  const weatherInfo = await fetchWeatherData(input.value)
 
  renderWeatherData(weatherInfo, weatherContainer)
  
 
  console.log(weatherInfo);
  
})



