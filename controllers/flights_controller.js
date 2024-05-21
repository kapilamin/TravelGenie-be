const { fetchFlights } = require("../models/flights_model")

function getFlights (req, res) {
    fetchFlights()
    .then((flights) => {
        console.log(flights);
        res.status(200).send(flights)
    })
    .catch((error) => {
        return error;
    })
}

module.exports = { getFlights }