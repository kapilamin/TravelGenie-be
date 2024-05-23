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

const client = new Client();

const endpoint = "https://cloud.appwrite.io/v1";
const projectId = "664df6f100233cf21d78";

client
  .setEndpoint(endpoint) // Your Appwrite endpoint
  .setProject(projectId)
  .setKey(
    "f6bb6604a8f8efbee3c139b5a13e34c62dd6bf57fdb34a3872e3764ebe2eeb19e39bd23a073dc9b1ddec211b39c5dd8d842e12070a5f592d65b877b29fe1afca906b1aa672c32cfdbf006f54fd765b74b56b24c5c1c321370caf18127a581b24e09c983ee5467ebc929b5ee97ff1bfbe992c9b9ad84979b7ffd875121b33c174"
  );

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
};
