const path = require('path');
const express = require('express');
const ForecastIo = require('forecastio');

let app = express();
let weather = new ForecastIo("609c705291760311f891bb4f266f6460");

app.set('port', process.env.PORT || 3000);
app.set('x-powered-by', false);

app.use(express.static(path.resolve(__dirname,'public')));
app.set('views', path.resolve(__dirname,'views'));
app.set('view engine','ejs');

app.get('/', (req,res) => {
  res.render('index');
});

app.get('/latitude/:latitude/longitude/:longitude', (req, res, next) => {
  console.log(req.params.latitude, req.params.longitude);

  if (!req.params.latitude || !req.params.longitude) {
    res.status(404).render("404");
    return;
  }

  let latitude = parseInt(req.params.latitude, 10);
  let longitude = parseInt(req.params.longitude, 10);

  weather.forecast(latitude, longitude, (err,data) => {
    if (err) {
      next();
      return;
    }
    res.json({
      temperature:data.currently.temperature,
      timezone:data.timezone
    });
  });
});

app.use((req,res) => {
  res.status(404).render("404");
});

app.listen(3000);
