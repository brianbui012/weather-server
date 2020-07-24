const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
// So it seems like public is the folder we put things that will be served up to the public
// Things like HTML / CSS / Images / some JS but no backend stuff

const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();

//Point express to a directory to serve up
console.log(__dirname);
app.use(express.static(path.join(__dirname, "../public")));
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//=========================================================================

// app.use express static by default servest the public folder and makes index.html default home page

//View Engine ---- EJS / HBS
//This sets up node to look into a directory called views, a view engine is a type of template reader, and we will create templates for them to load dynamic pages.
app.set("view engine", "hbs");

//re-direct views to the correct place, this way we can call node app.js from any directory
app.set("views", viewsPath);

//to have the engine look into the views folder from the root automatically, you need to call node from the root of our folder! so -- node src/app.js -- then it will look into views but if we go into the src folder and call -- node app.js -- it will throw an error because it will look for views in the src folder

//Sets up engine to point at partials
hbs.registerPartials(partialsPath);

//==============================================
app.get("", (req, res) => {
  res.render("index", { title: "Weather App", name: "Brian Bui" });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Brian Bui",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "Sorry, there's nothing on this page to help you out :(",
    title: "Help Page",
    name: "Brian Bui",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "You did not provide a search address" });
  }

  geocode(req.query.address, (error, geocodeData = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(geocodeData.lat, geocodeData.long, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      console.log(error);
      console.log("forecast data", forecastData);
      console.log(geocodeData.url);
      res.send({
        forecast: forecastData,
        location: geocodeData.location,
        address: req.query.address,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.send("Sorry the Help article you were trying to find does not exist.");
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 Page",
    name: "Brian Bui",
    errorMessage: "404! There is no page here, sorry :(",
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Port is running!");
});
