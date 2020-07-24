const request = require("request");

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=c51aabdcd70bb39326857c6a4bac048e&query=${lat},${long}&units=f`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      console.log("Unable to connect to connection services.");
    } else if (response.body.error) {
      console.log("Unable to connect to find location.");
    } else {
      callback(
        undefined,
        `It is ${response.body.current.weather_descriptions[0]} in ${response.body.location.name}. It is currently ${response.body.current.temperature} degrees out, but it feels like ${response.body.current.feelslike} degrees out.`
      );
    }
  });
};

module.exports = forecast;
