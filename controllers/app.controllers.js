const {
  fetchFlights,
  fetchBookings,
  fetchUsers,
  insertBooking,
  removeUser,
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
function postBooking(req, res) {
  // const { booking_id } = req.params;
  const booking = req.body;
  // console.log(booking, "<<<<<<<<<<<<<");
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
};
