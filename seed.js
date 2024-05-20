const { Client, Databases, Permission, Role, ID } = require("node-appwrite");

// Initialize the Appwrite client
const endpoint = "https://cloud.appwrite.io/v1";
const projectId = "664b025500172e0cc60b";
const apiKey = "YOUR_API_KEY_HERE";
const databaseId = "664b0461000136d40330";
const usersCollectionId = "664b04a2000e37a4e0f7";
const flightsCollectionId = "664b116d00364096c872";
const accommodationsCollectionId = "664b1243003a386b030d";
const activitiesCollectionId = "664b18aa00295019a2b1";
const bookingsCollectionId = "664b11a7003b76702fe8";
const itinerariesCollectionId = "664b1648002e754824ee";
const travelDetailsCollectionId = "664b136000290893618f";

const client = new Client();
client
  .setEndpoint(endpoint) // Your Appwrite Endpoint
  .setProject(projectId) // Your project ID
  .setKey(apiKey); // Your API key

const databases = new Databases(client);

function seedUsers() {
  const users = [
    {
      userId: ID.unique(),
      username: "johndoe",
      email: "johndoe@example.com",
      password: "hashed_password",
      created_at: new Date().toISOString(),
      flights: [],
      accommodation: [],
      bookings: [],
      travelDetails: [],
      itineraries: [],
      activities: [],
    },
    // Add more users as needed
  ];

  const promises = users.map((user) =>
    databases.createDocument(databaseId, usersCollectionId, user.userId, user, [
      Permission.read(Role.any()),
      Permission.write(Role.any()),
    ])
  );

  return Promise.all(promises)
    .then(() => {
      console.log("Users seeded successfully.");
    })
    .catch((error) => {
      console.error("Error seeding users:", error);
    });
}

function seedFlights() {
  const flights = [
    {
      flightId: ID.unique(),
      airline: "Air France",
      departureAirport: "JFK",
      arrivalAirport: "CDG",
      departureTime: "2024-06-15T10:00:00Z",
      arrivalTime: "2024-06-15T14:00:00Z",
      ticketNumber: "AF123456789",
      seatNumber: "12A",
    },
    // Add more flights as needed
  ];

  const promises = flights.map((flight) =>
    databases.createDocument(
      databaseId,
      flightsCollectionId,
      flight.flightId,
      flight,
      [Permission.read(Role.any()), Permission.write(Role.any())]
    )
  );

  return Promise.all(promises)
    .then(() => {
      console.log("Flights seeded successfully.");
    })
    .catch((error) => {
      console.error("Error seeding flights:", error);
    });
}

function seedAccommodations() {
  const accommodations = [
    {
      accommodationId: ID.unique(),
      name: "Hotel Parisian",
      location: "123 Champs-Élysées, Paris",
      checkInDate: "2024-06-15",
      checkOutDate: "2024-06-20",
      roomNumber: "101",
      bookingReference: "HP987654321",
      pricePerNight: 150,
      amenities: ["Free Wi-Fi", "Breakfast included", "Swimming pool"],
    },
    // Add more accommodations as needed
  ];

  const promises = accommodations.map((accommodation) =>
    databases.createDocument(
      databaseId,
      accommodationsCollectionId,
      accommodation.accommodationId,
      accommodation,
      [Permission.read(Role.any()), Permission.write(Role.any())]
    )
  );

  return Promise.all(promises)
    .then(() => {
      console.log("Accommodations seeded successfully.");
    })
    .catch((error) => {
      console.error("Error seeding accommodations:", error);
    });
}

function seedBookings() {
  const bookings = [
    {
      bookingId: ID.unique(),
      itineraryId: "itinerary123", // Make sure this matches an existing itineraryId
      type: "hotel",
      details: ["Booking details here..."],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    // Add more bookings as needed
  ];

  const promises = bookings.map((booking) =>
    databases.createDocument(
      databaseId,
      bookingsCollectionId,
      booking.bookingId,
      booking,
      [Permission.read(Role.any()), Permission.write(Role.any())]
    )
  );

  return Promise.all(promises)
    .then(() => {
      console.log("Bookings seeded successfully.");
    })
    .catch((error) => {
      console.error("Error seeding bookings:", error);
    });
}

function seedItineraries() {
  const itineraries = [
    {
      itineraryId: ID.unique(),
      tripName: "Summer Vacation 2024",
      startDate: "2024-06-15",
      endDate: "2024-06-25",
      destinations: ["Paris", "Lyon"],
      flights: ["flight123"],
      accommodation: ["accommodation123"],
      //activityId: ["activity123"],
    },
    // Add more itineraries as needed
  ];

  const promises = itineraries.map((itinerary) =>
    databases.createDocument(
      databaseId,
      itinerariesCollectionId,
      itinerary.itineraryId,
      itinerary,
      [Permission.read(Role.any()), Permission.write(Role.any())]
    )
  );

  return Promise.all(promises)
    .then(() => {
      console.log("Itineraries seeded successfully.");
    })
    .catch((error) => {
      console.error("Error seeding itineraries:", error);
    });
}

function seedActivities() {
  const activities = [
    {
      activityId: ID.unique(),
      location: "Paris",
      name: "Seine River Cruise",
      type: "Tour",
      description:
        "A relaxing cruise along the Seine River with views of Paris landmarks.",
      price: 30,
      startTime: "18:00",
      endTime: "20:00",
    },
    // Add more activities as needed
  ];

  const promises = activities.map((activity) =>
    databases.createDocument(
      databaseId,
      activitiesCollectionId,
      activity.activityId,
      activity,
      [Permission.read(Role.any()), Permission.write(Role.any())]
    )
  );

  return Promise.all(promises)
    .then(() => {
      console.log("Activities seeded successfully.");
    })
    .catch((error) => {
      console.error("Error seeding activities:", error);
    });
}

function seedTravelDetails() {
  const travelDetails = [
    {
      detailsId: ID.unique(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      interests: ["hiking", "museums", "food"],
      location: "Paris, France",
      budget: 1500,
      dateOfDeparture: "2024-06-01T08:00:00Z",
      dateOfReturn: "2024-06-10T20:00:00Z",
      itineraries: ID.unique(),
    },

    // Add more travel details as needed
  ];

  const promises = travelDetails.map((details) =>
    databases.createDocument(
      databaseId,
      travelDetailsCollectionId,
      details.detailsId,
      details,
      [Permission.read(Role.any()), Permission.write(Role.any())]
    )
  );

  return Promise.all(promises)
    .then(() => {
      console.log("Travel details seeded successfully.");
    })
    .catch((error) => {
      console.error("Error seeding travel details:", error);
    });
}

// Run all seed functions
Promise.all([
  seedUsers(),
  seedFlights(),
  seedAccommodations(),
  seedBookings(),
  seedItineraries(),
  seedActivities(),
  seedTravelDetails(),
])
  .then(() => {
    console.log("All collections seeded successfully.");
  })
  .catch((error) => {
    console.error("Error seeding collections:", error);
  });
