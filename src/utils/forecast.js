const request = require('request');

const forecast = (latitude, longitude, callback) => {
    
    const url ='http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon=' + longitude +'&units=metric&appid=21f16267b6d5546706a66535247c6f12'
   
    request({ url:url, json:true },(error, response) => {
        if (error) {
            callback('Unable to connect with API',undefined)
        } else if (response.body.cod==400) {
            callback('Unable to find location')
        } else {
            callback(undefined,response.body.main)
        }

    })
}


// const forecast = ()=> console.log("forecast called");

module.exports = {
    forecast:forecast
}