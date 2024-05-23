const {
  fetchFlights,
  fetchBookings,
  fetchUsers,
  insertBooking,
  removeUser,
  fetchBookingById,
  fetchUserById,
  insertUser,
  patchUser,
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
      next(error);
    });
}

function postBooking(req, res, next) {
  const booking = req.body;

  insertBooking(booking)
    .then((booking) => {
      res.status(201).send(booking);
    })
    .catch((error) => {
      next(error);
    });
}
function deleteUser(req, res, next) {
  const { user_id } = req.params;

  removeUser(user_id)
    .then((user) => {
      res.status(204).send();
    })
    .catch((error) => {
      next(error);
    });
}
///////////////
function getUserById(req, res, next) {
  const { user_id } = req.params;

  fetchUserById(user_id)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((error) => {
      next(error);
    });
}
function updateUserById(req, res, next) {
  const { user_id } = req.params;
  const userUpdate = req.body;

  patchUser(user_id, userUpdate)
    .then((user) => {
      res.status(202).send(user);
    })
    .catch((error) => {
      next(error);
    });
}

function postUser(req, res, next) {
  const user = req.body;

  insertUser(user)
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((error) => {
      next(error);
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
  postUser,
  getUserById,
  updateUserById,
};
