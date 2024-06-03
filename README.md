# TravelGenie Backend

## Northcoders Software Development Final Project

Welcome to the backend of TravelGenie! This repository houses the server-side code that powers our Travel Planning App. Built with Appwrite, Express, and Node.js, our backend manages user data storage, and booking management to provide seamless travel planning experiences.



For an overview of our app, please refer to the [frontend repository](https://github.com/kapilamin/TravelGenie-fe).

## Features
- **User Data Storage:** Our backend saves user information, including travel preferences, itinerary details, and booking information, to the Appwrite database.
- **Booking Management:** We manage bookings, ensuring smooth communication between our app and Amadeus services for flight, hotel, and excursion reservations.
## API Endpoints
- **POST /api/users** - Create a new user and save their data to the database.
- **GET /api/users/:user_id** - Retrieve user data by user ID.
- **DELETE /api/users/:user_id** - Delete user data by user ID.
- **POST /api/bookings** - Create a new booking and save it to the database.
- **GET /api/bookings/:booking_id** - Retrieve a booking by booking ID.
- **POST /api/travel_documents** - Create a new travel document.
- **GET /api/travel_documents/:document_id** - Retrieve a travel document by document ID.
- **DELETE /api/travel_documents/:document_id** - Delete a travel document by document ID.
## Set up
Below are instructions on how to run our app locally. 

1. **Clone the Repository:** Clone this repository to your local machine using `git clone`.
2. **Install Dependencies:** Navigate to the project directory and install dependencies by running `npm install`.
3. **Set Up Appwrite:** Instructions can be found in the [Appwrite docs](https://appwrite.io/docs) to set up your database. Make sure you have configured your Appwrite instance correctly and have your project ID and endpoint URL ready.
4. **Create Environment Variables:** Create a `.env.development` file in the root directory of the project and add the following variables:

    ```

    APPWRITE_ENDPOINT= ...

    APPWRITE_PROJECT_ID= ...

    APPWRITE_API_KEY= ...

    DATABASE_ID= ...

    ACTIVITIES_COLLECTION_ID= ...

    ITINERARIES_COLLECTION_ID= ...

    TRAVEL_DETAILS_COLLECTION_ID= ...

    ACCOMMODATIONS_COLLECTION_ID= ...

    BOOKINGS_COLLECTION_ID= ...

    FLIGHTS_COLLECTION_ID= ...

    USERS_COLLECTION_ID= ...

    TRAVEL_DOCUMENTS_COLLECTION_ID= ...

    ```
5. **Host on Render:** Follow these [instructions](https://docs.render.com/web-services). The environment variables should be set as above including `NODE_ENV` as `production`.
6. **Set Up Frontend:** Once the server on Render is running correctly, refer to the [Frontend instructions](https://github.com/kapilamin/TravelGenie-fe).
## Contributors
- Kapil Amin [@kapilamin](https://github.com/kapilamin)
- Luke Di Bartolomeo [@LukeDiB](https://github.com/LukeDiB)
- Andrew Lowes [@drewfullstack](https://github.com/drewfullstack)
- Ziyardee Alhassan [@Ziyardeen](https://github.com/Ziyardeen)   
## Feedback
We welcome feedback to enhance TravelGenie. If you encounter issues or have suggestions for new features, feel free to open an issue.

We hope you enjoy! ✈️🌍 