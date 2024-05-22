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
function insertBooking(booking) {
  return databases
    .createDocument(databaseId, bookingsID, booking.bookingId, booking, [
      Permission.read(Role.any()),
      Permission.write(Role.any()),
    ])
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}

function removeUser(user_id) {
  return databases
    .deleteDocument(databaseId, usersID, user_id)

    .catch((error) => {
      console.error("Error deleting document:", error);
      return error;
    });
}

module.exports = {
  fetchFlights,
  fetchBookings,
  fetchUsers,
  insertBooking,
  removeUser,
};
