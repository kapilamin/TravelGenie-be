const express = require("express");
const dotenv = require("dotenv");
const {
  getFlights,
  getAllEndpoints,
  getBookings,
  getUsers,
  postBooking,
  deleteUser,
  getBookingbyId,
} = require("./controllers/app.controllers");

dotenv.config();

const app = express();

app.use(express.json());

app.get("/api", getAllEndpoints);
app.get("/api/flights", getFlights);
app.get("/api/bookings", getBookings);
app.get("/api/bookings/:booking_id", getBookingbyId);
app.get("/api/users", getUsers);
app.post("/api/bookings", postBooking);
app.delete("/api/users/:user_id", deleteUser);

// app.get("/api/flights", getTravelDocuments);

module.exports = app;
