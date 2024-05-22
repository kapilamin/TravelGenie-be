const { databases, Permission, Role } = require("./appwrite");

const Users = require("../db/data/testData/Users.json");
const Accommodation = require("../db/data/testData/Accommodations.json");
const Activities = require("../db/data/testData/Activities.json");
const Bookings = require("../db/data/testData/Bookings.json");
const Flights = require("../db/data/testData/Flights.json");
const TravelDetails = require("../db/data/testData/TravelDetails.json");
const Itineraries = require("../db/data/testData/Itineraries.json");

// Collection IDs
const databaseId = "664b0461000136d40330";
const usersCollectionId = "664b04a2000e37a4e0f7";
const flightsCollectionId = "664b116d00364096c872";
const accommodationsCollectionId = "664b1243003a386b030d";
const activitiesCollectionId = "664b18aa00295019a2b1";
const bookingsCollectionId = "664b11a7003b76702fe8";
const itinerariesCollectionId = "664b1648002e754824ee";
const travelDetailsCollectionId = "664b136000290893618f";

async function seedCollection(collectionId, data) {
  const promises = data.map((item) =>
    databases
      .createDocument(databaseId, collectionId, item.id, item, [
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
    const response = await databases.listDocuments(databaseId, collectionId);
    const deletePromises = response.documents.map((document) =>
      databases.deleteDocument(databaseId, collectionId, document.id)
    );
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
    seedCollection(usersCollectionId, Users),
    seedCollection(flightsCollectionId, Flights),
    seedCollection(accommodationsCollectionId, Accommodation),
    seedCollection(bookingsCollectionId, Bookings),
    seedCollection(itinerariesCollectionId, Itineraries),
    seedCollection(activitiesCollectionId, Activities),
    seedCollection(travelDetailsCollectionId, TravelDetails),
  ];
  await Promise.all(seedPromises);
}

async function clearAllCollections() {
  const clearPromises = [
    clearCollection(usersCollectionId),
    clearCollection(flightsCollectionId),
    clearCollection(accommodationsCollectionId),
    clearCollection(bookingsCollectionId),
    clearCollection(itinerariesCollectionId),
    clearCollection(activitiesCollectionId),
    clearCollection(travelDetailsCollectionId),
  ];
  await Promise.all(clearPromises);
}

async function clearAndSeed() {
  await clearAllCollections();
  await seedAllCollections();
}

module.exports = { clearAllCollections, seedAllCollections, clearAndSeed };
