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
- Successful requests (other than GET) will return a RowDataPacket

#### CREATE

POST `/Listing`
- This route expects an object with the following structure:
{\s\s
    "img": **_URL_**,\s\s
    "house_type": **_string_**,\s\s
    "location": **_string_**,\s\s
    "description": **_string_**,\s\s
    "cost_per_night": **_integer_**,\s\s
    "rating": **_numeric_**,\s\s
    "votes": **_integer_**\s\s
}\s\s

#### READ
- Successful requests will return an array of objects 
with the following structure:
{\s\s
    "id": **-integer_**,\s\s
    "img": **_URL_**,\s\s
    "house_type": **_string_**
    "location": **_string_**,\s\s
    "description": **_string_**,\s\s
    "cost_per_night": **_integer_**,\s\s
    "rating": **_numeric_**,\s\s
    "votes": **_integer_**\s\s
}

GET `/RandomListings`
- Does not require a query parameter or body
- Will return max 25 objects

GET `/ListingsByDesc`
- Requires a body of the following shape:
{\s\s
    "description": **_string__**\s\s
}

#### UPDATE

PATCH `/Listing/:id`
- Expects:
  1) An id query parameter, and
  2) A body containing any or all of the POST object properties.

#### DELETE

DELETE `/Listing/:id`
- This route expects an id as a query parameter

### Database Schema

TABLE listings (\s\s
    id                INT AUTO_INCREMENT,\s\s
    img               VARCHAR(250),\s\s
    house_type        VARCHAR(25),\s\s
    location          VARCHAR(100),\s\s
    description       VARCHAR(100),\s\s
    cost_per_night    INT NOT NULL,\s\s
    rating            DECIMAL(5,2),\s\s
    votes             INT NOT NULL,\s\s
    PRIMARY KEY(id)\s\s
);
