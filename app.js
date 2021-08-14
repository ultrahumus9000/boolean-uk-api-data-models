var express = require("express");
var logger = require("morgan");
const designerRouter = require("./src/designers/router");
const guestRouter = require("./src/guests/router");
const modelRouter = require("./src/models/router");
const eventRouter = require("./src/events/router");
const orderRouter = require("./src/orders/router");
const outfitRouter = require("./src/outfits/router");
var app = express();

app.use(logger("dev"));

app.use(express.json());

app.use("/designers", designerRouter);
app.use("/events", eventRouter);
app.use("/guests", guestRouter);
app.use("/models", modelRouter);
app.use("/orders", orderRouter);
app.use("/outfits", outfitRouter);

module.exports = app;
