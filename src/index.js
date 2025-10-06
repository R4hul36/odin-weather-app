import { renderWeatherData } from './modules/domController'
import { fetchWeatherData } from './modules/fetchWeatherData'
import { loadingComponent } from './modules/loading'
import { errorMessage } from './modules/error'
import './styles.css'

console.log('hello world')

const form = document.querySelector('.form')
const input = document.querySelector('.search-field')
const weatherContainer = document.querySelector(".weather-card")
let currInputValue = ""

input.addEventListener('input', () => {
  input.setCustomValidity('')
})

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  if(currInputValue === input.value) {
    return;
  }
  
  if (input.value.trim().length < 3) {
    input.setCustomValidity('Please Enter 3 characters or more')
    input.reportValidity()
    return
  }
  loadingComponent(weatherContainer)
  const weatherInfo = await fetchWeatherData(input.value)
  if(!weatherInfo) {
    errorMessage(weatherContainer)
    return
    
  }
 
  renderWeatherData(weatherInfo, weatherContainer)
  currInputValue = input.value;
  
})



