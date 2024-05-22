const app = require("../app");
const request = require("supertest");
const { clearAndSeed } = require("../db/seed");
const endpoints = require("../endpoints.json");

// Increase Jest timeout to handle longer operations
jest.setTimeout(30000);

beforeEach(async () => {
  await clearAndSeed();
});

afterAll(async () => {
  await clearAndSeed();
});

describe("GET /api", () => {
  test("GET status 200: Should return the content of the endpoints.json file", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        expect(body).toMatchObject(endpoints);
      });
  });
});

describe("GET /api/bookings", () => {
  test("GET status:200, Should get all bookings with the correct data", () => {
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

describe("GET /api/bookings/:booking_id", () => {
  test("GET status:200, Should get all bookings with the corrrect data", () => {
    return request(app)
      .get("/api/bookings/BK123456789")
      .expect(200)
      .then(({ body }) => {
        expect(typeof body.id).toBe("string");
        expect(typeof body.itineraryId).toBe("string");
        expect(typeof body.type).toBe("string");
        expect(Array.isArray(body.details)).toBe(true);
        expect(typeof body.createdAt).toBe("string");
        expect(typeof body.updatedAt).toBe("string");
      });
  });

  test.only("GET:404 sends an appropriate status and error message when given a valid but non-existent booking_id", () => {
    return request(app)
      .get("/api/bookings/999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("document_not_found");
      });
  });
});

describe("GET /api/users", () => {
  test("GET status:200, Should get all users with the correct data", () => {
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
  test("POST 201 returns the posted item", () => {
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
        expect(body.type).toBe(newBooking.type);
        expect(body.details).toEqual(newBooking.details);
      });
  });
  /////////////////////////
  test("POST:400 responds with an appropriate status and error message when provided with a bad comment (no comment body)", () => {
    const newComment = {
      username: "icellusedkars",
    };
    return request(app)
      .post("/api/bookings")
      .send(newComment)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });

  test("POST:400 responds with an appropriate status and error message when provided with an invalid id is provided", () => {
    const newComment = {
      username: "John Doe",
      body: "Hello",
    };
    return request(app)
      .post("/api/articles/Not_an_id/comments")
      .send(newComment)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
});

describe("DELETE:204 deletes the specified user and sends no body back", () => {
  test("204 - returns the ", () => {
    return request(app).delete("/api/users/USR345678901").expect(204);
  });
  test("DELETE:404 responds with an appropriate status and error message when given a non-existent id", () => {
    return request(app)
      .delete("/api/comments/999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });
});
