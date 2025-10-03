import { format } from 'date-fns'

export const renderWeatherData = function (
  { address, currentConditions: { temp, conditions }, description, timezone },
  weatherContainer
) {
  weatherContainer.innerHTML = ''

  const topSection = document.createElement('div')
  topSection.classList.add('top-section')
  const locationName = document.createElement('h2')
  locationName.textContent = address[0].toUpperCase() + address.slice(1)
  const currentTime = document.createElement('span')
  const formattedTime = format(new Date(), 'p', { timezone })
  currentTime.textContent = formattedTime
  topSection.appendChild(locationName)
  topSection.appendChild(currentTime)

  const middleSecction = document.createElement('div')
  middleSecction.classList.add('middle-section')
  const currWeatherIcon = document.createElement('p')
  const currTemperature = document.createElement('h1')
  currTemperature.textContent = `${temp}\u00B0C`
  const condition = document.createElement('p')
  condition.textContent = conditions
  middleSecction.appendChild(currTemperature)
  middleSecction.appendChild(condition)

  const weatherDescription = document.createElement('div')
  weatherDescription.classList.add('weather-description')
  weatherDescription.textContent = description

  // const tempVal = document.createElement("p")
  // tempVal.textContent = temp;
  weatherContainer.appendChild(topSection)
  weatherContainer.appendChild(middleSecction)
  weatherContainer.appendChild(weatherDescription)
}
