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
{  
    "img": **_URL_**,  
    "house_type": **_string_**,  
    "location": **_string_**,  
    "description": **_string_**,  
    "cost_per_night": **_integer_**,  
    "rating": **_numeric_**,  
    "votes": **_integer_**  
}  

#### READ
- Successful requests will return an array of objects 
with the following structure:
{  
&nbsp;&nbsp;"id": **-integer_**,  
&nbsp;&nbsp;"img": **_URL_**,  
&nbsp;&nbsp;"house_type": **_string_**
&nbsp;&nbsp;"location": **_string_**,  
&nbsp;&nbsp;"description": **_string_**,  
&nbsp;&nbsp;"cost_per_night": **_integer_**,  
&nbsp;&nbsp;"rating": **_numeric_**,  
&nbsp;&nbsp;"votes": **_integer_**  
}

GET `/RandomListings`
- Does not require a query parameter or body
- Will return max 25 objects

GET `/ListingsByDesc`
- Requires a body of the following shape:
{  
  "description": **_string__**  
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

TABLE listings (  
&nbsp;&nbsp;id                INT AUTO_INCREMENT,  
&nbsp;&nbsp;img               VARCHAR(250),  
&nbsp;&nbsp;house_type        VARCHAR(25),  
&nbsp;&nbsp;location          VARCHAR(100),  
&nbsp;&nbsp;description       VARCHAR(100),  
&nbsp;&nbsp;cost_per_night    INT NOT NULL,  
&nbsp;&nbsp;rating            DECIMAL(5,2),  
&nbsp;&nbsp;votes             INT NOT NULL,  
&nbsp;&nbsp;PRIMARY KEY(id)  
);
