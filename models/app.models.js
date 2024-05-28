const {
  databases,
  users,
  Permission,
  Role,
  ID,
} = require("../db/appwrite.config");
const {
  database_id,
  activities_collection_id,
  itineraries_collection_id,
  travel_details_collection_id,
  accommodation_collection_id,
  bookings_collection_id,
  flights_collection_id,
  users_collection_id,
  travel_documents_collection_id,
} = require("../db/appwrite.config");

// LISTING DOCUMENTS
function fetchFlights() {
  return databases
    .listDocuments(database_id, flights_collection_id)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}
function fetchBookings() {
  return databases
    .listDocuments(database_id, bookings_collection_id)
    .then((response) => {
      return response.documents;
    })
    .catch((error) => {
      return error;
    });
}
function fetchUsers() {
  return databases
    .listDocuments(database_id, users_collection_id)
    .then((response) => {
      return response.documents;
    })
    .catch((error) => {
      return error;
    });
}

function fetchBookingById(documentId) {
  return databases
    .getDocument(database_id, bookings_collection_id, documentId)
    .then((response) => {
      return response;
    });
}

function insertBooking(booking) {
  return databases
    .createDocument(database_id, bookings_collection_id, ID.unique(), booking, [
      Permission.read(Role.any()),
      Permission.write(Role.any()),
    ])
    .then((response) => {
      return response;
    });
}

function removeUser(user_id) {
  return databases.deleteDocument(database_id, users_collection_id, user_id);
}

//////////
function fetchUserById(user_id) {
  return databases
    .getDocument(database_id, users_collection_id, user_id)
    .then((response) => {
      return response;
    });
}
function insertUser(user) {
  return databases
    .createDocument(database_id, users_collection_id, ID.unique(), user, [
      Permission.read(Role.any()),
      Permission.write(Role.any()),
    ])
    .then((response) => {
      console.log(response, "HEREEEEEEEEEEE");
      return response;
      s;
    });
}
function patchUser(user_id, userUpdate) {
  return databases
    .updateDocument(database_id, users_collection_id, user_id, userUpdate)
    .then((response) => {
      return response;
    });
}

///////////////////////////////////////////////

function fetchTravelDocumentsById(documentId) {
  return databases
    .getDocument(database_id, travel_documents_collection_id, documentId)
    .then((response) => {
      return response;
    });
}

function removeTravelDocument(document_id) {
  return databases.deleteDocument(
    database_id,
    travel_documents_collection_id,
    document_id
  );
}

function insertTravelDocument(document) {
  return databases
    .createDocument(
      database_id,
      travel_documents_collection_id,
      ID.unique(),
      document,
      [Permission.read(Role.any()), Permission.write(Role.any())]
    )
    .then((response) => {
      return response;
    });
}

////// HOW TO ADD REALATIONSHIP

// function addRelationship(
//   database_id,
//   booking_collection_id,
//   document_id,
//   update
// ) {
//   console.log("Function Invoked......");
//   return databases
//     .updateDocument(database_id, booking_collection_id, document_id, update)
//     .then((response) => {
//       console.log(response);
//       return response;
//     });
// }
// addRelationship(
//   "664b0461000136d40330",
//   "664b11a7003b76702fe8",
//   "664b11a7003b76702fe82",
//   {
//     travelDocuments: [
//       "66508d73001f11fd10c31",
//       "66508d73001f11fd10c32",
//       "66508d73001f11fd10c30",
//     ],
//   }
// );

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
  fetchTravelDocumentsById,
  removeTravelDocument,
  insertTravelDocument,
};
