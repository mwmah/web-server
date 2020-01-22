request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/3bebedca8bcd62bf9ecdeb8affef6630/' + latitude + ',' + longitude + '?units=si'
    request({url, json:true}, (error, {body}) => {
        if (error) {
            callback('ERROR: Unable to connect to weather service', undefined)
        }
        else if (body.error) {
            callback('ERROR: ' + body.error, undefined)
        }
        else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + 'C out.  There is a ' + (body.currently.precipProbability*100) + '% chance of rain.  The high is ' + body.daily.data[0].temperatureHigh + 'C and the low is ' + body.daily.data[0].temperatureLow + 'C.')
        }
    })
}

module.exports = forecast