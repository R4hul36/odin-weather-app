import { format, toZonedTime } from 'date-fns-tz'

export const renderWeatherData = async function (
  {
    address,
    currentConditions: { temp, conditions, feelslike, icon },
    description,
    timezone,
  },
  weatherContainer
) {
  weatherContainer.innerHTML = ''

  const topSection = document.createElement('div')
  topSection.classList.add('top-section')
  const locationName = document.createElement('h2')
  locationName.textContent = address[0].toUpperCase() + address.slice(1)
  const currentTime = document.createElement('span')
  const zonedDate = toZonedTime(new Date(), timezone)
  const formattedTime = format(zonedDate, 'p', { timezone })
  currentTime.textContent = formattedTime
  topSection.appendChild(locationName)
  topSection.appendChild(currentTime)

  const middleSection = document.createElement('div')
  middleSection.classList.add('middle-section')
  const currWeatherIcon = document.createElement('div')
  currWeatherIcon.classList.add('weather-icon')
  const iconModule = await import(`../icons/${icon}.js`)
  currWeatherIcon.innerHTML = iconModule.default

  const currTemperature = document.createElement('p')
  currTemperature.classList.add('curr-temp')
  currTemperature.textContent = `${temp}\u00B0C`
  const midSubSection = document.createElement('div')
  midSubSection.classList.add('mid-sub-section')
  const condition = document.createElement('p')
  condition.textContent = conditions
  const feelsTemp = document.createElement('span')
  feelsTemp.textContent = `Feels like ${feelslike}\u00B0C`
  midSubSection.appendChild(condition)
  midSubSection.appendChild(feelsTemp)
  middleSection.appendChild(currWeatherIcon)
  middleSection.appendChild(currTemperature)
  middleSection.appendChild(midSubSection)

  const weatherDescription = document.createElement('div')
  weatherDescription.classList.add('weather-description')
  weatherDescription.textContent = description

  // const tempVal = document.createElement("p")
  // tempVal.textContent = temp;
  weatherContainer.appendChild(topSection)
  weatherContainer.appendChild(middleSection)
  weatherContainer.appendChild(weatherDescription)
}
