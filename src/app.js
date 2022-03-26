const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geoCode = require("./utils/geoCode.js");
const foreCast = require("./utils/foreCast.js");

const app = express();

// Paths
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// we ask express to use in the server, what is inside
// the public folder

// we set the lib handlebars as part of the app so we can
// pass vars to the html, in a static page, is't needed
// hbs use search for the folder views to find the html
// second set set the folder views as temmplates
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static direct
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Santiago Fernandez",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Santiago Fernandez",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Santiago Fernandez",
  });
});

app.get("/weather", (req, res) => {
  if (req.query.address) {
    geoCode(req.query.address,(error, { latitude, longitude, location } = {}) => {
        if (error) { return res.send(error) }

        foreCast(latitude, longitude, (error, forecastData) => {

          if (error) { return res.send(error) }

          return res.send({
            location,
            forecast: forecastData,
            address: req.query.address,
          });
          
        });
      }
    )
  } else {
    return res.send({ error: "Address must be provided" });
  }
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help",
    name: "Santiago Fernandez",
    error: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Help",
    name: "Santiago Fernandez",
    error: "Page not found",
  });
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
}); 

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
