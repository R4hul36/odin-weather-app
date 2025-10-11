import { format, toZonedTime } from 'date-fns-tz'
import { fetchWeatherData } from './fetchWeatherData'
import { getWeatherUnit, setWeatherUnit } from './localStorage'

export const renderWeatherData = async function (
  {
    address,
    currentConditions: {
      temp,
      conditions,
      feelslike,
      icon,
      humidity,
      pressure,
      visibility,
      windspeed,
      dew,
    },
    description,
    timezone,
  },
  weatherContainer,
  tempUnit = 'C'
) {
  weatherContainer.innerHTML = ''
  weatherContainer.classList.remove('weather-container')
  weatherContainer.classList.add('weather-card-active')

  renderTop(weatherContainer, address, timezone, tempUnit)
  await renderMiddle(
    weatherContainer,
    temp,
    conditions,
    feelslike,
    icon,
    tempUnit
  )
  const weatherDescription = document.createElement('div')
  weatherDescription.classList.add('weather-description')
  weatherDescription.textContent = description
  weatherContainer.appendChild(weatherDescription)

  renderBottom(
    weatherContainer,
    humidity,
    pressure,
    visibility,
    windspeed,
    dew,
    tempUnit
  )
}

function renderTop(weatherContainer, address, timezone, tempUnit) {
  let currentUnit = getWeatherUnit()
  if (!currentUnit) {
    currentUnit = tempUnit
  }

  const topSection = document.createElement('div')
  topSection.classList.add('top-section')

  const locationAndTime = document.createElement('div')
  const locationName = document.createElement('h2')
  locationName.textContent = address[0].toUpperCase() + address.slice(1)
  const currentTime = document.createElement('span')
  currentTime.classList.add('time')
  const zonedDate = toZonedTime(new Date(), timezone)
  const formattedTime = format(zonedDate, 'p', { timezone })
  currentTime.textContent = formattedTime
  locationAndTime.appendChild(locationName)
  locationAndTime.appendChild(currentTime)

  const switchContainer = document.createElement('div')
  switchContainer.classList.add('switch-container')
  const celsiusSwitch = document.createElement('button')
  celsiusSwitch.classList.add('celsius-switch')

  const fahrenheitSwitch = document.createElement('button')
  fahrenheitSwitch.classList.add('fahrenheit-switch')

  if (currentUnit === 'C') {
    celsiusSwitch.classList.add('active')
  } else if (currentUnit === 'F') {
    fahrenheitSwitch.classList.add('active')
    celsiusSwitch.classList.remove('active')
  }

  celsiusSwitch.textContent = '\u00B0C'
  fahrenheitSwitch.textContent = '\u00B0F'
  switchContainer.appendChild(celsiusSwitch)
  switchContainer.appendChild(fahrenheitSwitch)

  switchContainer.addEventListener('click', async (e) => {
    if (e.target.classList.contains('celsius-switch')) {
      setWeatherUnit('C')
      e.target.classList.add('active')
      fahrenheitSwitch.classList.remove('active')
      renderWeatherData(
        await fetchWeatherData(address, 'metric'),
        weatherContainer
      )
    } else if (e.target.classList.contains('fahrenheit-switch')) {
      setWeatherUnit('F')
      e.target.classList.add('active')
      celsiusSwitch.classList.remove('active')
      renderWeatherData(
        await fetchWeatherData(address, 'us'),
        weatherContainer,
        'F'
      )
    }
  })

  topSection.appendChild(locationAndTime)

  topSection.appendChild(switchContainer)
  weatherContainer.appendChild(topSection)
}

async function renderMiddle(
  weatherContainer,
  temp,
  conditions,
  feelslike,
  icon,
  tempUnit
) {
  const middleSection = document.createElement('div')
  middleSection.classList.add('middle-section')
  const currWeatherIcon = document.createElement('div')
  currWeatherIcon.classList.add('weather-icon')
  const iconModule = await import(`../icons/${icon}.js`)
  currWeatherIcon.innerHTML = iconModule.default

  const currTemperature = document.createElement('p')
  currTemperature.classList.add('curr-temp')
  currTemperature.textContent = `${temp}\u00B0${tempUnit}`
  const midSubSection = document.createElement('div')
  midSubSection.classList.add('mid-sub-section')
  const condition = document.createElement('p')
  condition.textContent = conditions
  const feelsTemp = document.createElement('span')
  feelsTemp.textContent = `Feels like ${feelslike}\u00B0${tempUnit}`
  midSubSection.appendChild(condition)
  midSubSection.appendChild(feelsTemp)

  middleSection.appendChild(currWeatherIcon)
  middleSection.appendChild(currTemperature)
  middleSection.appendChild(midSubSection)
  weatherContainer.appendChild(middleSection)
}

function renderBottom(
  weatherContainer,
  humidity,
  pressure,
  visibility,
  windspeed,
  dew,
  tempUnit
) {
  const bottomSection = document.createElement('div')
  bottomSection.classList.add('bottom-section')
  const details = [
    {
      name: 'Humidity',
      value: humidity,
      unit: '%',
    },

    {
      name: 'Pressure',
      value: pressure,
      unit: ' mb',
    },

    {
      name: 'Visibility',
      value: visibility,
      unit: `${tempUnit === 'C' ? ' km' : ' miles'}`,
    },

    {
      name: 'Windspeed',
      value: windspeed,
      unit: `${tempUnit === 'C' ? ' km/hr' : ' mph'}`,
    },

    {
      name: 'Dew',
      value: dew,
      unit: '\u00B0',
    },
  ]

  details.forEach(({ name, value, unit }) => {
    const weatherDetail = document.createElement('div')
    weatherDetail.classList.add('weather-details')
    const detailName = document.createElement('p')
    detailName.textContent = name
    const detailValue = document.createElement('span')
    detailValue.textContent = `${value}${unit}`
    weatherDetail.appendChild(detailName)
    weatherDetail.appendChild(detailValue)
    bottomSection.appendChild(weatherDetail)
  })
  weatherContainer.appendChild(bottomSection)
}
