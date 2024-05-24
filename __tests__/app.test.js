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
        expect(body.length).toBe(3);
        body.forEach((booking) => {
          expect(typeof booking.id).toBe("string");
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

  test("GET:404 sends an appropriate status and error message when given a valid but non-existent booking_id", () => {
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
        expect(body.length).toBe(3);
        expect(Array.isArray(body)).toBe(true);

        body.forEach((user) => {
          expect(typeof user.id).toBe("string");
          expect(typeof user.username).toBe("string");
          expect(typeof user.email).toBe("string");
          expect(Array.isArray(user.flights)).toBe(true);
          expect(typeof user.created_at).toBe("string");
          expect(typeof user.password).toBe("string");
        });
      });
  });
});

describe("GET /api/users/:user_id", () => {
  test("GET status:200, Should get user with the corrrect data", () => {
    return request(app)
      .get("/api/users/USR234567890")
      .expect(200)
      .then(({ body }) => {
        expect(typeof body.id).toBe("string");
        expect(typeof body.username).toBe("string");
        expect(typeof body.email).toBe("string");
        expect(Array.isArray(body.flights)).toBe(true);
        expect(typeof body.created_at).toBe("string");
        expect(typeof body.updated_at).toBe("string");
      });
  });

  test("GET:404 sends an appropriate status and error message when given a valid but non-existent user_id", () => {
    return request(app)
      .get("/api/users/999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("document_not_found");
      });
  });
});

describe("PATCH:/api/users/:user_id", () => {
  test("PATCH 202 returns the posted item", () => {
    const userUpdate = {
      username: "janedoe",
      password: "not_password",
      created_at: "2024-05-20T12:00:01.000Z",
      updated_at: "2024-05-20T12:00:00.000Z",
    };
    return request(app)
      .patch("/api/users/USR234567890")
      .send(userUpdate)
      .expect(202)
      .then(({ body }) => {
        expect(body.username).toBe(userUpdate.username);
        expect(body.password).toEqual(userUpdate.password);
      });
  });

  test("PATCH:400 responds with an appropriate status and error message when provided with an invalid field (address)", () => {
    const userUpdate = {
      username: "janedoe",
      password: "not_password",
      created_at: "2024-05-20T12:00:01.000Z",
      updated_at: "2024-05-20T12:00:00.000Z",
      address: "CM7777777777777",
    };
    return request(app)
      .patch("/api/users/USR234567890")
      .send(userUpdate)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("document_invalid_structure");
      });
  });

  test("POST:404 responds with an appropriate status and error message when provided with an invalid id", () => {
    const userUpdate = {
      username: "janedoe",
      password: "not_password",
      created_at: "2024-05-20T12:00:01.000Z",
      updated_at: "2024-05-20T12:00:00.000Z",
    };
    return request(app)
      .patch("/api/users/999")
      .send(userUpdate)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("document_not_found");
      });
  });
});
/////////
describe("POST:/api/users/", () => {
  test("POST 201 returns the posted item", () => {
    const newUser = {
      id: "USR0987654321",
      username: "johnsmith",
      email: "johnsmith@example.com",
      password: "hashed_password2",
      created_at: "2024-05-21T14:30:15.000Z",
      updated_at: "2024-05-21T14:30:15.000Z",
    };
    return request(app)
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .then(({ body }) => {
        expect(body.type).toBe(newUser.type);
        expect(body.details).toEqual(newUser.details);
      });
  });

  test("POST:400 responds with an appropriate status and error message when provided with a missing required field (email)", () => {
    const newUser = {
      id: "USR0987654321",
      username: "johnsmith",
      // email: "johnsmith@example.com",
      password: "hashed_password2",
      created_at: "2024-05-21T14:30:15.000Z",
      updated_at: "2024-05-21T14:30:15.000Z",
    };
    return request(app)
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("document_invalid_structure");
      });
  });
  test("POST:400 responds with an appropriate status and error message when provided with a valid attribute with missing entry required field (email)", () => {
    const newUser = {
      id: "USR0987654321",
      username: "johnsmith",
      email: "",
      password: "hashed_password2",
      created_at: "2024-05-21T14:30:15.000Z",
      updated_at: "2024-05-21T14:30:15.000Z",
    };
    return request(app)
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("document_invalid_structure");
      });
  });

  test("POST:400 responds with an appropriate status and error message when provided with an invalid id is provided", () => {
    const newUser = {
      id: 987654321,
      username: "johnsmith",
      email: "johnsmith@example.com",
      password: "hashed_password2",
      created_at: "2024-05-21T14:30:15.000Z",
      updated_at: "2024-05-21T14:30:15.000Z",
    };
    return request(app)
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid data type provided");
      });
  });
});

