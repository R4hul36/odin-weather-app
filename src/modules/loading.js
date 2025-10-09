
export const loadingComponent = function (weatherContainer) {
    weatherContainer.innerHTML = "";
    weatherContainer.classList.remove('weather-container')
    weatherContainer.classList.add('weather-card-active')
    const loadingContainer = document.createElement("div")
    const loadingMessage = document.createElement("h1")
    loadingMessage.textContent = "Loading..."

    loadingContainer.appendChild(loadingMessage)
    weatherContainer.appendChild(loadingContainer)
}