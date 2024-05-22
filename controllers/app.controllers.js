const {
  fetchFlights,
  fetchBookings,
  fetchUsers,
  insertBooking,
  removeUser,
  fetchBookingById,
} = require("../models/app.models");
const endpoints = require("../endpoints.json");

function getAllEndpoints(req, res) {
  res.status(200).send(endpoints);
}

function getFlights(req, res) {
  fetchFlights()
    .then((flights) => {
      res.status(200).send(flights);
    })
    .catch((error) => {
      return error;
    });
}
function getBookings(req, res) {
  fetchBookings()
    .then((bookings) => {
      res.status(200).send(bookings);
    })
    .catch((error) => {
      return error;
    });
}
function getUsers(req, res) {
  fetchUsers()
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((error) => {
      return error;
    });
}

function getBookingbyId(req, res, next) {
  const { booking_id } = req.params;

  fetchBookingById(booking_id)
    .then((booking) => {
      res.status(200).send(booking);
    })
    .catch((error) => {
      // console.log(error);
      next(error);
    });
}

function postBooking(req, res) {
  const booking = req.body;

  insertBooking(booking)
    .then((booking) => {
      res.status(201).send(booking);
    })
    .catch((error) => {
      return error;
    });
}
function deleteUser(req, res) {
  const { user_id } = req.params;

  removeUser(user_id)
    .then((user) => {
      res.status(204).send();
    })
    .catch((error) => {
      return error;
    });
}

module.exports = {
  getFlights,
  getAllEndpoints,
  getBookings,
  getUsers,
  postBooking,
  deleteUser,
  getBookingbyId,
};