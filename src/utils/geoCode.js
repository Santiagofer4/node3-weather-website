const request = require("postman-request");

const geoCode = (address, callback) => {
  const URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic2FudGlhZ29mZXJuMSIsImEiOiJjbDEybTR3NXkxbHNuM3FvMHF2ZDVkamVqIn0.i_6y6Cx7c8Np0YqJE9AURQ&limit=1`;

  request({ url: URL, json: true }, (error, {body}) => {
    if (error) {
      callback({error: "Unable to connect to the geo API"}, undefined);
    } else if (body.features.length === 0 || !body.features) {
      callback({error: "Unable to find the location"}, undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;
