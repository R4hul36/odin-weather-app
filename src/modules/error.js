
export const errorMessage = function (weatherContainer) {
    weatherContainer.innerHTML = ""
    const errorMessage = document.createElement("p")
    errorMessage.classList.add("error-message")
    errorMessage.textContent = "⚠ Please provide a valid location!"
    weatherContainer.appendChild(errorMessage)
}