////////

describe("POST:/api/bookings/", () => {
  test("POST 201 returns the posted item", () => {
    const newBooking = {
      id: "BK987654321",
      itineraryId: "itinerary456",
      type: "flight",
      details: ["Booking details here..."],
      createdAt: "2024-05-22T08:30:00.000Z",
      updatedAt: "2024-05-22T08:30:00.000Z",
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

  test("POST:400 responds with an appropriate status and error message when provided with a missing field (no flight field)", () => {
    const newBooking = {
      id: "BK987654321",
      itineraryId: "itinerary456",
      details: ["Booking details here..."],
      createdAt: "2024-05-22T08:30:00.000Z",
      updatedAt: "2024-05-22T08:30:00.000Z",
    };
    return request(app)
      .post("/api/bookings")
      .send(newBooking)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("document_invalid_structure");
      });
  });

  test("POST:400 responds with an appropriate status and error message when provided with an invalid id is provided", () => {
    const newBooking = {
      id: 987654321,
      itineraryId: "itinerary456",
      details: ["Booking details here..."],
      createdAt: "2024-05-22T08:30:00.000Z",
      updatedAt: "2024-05-22T08:30:00.000Z",
    };
    return request(app)
      .post("/api/bookings")
      .send(newBooking)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid data type provided");
      });
  });
});

describe("DELETE:204 deletes the specified user and sends no body back", () => {
  test("204 - returns the ", () => {
    return request(app).delete("/api/users/USR345678901").expect(204);
  });
  test("DELETE:404 responds with an appropriate status and error message when given a non-existent id", () => {
    return request(app)
      .delete("/api/users/999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("document_not_found");
      });
  });
});


///////////////////////////////////////////

describe("GET /api/travel_documents/:document_id", () => {
  test("GET status:200, Should get all travel documents with the corrrect data", () => {
    return request(app)
      .get("/api/travel_documents/1234567890abcdef")
      .expect(200)
      .then(({ body }) => {
        expect(typeof body.id).toBe("string");
        expect(typeof body.bucketId).toBe("string");
        expect(typeof body.type).toBe("string");
        expect(typeof body.name).toBe("string");
        expect(typeof body.createdAt).toBe("string");
        expect(typeof body.updatedAt).toBe("string");
      });
  });

  test("GET:404 sends an appropriate status and error message when given a valid but non-existent document_id", () => {
    return request(app)
      .get("/api/travel_documents/999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("document_not_found");
      });
  });
});

describe("POST:/api/travel_documents/", () => {
  test("POST 201 returns the posted item", () => {
    const newDocument = {
      id: "9876543210fedcba",
      bucketId: "fedcba9876543210",
      updatedAt: "2024-06-01T15:30:20.123+00:00",
      createdAt: "2024-06-01T14:00:00.000+00:00",
      type: "image/png",
      name: "sample-image-2.png"
    }
    
    return request(app)
      .post("/api/travel_documents")
      .send(newDocument)
      .expect(201)
      .then(({ body }) => {
        expect(body.type).toBe(newDocument.type);
        expect(body.name).toEqual(newDocument.name);
      });
  });

  test("POST:400 responds with an appropriate status and error message when provided with a missing field (no bucketId field)", () => {
    const newDocument = {
      id: "9876543210fedcba",
      // bucketId: "fedcba9876543210",
      updatedAt: "2024-06-01T15:30:20.123+00:00",
      createdAt: "2024-06-01T14:00:00.000+00:00",
      type: "image/png",
      name: "sample-image-2.png"
    };
    return request(app)
      .post("/api/travel_documents")
      .send(newDocument)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("document_invalid_structure");
      });
  });

  test("POST:400 responds with an appropriate status and error message when provided with an invalid id is provided", () => {
    const newDocument = {
      id: 9876543210,
      bucketId: "fedcba9876543210",
      updatedAt: "2024-06-01T15:30:20.123+00:00",
      createdAt: "2024-06-01T14:00:00.000+00:00",
      type: "image/png",
      name: "sample-image-2.png"
    };
    return request(app)
      .post("/api/travel_documents")
      .send(newDocument)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid data type provided");
      });
  });
});


describe("DELETE:204 deletes the specified travel document and sends no body back", () => {
  test("204 - returns the ", () => {
    return request(app).delete("/api/travel_documents/0987654321fedcba").expect(204);
  });
  test("DELETE:404 responds with an appropriate status and error message when given a non-existent id", () => {
    return request(app)
      .delete("/api/travel_documents/999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("document_not_found");
      });
  });
});