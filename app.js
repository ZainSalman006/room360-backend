const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { request } = require("express");

const login = require("./routes/login");
const booking = require("./routes/booking");
const place = require("./routes/places");
const guest = require("./routes/guest");
const host = require("./routes/host");
const reviews = require("./routes/reviews");
const contactus = require("./routes/contact");

app.use(
  bodyParser.json({
    limit: "400000000"
  })
);

app.use(
  cors({
    origin: "*",
  })
);

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

//API
app.use("/api/v1/login", login);
app.use("/api/v1/booking", booking);
app.use("/api/v1/place", place);
app.use("/api/v1/guest", guest);
app.use("/api/v1/host", host);
app.use("/api/v1/reviews", reviews);
app.use("/api/v1/contactus", contactus);

module.exports = app;
