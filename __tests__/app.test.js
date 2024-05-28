const app = require("../app");
const request = require("supertest");
const { clearAndSeed } = require("../db/seed");
const endpoints = require("../endpoints.json");

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
          expect(typeof booking.$id).toBe("string");
          expect(typeof booking.selectedInboundFlight).toBe("string");
          expect(typeof booking.selectedOutboundFlight).toBe("string");
          expect(typeof booking.selectedHotel).toBe("string");
          expect(typeof booking.departDate).toBe("string");
          expect(typeof booking.returnDate).toBe("string");
          expect(Array.isArray(booking.details)).toBe(true);
          expect(Array.isArray(booking.selectedExcursions)).toBe(true);
        });
      });
  });
});

describe("GET /api/bookings/:booking_id", () => {
  test("GET status:200, Should get all bookings with the corrrect data", () => {
    return request(app)
      .get("/api/bookings/664b11a7003b76702fe80")
      .expect(200)
      .then(({ body }) => {
        expect(typeof body.$id).toBe("string");
        expect(typeof body.selectedInboundFlight).toBe("string");
        expect(typeof body.selectedOutboundFlight).toBe("string");
        expect(typeof body.selectedHotel).toBe("string");
        expect(typeof body.departDate).toBe("string");
        expect(typeof body.returnDate).toBe("string");
        expect(Array.isArray(body.details)).toBe(true);
        expect(Array.isArray(body.selectedExcursions)).toBe(true);
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
          expect(typeof user.$id).toBe("string");
          expect(typeof user.username).toBe("string");
          expect(typeof user.email).toBe("string");
          expect(Array.isArray(user.flights)).toBe(true);
        });
      });
  });
});

describe("GET /api/users/:user_id", () => {
  test("GET status:200, Should get user with the corrrect data", () => {
    return request(app)
      .get("/api/users/664b04a2000e37a4e0f71")
      .expect(200)
      .then(({ body }) => {
        expect(typeof body.$id).toBe("string");
        expect(typeof body.username).toBe("string");
        expect(typeof body.email).toBe("string");
        expect(Array.isArray(body.flights)).toBe(true);
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
    };
    return request(app)
      .patch("/api/users/664b04a2000e37a4e0f72")
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

      address: "CM7777777777777",
    };
    return request(app)
      .patch("/api/users/664b04a2000e37a4e0f71")
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

describe("POST:/api/users/", () => {
  test("POST 201 returns the posted item", () => {
    const newUser = {
      username: "johnsmith",
      email: "johnsmith@example.com",
      password: "hashed_password2",
    };
    return request(app)
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .then(({ body }) => {
        expect(body.username).toBe(newUser.username);
        expect(body.email).toEqual(newUser.email);
      });
  });

  test("POST:400 responds with an appropriate status and error message when provided with a missing required field (email)", () => {
    const newUser = {
      username: "johnsmith",

      password: "hashed_password2",
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
      username: "johnsmith",
      email: "",
      password: "hashed_password2",
    };
    return request(app)
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("document_invalid_structure");
      });
  });
});

describe("POST:/api/bookings/", () => {
  test("POST 201 returns the posted item", () => {
    const newBooking = {
      details: ["Seat preference: window", "No special meal requests"],

      travelDocuments: ["passport", "travel insurance"],
      selectedInboundFlight: "MN5678",
      selectedOutboundFlight: "OP9101",
      selectedHotel: "City Central Hotel",
      selectedExcursions: ["River cruise", "Historical tour"],
      departDate: "2024-09-10T06:50:00",
      returnDate: "2024-09-20T21:30:00",
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
      itineraryId: "itinerary456",
      details: ["Booking details here..."],
    };
    return request(app)
      .post("/api/bookings")
      .send(newBooking)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("document_invalid_structure");
      });
  });
});

describe("DELETE:204 deletes the specified user and sends no body back", () => {
  test("204 - returns the ", () => {
    return request(app).delete("/api/users/664b04a2000e37a4e0f71").expect(204);
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

describe("GET /api/travel_documents/:document_id", () => {
  test("GET status:200, Should get the travel document with the corrrect data", () => {
    return request(app)
      .get("/api/travel_documents/66508d73001f11fd10c31")
      .expect(200)
      .then(({ body }) => {
        expect(typeof body.$id).toBe("string");
        expect(typeof body.bucketId).toBe("string");
        expect(typeof body.type).toBe("string");
        expect(typeof body.name).toBe("string");
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
      bucketId: "fedcba9876543210",
      documentId: "fedcba9876543210",

      type: "image/png",
      name: "sample-image-2.png",
    };

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
      documentId: "9876543210fedcba",

      type: "image/png",
      name: "sample-image-2.png",
    };
    return request(app)
      .post("/api/travel_documents")
      .send(newDocument)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("document_invalid_structure");
      });
  });
});

describe("DELETE:204 deletes the specified travel document and sends no body back", () => {
  test("204 - returns the ", () => {
    return request(app)
      .delete("/api/travel_documents/66508d73001f11fd10c30")
      .expect(204);
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
