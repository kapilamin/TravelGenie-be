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
  postUser,
  getUserById,
  updateUserById,
} = require("./controllers/app.controllers");

dotenv.config();

const app = express();

app.use(express.json());

// users
app.get("/api", getAllEndpoints);
app.get("/api/users", getUsers);
app.post("/api/users", postUser);
app.get("/api/users/:user_id", getUserById);
app.patch("/api/users/:user_id", updateUserById);
app.delete("/api/users/:user_id", deleteUser);

// bookings
app.get("/api/bookings", getBookings);
app.get("/api/bookings/:booking_id", getBookingbyId);
app.post("/api/bookings", postBooking);

app.get("/api/flights", getFlights);
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
