const request = require('request')
const geocoding = (address,callback)=>{
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/' + address +'.json?access_token=pk.eyJ1Ijoic2F0eWFtb3IyIiwiYSI6ImNrOXFoOGIzaTAzM2QzZnFrbjYyMDdsd24ifQ.aJhlPSb3QM4vvT_3t8sd4A&limit=1'
 
    request({url:url, json:true}, (error,response)=>{
       
    if(error){
       callback(' unable to connect',undefined);
    } else if(response.body.features.length === 0) {
       callback('Unable to find location. Please try again',undefined)
    }
    else {
       callback(undefined,{
          latitude:response.body.features[0].center[1],
          longitude: response.body.features[0].center[0],
          location: response.body.features[0].place_name
       })
    }
 })
 }

 module.exports = {
  geocoding:geocoding   
 }