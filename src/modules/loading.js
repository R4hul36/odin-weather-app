
export const loadingComponent = function (weatherContainer) {
    weatherContainer.innerHTML = "";
    weatherContainer.classList.remove('weather-container')
    weatherContainer.classList.add('weather-card-active')
    const loadingContainer = document.createElement("div")
    const loadingMessage = document.createElement("h2")
    loadingMessage.textContent = "Fetching Data..."

    loadingContainer.appendChild(loadingMessage)
    weatherContainer.appendChild(loadingContainer)
}