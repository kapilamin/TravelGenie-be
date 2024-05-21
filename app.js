const express = require("express");
const dotenv = require("dotenv");
const { getFlights } = require("./controllers/flights_controller");

dotenv.config();

const app = express();

app.use(express.json());

app.get('/api/flights', getFlights)

module.exports = app