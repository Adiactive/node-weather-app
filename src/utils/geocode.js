const axios = require('axios')

function geocode(address) {
    url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json`
    const params = {
        access_token: 'pk.eyJ1IjoicjI2Z3UiLCJhIjoiY2tudHJsemJtMDRuaTJ3cmtmZGpxYXVyOSJ9.Mir3EAAVByzd5gbn-0rlLg'
    }

    return new Promise(async function (resolve, reject) {
        try {
            response = await axios.get(url, { params })
            const data = response.data
            if (data.features.length == 0) {
                reject('Unable to find the location!')
            }
            resolve({
                latitude: data.features[0].center[1],
                longtitude: data.features[0].center[0],
                location: data.features[0].place_name
            })
        } catch (error) {
            reject('Unable to connect to location service!')
        }
        // axios.get(url, { params })
        //     .then(response => {
        //         const data = response.data
        //         if (data.features.length == 0) {
        //             reject('Unable to find the location!')
        //         }
        //         resolve({
        //             latitude: data.features[0].center[0],
        //             longtitude: data.features[0].center[1],
        //             location: data.features[0].place_name
        //         })
        //     })
        //     .catch(error => {
        //         reject('Unable to connect to location service!')
        //     })
    })
}

module.exports = geocode