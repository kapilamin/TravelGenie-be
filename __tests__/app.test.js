const { afterEach } = require("node:test");
const app = require("../app");
const {
  addCollections,
  clearCollections,
  clear_and_seed,
} = require("../db/seed");
const request = require("supertest");

beforeEach(async () => {
  await clear_and_seed();
});

describe("GET Bad URLs", () => {
  test("404- test for bad URL", () => {});
});

// describe("/api/healthcheck: HealthCheck to confirm connection with sever", () => {
//   describe("/api/healthcheck", () => {
//     test("200 - returns a status of 200 ", () =>
//       request(app).get("/api/healthcheck").expect(200));
//   });
// });
