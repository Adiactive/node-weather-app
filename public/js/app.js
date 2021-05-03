const weatherForm = document.querySelector('form')
const seatchInput = document.querySelector('input')
const location = document.getElementById('location')
const weatherDescription = document.getElementById('weather-description')
const weatherIcon = document.getElementById('weather-icon')

location.textContent = ""
weatherDescription.textContent = ""

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    axios.get(`/weather`, {
        params: {
            search: seatchInput.value,
        },
    }).then(({data}) => {
        if (data.error){
            location.textContent = data.error
            weatherDescription.textContent = ""
        }
        else{
            location.textContent = data.location
            weatherIcon.src = data.weather.icon
            weatherDescription.textContent = data.weather.description
        }
    })
})


console.log('Clinet side js file is loaded')

