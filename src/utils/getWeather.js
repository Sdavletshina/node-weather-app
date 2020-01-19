const request = require('request');

const getWeather = ({latitude, longitude, location}, cb) => {
  const url =
    `https://api.darksky.net/forecast/380f586452ff5649fb63d9ff59f7c7ef/${longitude},${latitude}`;

    request({url, json:true}, (error, response) => {
      if(error) cb('Cannnot connect to weather app');
      else if(response.error) cb('Could not find place');
      else {
        cb(undefined, `It is currently ${response.body.currently.temperature} degrees out in ${location}. There is ${response.body.currently.precipProbability}% chance of rain`);
      }
    })
}

module.exports = getWeather;
