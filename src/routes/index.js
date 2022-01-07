const { Router } = require("express");
const axios = require("axios");

const { API_KEY } = require("../config");
const router = Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get(
  "/latitude/:latitude/longitude/:longitude",
  async (req, res, next) => {
    if (!req.params.latitude || !req.params.longitude) {
      res.status(404).render("404");
      return;
    }

    let latitude = parseInt(req.params.latitude, 10);
    let longitude = parseInt(req.params.longitude, 10);

    try {
      const WeatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );

      const locationResponse = await axios.get(
        `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=10&appid=${API_KEY}`
      );

      res.json({
        temperature: WeatherResponse.data.main.temp,
        timezone: `${locationResponse.data[0].country}/${locationResponse.data[0].state}`,
      });
    } catch (error) {
      next();
    }
  }
);

module.exports = router;
