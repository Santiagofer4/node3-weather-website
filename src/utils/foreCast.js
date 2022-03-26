const request = require("postman-request");

const foreCast = (latitude,longitude, callback) => {
  const URL = `http://api.weatherstack.com/current?access_key=f55ad8c51182d3603fd352fbc3003e69&query=${latitude},${longitude}`;

  request({ url: URL, json: true }, (error, {body}) => {
    if (error) {
      callback({error: "Unable to connect to the API"}, undefined);
    } else if (body.error) {
      callback({error: "Unable to find location!"}, undefined);
    } else {
      callback(undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out.`
      );
    }
  });
};

module.exports = foreCast;
