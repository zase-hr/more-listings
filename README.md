# More Listings
This module displays additional listings each with a photo and
some basic information, viewed on a carousel.

## Usage

### Install Dependencies
- `npm install`

### Development
Bundle the client source
- `npm run react-dev`
Start the server
- `npm run start`

### Deployment
#### Docker
- install and start the Docker service on the host machine
- `docker-compose up`

### Seeding the Database
**MySQL**
Create a database on your host
- mysql -u root -p < schema.sql
Create a dbconfig file
- Copy dockerDbConfig.js to /db/dbconfig.js
- Alter the host, user, and password to reflect your own
Seed the database
- npm run seed

## API

GET `/RandomListings`
- Successful requests to this route will return an array of 25 objects 
with the following structure:
```
{
  "id": 5,
  "img": "https://s3-us-west-1.amazonaws.com/homes-pic/22.jpg",
  "house_type": "ENTIRE HOUSE",
  "location": "Claudieborough",
  "description": "Sunny, Modern room",
  "cost_per_night": 5300,
  "rating": 4.11,
  "votes": 413
}
```

POST `/Listing`
- This route expects an object with the following structure:
{
  "img": **_string_**,
  "house_type": **_string_**,
  "location": **_string_**,
  "description": **_string_**,
  "cost_per_night": **_integer_**,
  "rating": **_numeric_**,
  "votes": **_integer_**
}
- If successful, will return a RowDataPacket

PATCH `/Listing/:id`
- Expects a request body with:
  1) An id query parameter, and
  2) Any or all of the POST object properties.

DELETE `/Listing/:id`
- This route expects an id as a query parameter
- Successful requests will return a RowDataPacket