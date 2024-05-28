const express = require("express");
const cors = require("cors");

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
  getTravelDocumentsById,
  postTravelDocument,
  deleteTravelDocumentsById,
} = require("./controllers/app.controllers");

const app = express();

app.use(cors());

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

// travel documents
app.get("/api/travel_documents/:document_id", getTravelDocumentsById);
app.post("/api/travel_documents", postTravelDocument);
app.delete("/api/travel_documents/:document_id", deleteTravelDocumentsById);

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
