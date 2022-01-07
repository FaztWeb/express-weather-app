const express = require("express");
const morgan = require("morgan");
const path = require("path");
const { PORT } = require("./config");

const app = express();

// settings
app.set("port", PORT || 3000);
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

// middlewares
app.use(morgan("dev"));

// routes
app.use(require("./routes/index"));

// static files
app.use(express.static(path.join(__dirname, "public")));

// not found
app.use((req, res) => {
  res.status(404).render("404");
});

module.exports = app;
