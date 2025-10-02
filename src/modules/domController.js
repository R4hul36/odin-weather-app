

export const renderWeatherData = function ({currentConditions:{temp}}, weatherContainer) {
  weatherContainer.innerHTML = ""
  
  const tempVal = document.createElement("p")
  tempVal.textContent = temp;
  weatherContainer.appendChild(tempVal)
  
}
