const axios = require('axios')

function forcast(latitude, longtitude) {
    const url = 'http://api.weatherstack.com/current'
    const params = {
        access_key: 'e52ed6131fff0968672e4feed70b2dfc',
        query: `${latitude},${longtitude}`,
    }
    return new Promise(async function (resolve, reject) {
        try {
            response = await axios.get(url, {params})
            const data = response.data
            if (data.error) {
                reject(`${data.error.type}: ${data.error.info}`)
            }
            resolve(`${data.current.weather_descriptions}. It is currently ${data.current.temperature} degrees out. It feels like ${data.current.feelslike} degrees out.`)
        } catch (error) {
            reject('Unable to connect to weather service!')
        }
    })
}

module.exports = forcast