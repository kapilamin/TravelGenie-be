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
} = require("node-appwrite");

const client = new Client();

const endpoint = "https://cloud.appwrite.io/v1";
const projectId = "664b025500172e0cc60b";

client
  .setEndpoint(endpoint) // Your Appwrite endpoint
  .setProject(projectId)
  .setKey(
    "6dcde85fd567c6e1e753894740c363c91b242d6f83f86fcba8a88565640defce1a1911d7d3633688e1cc035e9042f1c20d27ac2c9d5ea0f77e8c32937958f3d5e0d13a2e35f699426badca869fd96c239623103ad23c390776b25f18faddb015f8ce94668083f0f282d95ac43379b34f69d314272d836237f13fab3c510df54ef"
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
};
