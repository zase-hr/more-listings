# More Listings
This module displays additional listings each with a photo and
some basic information, viewed on a carousel.

## Usage

### Install Dependencies
- `npm install`

### Development
Create a dbconfig file
- Copy dockerDbConfig.js to /db/dbconfig.js
- Alter the host, user, and password to reflect your own
Bundle the client source
- `npm run react-dev`
Start the server
- `npm run start`

### Deployment
#### Docker
- install and start the Docker service on the host machine
- `docker-compose up`

### Seeding the Database
- This service uses MySQL
Create a database on your host
- mysql -u root -p < schema.sql
Seed it
- npm run seed

## API

GET `/MoreHomes`
- Successful requests to this route will return an array of objects 
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

