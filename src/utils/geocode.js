const request = require('request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibXdtYWgiLCJhIjoiY2s1aXJhMnVwMDN6MTNqbmp6czN2ZTZ5dSJ9.gkDugK7AoA0zJ6PHQDCm1A&limit=1'
    request({url, json:true}, (error, {body}) => {
        if (error) {
            callback('ERROR: Unable to connect to location services', undefined)
        } else if (body.features.length===0) {
            callback('ERROR: Invalid location', undefined)
        } else {
            callback(undefined, {
                location: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            })
        }
    })
}


module.exports = geocode