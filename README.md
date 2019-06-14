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
**Neo4j**
- 

## API
- Successful requests (other than GET) will return a RowDataPacket

#### READ
- Successful requests will return an array of objects with the following structure:  
{  
&nbsp;&nbsp;"id": **_integer_**,  
&nbsp;&nbsp;"img": **_URL_**,  
&nbsp;&nbsp;"house_type": **_string_**
&nbsp;&nbsp;"location": **_string_**,  
&nbsp;&nbsp;"description": **_string_**,  
&nbsp;&nbsp;"cost_per_night": **_integer_**,  
&nbsp;&nbsp;"rating": **_numeric_**,  
&nbsp;&nbsp;"votes": **_integer_**  
}

GET `/:id/RecommendedListings`
- Will return 6 listings that the identified listing recommends

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
