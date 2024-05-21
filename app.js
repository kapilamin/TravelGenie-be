const express = require("express");
const dotenv = require("dotenv");
const {
  getFlights,
  getAllEndpoints,
  getBookings,
  getUsers,
  postBooking,
} = require("./controllers/app.controllers");

dotenv.config();

const app = express();

app.use(express.json());

app.get("/api", getAllEndpoints);
app.get("/api/flights", getFlights);
app.get("/api/bookings", getBookings);
app.get("/api/users", getUsers);
app.post("/api/bookings", postBooking);

// app.delete("/api/flights", deleteUsers);

// app.get("/api/flights", getTravelDocuments);

module.exports = app;
