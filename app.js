var express = require("express");
var logger = require("morgan");
const designerRouter = require("./src/designers/router");

var app = express();

app.use(logger("dev"));

app.use(express.json());

app.use("/designers", designerRouter);

module.exports = app;
