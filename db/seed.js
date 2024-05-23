const { databases, Permission, Role } = require('./appwrite');
const { 
  activitiesID, 
  itinerariesID, 
  travelDetailsID,
  accommodationID,
  bookingsID,
  flightsID,
  usersID,
  databaseID
} = require('../collectionIDs.json')


const Users = require("../db/data/testData/Users.json");
const Accommodation = require("../db/data/testData/Accommodations.json");
const Activities = require("../db/data/testData/Activities.json");
const Bookings = require("../db/data/testData/Bookings.json");
const Flights = require("../db/data/testData/Flights.json");
const TravelDetails = require("../db/data/testData/TravelDetails.json");
const Itineraries = require("../db/data/testData/Itineraries.json");


const databaseId = databaseID;
const usersCollectionId = usersID;
const flightsCollectionId = flightsID;
const accommodationsCollectionId = accommodationID;
const activitiesCollectionId = activitiesID;
const bookingsCollectionId = bookingsID;
const itinerariesCollectionId = itinerariesID;
const travelDetailsCollectionId = travelDetailsID;


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
