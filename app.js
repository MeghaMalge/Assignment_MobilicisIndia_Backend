const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const HttpError = require("./models/Error");
const usersRoutes = require("./routes/usersRoutes");
const citiesRoutes = require("./routes/citiesRoutes");

// Required for inserting data
// const users = require("./data");
// const User = require("./models/User");

const app = express();

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use("/api/users", usersRoutes);
app.use("/api/cities", citiesRoutes);

app.use((req, res, next) => {
  throw new HttpError("Route not found", 404);
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "An unexpected error happened !" });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.jntgd5b.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(5000);
    console.log("server started at port 5000, connected to database");

    // Data inserted in database
    // User.insertMany(users);
  })
  .catch((err) => {
    console.log(err);
  });
