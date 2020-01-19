const request = require('request');


const geocode = (location, cb) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?limit=1&access_token=pk.eyJ1Ijoic2FiaXJhIiwiYSI6ImNrNHJwdG9lODJvbTAzZG9nbGRlaXp5MzEifQ.m3qh1CPlpbe9b4pxrEmMmQ`;

  request({url, json:true}, (error, response) => {
    if(error) cb(error);
    else if(response.body.features.length===0) cb('Could not find location. Please try again');
    else {
      const latitude = response.body.features[0].center[0];
      const longitude = response.body.features[0].center[1];
      cb(undefined, { latitude, longitude, location: response.body.features[0].place_name});
    }
  })
}
module.exports = geocode;
