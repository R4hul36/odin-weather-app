
export const loadingComponent = function (weatherContainer) {
    weatherContainer.innerHTML = "";
    const loadingContainer = document.createElement("div")
    const loadingMessage = document.createElement("h1")
    loadingMessage.textContent = "Loading..."

    loadingContainer.appendChild(loadingMessage)
    weatherContainer.appendChild(loadingContainer)
}