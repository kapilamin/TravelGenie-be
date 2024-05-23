const {
  databases,
  users,
  Permission,
  Role,
} = require("../db/testDb/appwrite.config");
const {
  activitiesID,
  bookingsID,
  itinerariesID,
  travelDetailsID,
  accommodationID,
  flightsID,
  usersID,
  databaseID,
} = require("../db/testDb/testCollectionIDs.json");

// LISTING DOCUMENTS
function fetchFlights() {
  return databases
    .listDocuments(databaseID, flightsID)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}
function fetchBookings() {
  return databases
    .listDocuments(databaseID, bookingsID)
    .then((response) => {
      return response.documents;
    })
    .catch((error) => {
      return error;
    });
}
function fetchUsers() {
  return databases
    .listDocuments(databaseID, usersID)
    .then((response) => {
      return response.documents;
    })
    .catch((error) => {
      return error;
    });
}

function fetchBookingById(documentId) {
  return databases
    .getDocument(databaseID, bookingsID, documentId)
    .then((response) => {
      return response;
    });
}

function insertBooking(booking) {
  return databases
    .createDocument(databaseID, bookingsID, booking.id, booking, [
      Permission.read(Role.any()),
      Permission.write(Role.any()),
    ])
    .then((response) => {
      return response;
    });
}

function removeUser(user_id) {
  return databases.deleteDocument(databaseID, usersID, user_id);
}

//////////
function fetchUserById(user_id) {
  return databases
    .getDocument(databaseID, usersID, user_id)
    .then((response) => {
      return response;
    });
}
function insertUser(user) {
  return databases
    .createDocument(databaseID, usersID, user.id, user, [
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
    .updateDocument(databaseID, usersID, user_id, userUpdate)
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
