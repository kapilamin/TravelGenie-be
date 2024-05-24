const {
  ID,
  databases,
  Permission,
  Role,
  database_id,
  activities_collection_id,
  itineraries_collection_id,
  travel_details_collection_id,
  accommodations_collection_id,
  bookings_collection_id,
  flights_collection_id,
  users_collection_id,
  travel_documents_collection_id,
} = require("./appwrite.config");

const Users = require("../db/data/testData/Users.json");
const Accommodations = require("../db/data/testData/Accommodations.json");
const Activities = require("../db/data/testData/Activities.json");
const Bookings = require("../db/data/testData/Bookings.json");
const Flights = require("../db/data/testData/Flights.json");
const TravelDetails = require("../db/data/testData/TravelDetails.json");
const Itineraries = require("../db/data/testData/Itineraries.json");
const TravelDocuments = require("../db/data/testData/TravelDocuments.json");

async function seedCollection(collectionId, data) {
  // await databases.createDocument(
  //   database_id,
  //   collectionId,
  //   "0987654321fedcba",
  //   {
  //     documentId: "1122334455667788",
  //     bucketId: "aabbccddeeff0011",
  //     updatedAt: "2024-05-24T14:50:15.456+00:00",
  //     createdAt: "2024-05-24T10:15:00.000+00:00",
  //     type: "text/plain",
  //     name: "example-text-1.txt",
  //   },
  //   [Permission.read(Role.any()), Permission.write(Role.any())]
  // );
  const promises = data.map((item) =>
    databases
      .createDocument(database_id, collectionId, ID.unique(), item, [
        Permission.read(Role.any()),
        Permission.write(Role.any()),
      ])
      .catch((error) => {
        if (error.type === "document_already_exists") {
          return;
        }
        throw error;
      })
  );

  await Promise.all(promises).catch((error) => {
    console.error(`Error seeding collection ${collectionId}:`, error);
  });
}

async function clearCollection(collectionId) {
  try {
    const response = await databases.listDocuments(database_id, collectionId);
    const deletePromises = response.documents.map((document) => {
      // if (document.$id === "0987654321fedcba") {
      //   return;
      // }
      return databases.deleteDocument(database_id, collectionId, document.$id);
    });
    await Promise.all(deletePromises);
  } catch (error) {
    if (error.type === "document_not_found") {
      return;
    }
    throw error;
  }
}

async function seedAllCollections() {
  const seedPromises = [
    seedCollection(users_collection_id, Users),
    seedCollection(flights_collection_id, Flights),
    seedCollection(accommodations_collection_id, Accommodations),
    seedCollection(bookings_collection_id, Bookings),
    seedCollection(itineraries_collection_id, Itineraries),
    seedCollection(activities_collection_id, Activities),
    seedCollection(travel_details_collection_id, TravelDetails),
    seedCollection(travel_documents_collection_id, TravelDocuments),
  ];
  await Promise.all(seedPromises);
}

async function clearAllCollections() {
  const clearPromises = [
    clearCollection(users_collection_id),
    clearCollection(flights_collection_id),
    clearCollection(accommodations_collection_id),
    clearCollection(bookings_collection_id),
    clearCollection(itineraries_collection_id),
    clearCollection(activities_collection_id),
    clearCollection(travel_details_collection_id),
    clearCollection(travel_documents_collection_id),
  ];
  await Promise.all(clearPromises);
}

async function clearAndSeed() {
  await clearAllCollections();
  await seedAllCollections();
}

module.exports = { clearAllCollections, seedAllCollections, clearAndSeed };
