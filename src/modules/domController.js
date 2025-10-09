import { format, toZonedTime } from 'date-fns-tz'

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
  weatherContainer
) {
  weatherContainer.innerHTML = ''
  weatherContainer.classList.remove('weather-container')
  weatherContainer.classList.add('weather-card-active')

  const topSection = document.createElement('div')
  topSection.classList.add('top-section')

  const locationAndTime = document.createElement("div")
  const locationName = document.createElement('h2')
  locationName.textContent = address[0].toUpperCase() + address.slice(1)
  const currentTime = document.createElement('span')
  const zonedDate = toZonedTime(new Date(), timezone)
  const formattedTime = format(zonedDate, 'p', { timezone })
  currentTime.textContent = formattedTime
  locationAndTime.appendChild(locationName)
  locationAndTime.appendChild(currentTime)

  const switchContainer = document.createElement("div")
  switchContainer.classList.add("switch-container")
  const celsiusSwitch = document.createElement("button")
  const fahrenheitSwitch = document.createElement("button")
  celsiusSwitch.textContent = "\u00B0C"
  fahrenheitSwitch.textContent = "\u00B0F"
  switchContainer.appendChild(celsiusSwitch)
  switchContainer.appendChild(fahrenheitSwitch)


  
  topSection.appendChild(locationAndTime)
 
  topSection.appendChild(switchContainer)

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

  const bottomSection = document.createElement('div')
  bottomSection.classList.add('bottom-section')

  const details = { humidity, pressure, visibility, windspeed, dew }

  const detail = [
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
      unit: ' km',
    },

    {
      name: 'Windspeed',
      value: windspeed,
      unit: ' km/hr',
    },

    {
      name: 'Dew',
      value: dew,
      unit: '\u00B0',
    },
  ]

  detail.forEach((item) => {
    console.log(item)

    const { name, unit, value } = item
    console.log(name, unit, value)
  })

  detail.forEach(({ name, value, unit }) => {
    const weatherDetail = document.createElement('div')
    weatherDetail.classList.add('weather-details')
    const detailName = document.createElement('p')
    detailName.textContent = name
    const detailValue = document.createElement('p')
    detailValue.textContent = `${value}${unit}`
    weatherDetail.appendChild(detailName)
    weatherDetail.appendChild(detailValue)
    bottomSection.appendChild(weatherDetail)
  })

  // const tempVal = document.createElement("p")
  // tempVal.textContent = temp;
  weatherContainer.appendChild(topSection)
  weatherContainer.appendChild(middleSection)
  weatherContainer.appendChild(weatherDescription)
  weatherContainer.appendChild(bottomSection)
}
