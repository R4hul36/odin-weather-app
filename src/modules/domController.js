

const form = document.querySelector(".form")
const input = document.querySelector(".search-field")

input.addEventListener("input", () => {
  input.setCustomValidity("");
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if(input.value.trim().length<3){
        input.setCustomValidity("Please Enter 3 characters or more")
        input.reportValidity();
    }
    
    console.log("submitted");
    
})

export const renderWeatherData = function () {
    console.log("dataaaa");
    return
}