import { renderWeatherData } from './modules/domController'
import { fetchWeatherData } from './modules/fetchWeatherData'
import './styles.css'

console.log('hello world')

const form = document.querySelector('.form')
const input = document.querySelector('.search-field')

input.addEventListener('input', () => {
  input.setCustomValidity('')
})

form.addEventListener('submit', (e) => {
  e.preventDefault()
  if (input.value.trim().length < 3) {
    input.setCustomValidity('Please Enter 3 characters or more')
    input.reportValidity()
    return
  }

  console.log('submitted')
})

renderWeatherData(form, input)
console.log(fetchWeatherData('Toronto'))
