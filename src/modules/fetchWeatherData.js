const key = 'XPVZZCBV5W42UK53V9SLR9CBY'
const baseUrl =
  'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'

export async function fetchWeatherData(location) {
  try {
    const response = await fetch(
      `${baseUrl}${location}?key=${key}&unitGroup=metric`
    )
    const data = await response.json()
    console.log(data)
    return data
  } catch (error) {
    console.log('Invalid Location' + error)
  }
}
