const {
  fetchFlights,
  fetchBookings,
  fetchUsers,
  insertBooking,
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
  console.log(booking, "<<<<<<<<<<<<<");
  insertBooking(booking)
    .then((users) => {
      console.log(users);
      res.status(201).send(users);
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
}

// {
//   "bookingId": "BK123456789",
//   "itineraryId": "itinerary123",
//   "type": "hotel",
//   "details": ["Booking details here..."],
//   "createdAt": "2024-05-20T12:00:00.000Z",
//   "updatedAt": "2024-05-20T12:00:00.000Z"
// }

// function postCommentByArticleId(req, res, next) {
//   const { article_id } = req.params;
//   const { username, body } = req.body;

//   if (!username || !body) {
//     return res.status(400).send({ msg: "Bad request" });
//   }

//   insertComment(article_id, username, body)
//     .then(([data]) => {
//       res.status(201).send(data);
//     })
//     .catch((err) => {
//       next(err);
//     });
// }

module.exports = {
  getFlights,
  getAllEndpoints,
  getBookings,
  getUsers,
  postBooking,
};
