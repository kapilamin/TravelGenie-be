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

// errorHandling
app.use((err, req, res, next) => {
  if (err.code === 404) {
    res.status(err.code).send({ msg: err.type });
  }
  next(err);
});
app.use((err, req, res, next) => {
  if (err.code === 400 && err.type === "document_invalid_structure") {
    res.status(err.code).send({ msg: err.type });
  }
  next(err);
});
app.use((err, req, res, next) => {
  if (err.code === 400 && err.type === "general_argument_invalid") {
    res.status(err.code).send({ msg: "Invalid data type provided" });
  }
  next(err);
});

module.exports = app;
