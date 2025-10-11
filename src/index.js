import { renderWeatherData } from './modules/domController'
import { fetchWeatherData } from './modules/fetchWeatherData'
import { loadingComponent } from './modules/loading'
import { errorMessage } from './modules/error'
import { getWeatherUnit } from './modules/localStorage'
import './styles.css'

console.log('hello world')

const form = document.querySelector('.form')
const input = document.querySelector('.search-field')
const weatherContainer = document.querySelector('.weather-card')
let currInputValue = ''

let tempUnit = getWeatherUnit()
if (!tempUnit) {
  tempUnit = 'C'
}

input.addEventListener('input', () => {
  input.setCustomValidity('')
})

form.addEventListener('submit', async (e) => {
  let unit
  if (tempUnit === 'C') {
    unit = 'metric'
  } else if (tempUnit === 'F') {
    unit = 'us'
  }

  e.preventDefault()
  if (currInputValue.toLowerCase() === input.value.toLowerCase()) {
    return
  }

  if (input.value.trim().length < 3) {
    input.setCustomValidity('Please Enter 3 characters or more')
    input.reportValidity()
    return
  }
  loadingComponent(weatherContainer)
  const weatherInfo = await fetchWeatherData(input.value, unit)
  console.log(weatherInfo)
  if (!weatherInfo) {
    errorMessage(weatherContainer)
    return
  }

  renderWeatherData(weatherInfo, weatherContainer, tempUnit)
  currInputValue = input.value
  input.value = ''
})
