const {databases} = require('../appwrite')
console.log(databases);

// LISTING DOCUMENTS
function fetchFlights () {
    const collectionId = '664b116d00364096c872';
    const databaseId = '664b0461000136d40330';
    databases
    .listDocuments(databaseId, collectionId)
    .then((response) => {

      console.log('Document listed successfully!');
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.error('Error listing document:', error);
      return error;
    });
}

module.exports = {fetchFlights}
