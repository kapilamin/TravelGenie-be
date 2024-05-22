const { databases, users, Permission, Role } = require("../db/appwrite");
const {
  activitiesID,
  bookingsID,
  itinerariesID,
  travelDetailsID,
  accommodationID,
  flightsID,
  usersID,
  databaseId,
} = require("../collectionIDs.json");
const { log } = require("console");

// LISTING DOCUMENTS
function fetchFlights() {
  const collectionId = "664b116d00364096c872";
  const databaseId = "664b0461000136d40330";
  return databases
    .listDocuments(databaseId, collectionId)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}
function fetchBookings() {
  const databaseId = "664b0461000136d40330";
  return databases
    .listDocuments(databaseId, bookingsID)
    .then((response) => {
      return response.documents;
    })
    .catch((error) => {
      return error;
    });
}
function fetchUsers() {
  const databaseId = "664b0461000136d40330";
  return databases
    .listDocuments(databaseId, usersID)
    .then((response) => {
      return response.documents;
    })
    .catch((error) => {
      return error;
    });
}

function fetchBookingById(documentId) {
  return databases
    .getDocument(databaseId, bookingsID, documentId)
    .then((response) => {
      return response;
    });
}

function insertBooking(booking) {
  return databases
    .createDocument(databaseId, bookingsID, booking.id, booking, [
      Permission.read(Role.any()),
      Permission.write(Role.any()),
    ])
    .then((response) => {
      return response;
    });
}

function removeUser(user_id) {
  return databases.deleteDocument(databaseId, usersID, user_id);
}

//////////
function fetchUserById(user_id) {
  return databases
    .getDocument(databaseId, usersID, user_id)
    .then((response) => {
      return response;
    });
}
function insertUser(user) {
  return databases
    .createDocument(databaseId, usersID, user.id, user, [
      Permission.read(Role.any()),
      Permission.write(Role.any()),
    ])
    .then((response) => {
      return response;
      s;
    });
}
function patchUser(user_id, userUpdate) {
  return databases
    .updateDocument(
      databaseId,
      usersID,
      user_id,
      userUpdate
      //   [
      //   Permission.read(Role.any()),
      //   Permission.write(Role.any()),
      // ]
    )
    .then((response) => {
      return response;
    });
}

module.exports = {
  fetchFlights,
  fetchBookings,
  fetchUsers,
  insertBooking,
  removeUser,
  fetchBookingById,
  fetchUserById,
  insertUser,
  patchUser,
};
