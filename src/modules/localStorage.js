
export const setWeatherUnit = function (unit) {
    localStorage.setItem("weatherUnit", unit)
}

export const getWeatherUnit = function () {
    const weatherUnit = localStorage.getItem("weatherUnit")
    return weatherUnit
}