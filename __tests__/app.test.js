const app = require("../app");
const request = require("supertest");
const { addCollections, clearCollections } = require("../db/seed");
const endpoints = require("../endpoints.json");

beforeEach(async () => {
  await clearCollections();
  await addCollections();
});

describe("GET /api", () => {
  test("GET status 200: Should return the constent of the endpoints.json file", () => {
    request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        expect(body).toMatchObject(endpoints);
      });
  });
});

describe("GET /api/bookings", () => {
  test("GET status:200, Should get all bookings with the corrrect data", () => {
    return request(app)
      .get("/api/bookings")
      .expect(200)
      .then(({ body }) => {
        expect(body.length).toBe(5);
        body.forEach((booking) => {
          expect(typeof booking.bookingId).toBe("string");
          expect(typeof booking.itineraryId).toBe("string");
          expect(typeof booking.type).toBe("string");
          expect(Array.isArray(booking.details)).toBe(true);
          expect(typeof booking.createdAt).toBe("string");
          expect(typeof booking.updatedAt).toBe("string");
        });
      });
  });
});
describe("GET /api/users", () => {
  test("GET status:200, Should get all users with the corrrect data", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        expect(body.length).toBe(5);
        expect(Array.isArray(body)).toBe(true);

        body.forEach((user) => {
          expect(typeof user.userId).toBe("string");
          expect(typeof user.username).toBe("string");
          expect(typeof user.email).toBe("string");
          expect(Array.isArray(user.flights)).toBe(true);
          expect(typeof user.created_at).toBe("string");
          expect(typeof user.password).toBe("string");
        });
      });
  });
});

describe("POST:/api/bookings/", () => {
  test.only("POST 201 returns the posted item", () => {
    const newBooking = {
      bookingId: "BK234567894",
      itineraryId: "itinerary127",
      type: "cruise",
      details: ["Cruise details here..."],
      createdAt: "2024-05-24T16:40:10.000Z",
      updatedAt: "2024-05-24T16:40:10.000Z",
    };
    return request(app)
      .post("/api/bookings")
      .send(newBooking)
      .expect(201)
      .then(({ body }) => {
        console.log(body);
        expect(body.type).toBe(newBooking.type);
        expect(body.details).toEqual(newBooking.details);
      });
  });
});
