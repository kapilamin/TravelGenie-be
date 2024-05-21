const {
  client,
  account,
  databases,
  ID,
  Permission,
  Role,
  OAuthProvider,
  AppwriteException,
  users,
} = require("./db/appwrite");

const documentId = "664b263e003a910f02b3";
const collectionId = "664b04a2000e37a4e0f7";
const databaseId = "664b0461000136d40330";

// LISTING DOCUMENTS
function documentListed(databaseId, collectionId) {
  databases
    .listDocuments(databaseId, collectionId)
    .then((response) => {
      console.log("Document listed successfully!");
      console.log(response);
    })
    .catch((error) => {
      console.error("Error listing document:", error);
    });
}

//CREATING A DOCUMENT
function documentCreated(databaseId, collectionId) {
  databases
    .createDocument(
      databaseId,
      collectionId,
      ID.unique(),
      {
        userId: "user124",
        username: "Kapil",
        email: "anyone@gmail.com",
        password: "password",
      },
      [Permission.read(Role.any())]
    )
    .then((response) => {
      console.log("Document created successfully!");
      console.log(response);
    })
    .catch((error) => {
      console.error("Error creating document:", error);
    });
}

//GETTING A SPECIFIC DOCUMENT
//order of arrangement of ids matters
function getSpecificDocument(databaseId, collectionId, documentId) {
  databases
    .getDocument(databaseId, collectionId, documentId)
    .then((response) => {
      console.log("Document fetched successfully!");
      console.log(response);
    })
    .catch((error) => {
      console.error("Error fetching document:", error);
    });
}

// //UPDATING A DOCUMENT
const updatesObj = {
  username: "Amin",
  userId: "user223",
  email: "Berlin@gmail.com",
  password: "password123",
};
function specificDocumentUpdate(
  databaseId,
  collectionId,
  documentId,
  updatesObj
) {
  databases
    .updateDocument(databaseId, collectionId, documentId, updatesObj)
    .then((response) => {
      console.log("Document updated successfully!");
      console.log(response);
    })
    .catch((error) => {
      console.error("Error updating document:", error);
    });
}

//DELETEING A DOCUMENT
const documentDeleteId = "664b0d8b001a9166abbe"; //change when running this function again.
function deletingSpecificDocument(databaseId, collectionId, documentId) {
  databases
    .deleteDocument(databaseId, collectionId, documentId)
    .then((response) => {
      console.log("Document deleted successfully!");
      console.log(response);
    })
    .catch((error) => {
      console.error("Error deleting document:", error);
    });
}

//-------------------OAuth2Authentication-----------------//
const provider = "google";
const success = "http://localhost:5174/";
const failure = "http://localhost:5174/t";
const scopes = ["profile", "email", "account", "role"];
function OAuth2Authenticated(provider, successURL, failureURL, scopesArr) {
  return account.createOAuth2Session(
    OAuthProvider.Google, // provider
    successURL, // redirect here on success
    failureURL, // redirect here on failure
    scopesArr // scopes (optional)
  );
}

// Getting OAuth2 Session
//-------------------Users-----------------//

// documentListed(databaseId, collectionId);
// documentCreated(databaseId, collectionId);
// getSpecificDocument(databaseId, collectionId, documentId);
// specificDocumentUpdate(databaseId, collectionId, documentId, updatesObj);
// deletingSpecificDocument(databaseId, collectionId, documentDeleteId);
