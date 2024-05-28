const {
  Client,
  Databases,
  ID,
  Account,
  Permission,
  Role,
  OAuthProvider,
  AppwriteException,
  Users,
  Query,
} = require("node-appwrite");

const dotenv = require("dotenv");

if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: ".env.production" });
} else {
  dotenv.config({ path: ".env.test" });
}

const client = new Client();

const endpoint = process.env.APPWRITE_ENDPOINT;
const projectId = process.env.APPWRITE_PROJECT_ID;
const apiKey = process.env.APPWRITE_API_KEY;
const database_id = process.env.DATABASE_ID;
const activities_collection_id = process.env.ACTIVITIES_COLLECTION_ID;
const itineraries_collection_id = process.env.ITINERARIES_COLLECTION_ID;
const travel_details_collection_id = process.env.TRAVEL_DETAILS_COLLECTION_ID;
const accommodations_collection_id = process.env.ACCOMMODATIONS_COLLECTION_ID;
const bookings_collection_id = process.env.BOOKINGS_COLLECTION_ID;
const flights_collection_id = process.env.FLIGHTS_COLLECTION_ID;
const users_collection_id = process.env.USERS_COLLECTION_ID;
const travel_documents_collection_id =
  process.env.TRAVEL_DOCUMENTS_COLLECTION_ID;

client.setEndpoint(endpoint).setProject(projectId).setKey(apiKey);

const account = new Account(client);
const databases = new Databases(client);
const users = new Users(client);
module.exports = {
  client,
  account,
  databases,
  ID,
  Permission,
  Role,
  OAuthProvider,
  AppwriteException,
  users,
  Query,
  database_id,
  activities_collection_id,
  itineraries_collection_id,
  travel_details_collection_id,
  accommodations_collection_id,
  bookings_collection_id,
  flights_collection_id,
  users_collection_id,
  travel_documents_collection_id,
};
