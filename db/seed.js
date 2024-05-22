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

function seedUsers(Users) {
  const promises = Users.map((user) =>
    databases
      .createDocument(databaseId, usersCollectionId, user.userId, user, [
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

  return Promise.all(promises)

    .catch((error) => {
      if (error.type === "document_already_exists") {
      }
      // console.error("Error seeding users:", error);
    });
}

function seedFlights(Flights) {
  const promises = Flights.map((flight) =>
    databases
      .createDocument(
        databaseId,
        flightsCollectionId,
        flight.flightId,
        flight,
        [Permission.read(Role.any()), Permission.write(Role.any())]
      )
      .catch((error) => {
        if (error.type === "document_already_exists") {
          return;
        }
        throw error;
      })
  );

  return Promise.all(promises)

    .catch((error) => {
      // console.error("Error seeding flights:", error);
    });
}

function seedAccommodations(Accommodations) {
  const promises = Accommodations.map((accommodation) =>
    databases
      .createDocument(
        databaseId,
        accommodationsCollectionId,
        accommodation.accommodationId,
        accommodation,
        [Permission.read(Role.any()), Permission.write(Role.any())]
      )
      .catch((error) => {
        if (error.type === "document_already_exists") {
          return;
        }
        throw error;
      })
  );

  return Promise.all(promises)

    .catch((error) => {
      // console.error("Error seeding accommodations:", error);
    });
}

function seedBookings(Bookings) {
  const promises = Bookings.map((booking) =>
    databases
      .createDocument(
        databaseId,
        bookingsCollectionId,
        booking.bookingId,
        booking,
        [Permission.read(Role.any()), Permission.write(Role.any())]
      )
      .catch((error) => {
        if (error.type === "document_already_exists") {
          return;
        }
        throw error;
      })
  );

  return Promise.all(promises)

    .catch((error) => {
      // console.error("Error seeding bookings:", error);
    });
}

function seedItineraries(Itineraries) {
  const promises = Itineraries.map((itinerary) =>
    databases
      .createDocument(
        databaseId,
        itinerariesCollectionId,
        itinerary.itineraryId,
        itinerary,
        [Permission.read(Role.any()), Permission.write(Role.any())]
      )
      .catch((error) => {
        if (error.type === "document_already_exists") {
          return;
        }
        throw error;
      })
  );

  return Promise.all(promises)

    .catch((error) => {
      // console.error("Error seeding itineraries:", error);
    });
}

function seedActivities(Activities) {
  const promises = Activities.map((activity) =>
    databases
      .createDocument(
        databaseId,
        activitiesCollectionId,
        activity.activityId,
        activity,
        [Permission.read(Role.any()), Permission.write(Role.any())]
      )
      .catch((error) => {
        if (error.type === "document_already_exists") {
          return;
        }
        throw error;
      })
  );

  return Promise.all(promises)

    .catch((error) => {
      // console.error("Error seeding activities:", error);
    });
}

function seedTravelDetails(TravelDetails) {
  const promises = TravelDetails.map((details) =>
    databases
      .createDocument(
        databaseId,
        travelDetailsCollectionId,
        details.detailsId,
        details,
        [Permission.read(Role.any()), Permission.write(Role.any())]
      )
      .catch((error) => {
        if (error.type === "document_already_exists") {
          return;
        }
        throw error;
      })
  );

  return Promise.all(promises)

    .catch((error) => {
      // console.error("Error seeding travel details:", error);
    });
}

// Run all seed functions
async function addCollections() {
  try {
    await seedUsers(Users);
    await seedFlights(Flights);
    await seedAccommodations(Accommodation);
    await seedBookings(Bookings);
    await seedItineraries(Itineraries);
    await seedActivities(Activities);
    await seedTravelDetails(TravelDetails);
    // console.log("All collections seeded successfully.");
  } catch (error) {
    return error;
    // console.error("Error seeding collections:", error);
  }
}

async function clearCollections() {
  const collectionIds = [
    usersCollectionId,
    flightsCollectionId,
    accommodationsCollectionId,
    activitiesCollectionId,
    bookingsCollectionId,
    itinerariesCollectionId,
    travelDetailsCollectionId,
  ];

  const promises = collectionIds.map(async (collectionId) => {
    try {
      const response = await databases.listDocuments(databaseId, collectionId);
      const deletePromises = response.documents.map((document) =>
        databases
          .deleteDocument(databaseId, collectionId, document.$id)
          .catch((error) => {
            if (error.type === "document_not_found") {
              return;
            }
            throw error;
          })
      );
      await Promise.all(deletePromises);
      // console.log(`Cleared collection ${collectionId} successfully.`);
    } catch (error) {
      return error;
      //catch and handle the undefined error
      // console.error(`Error clearing collection ${collectionId}:`, error);
    }
  });

  await Promise.all(promises);
}

async function clear_and_seed() {
  await clearCollections();
  await addCollections();
}

// clear_and_seed();

module.exports = { clearCollections, addCollections, clear_and_seed };
