/* eslint-disable no-console */
const faker = require('faker');
const img = require('./images.js');
// const img = require('./localimg.js');
const db = require('./models.js');
const dbConnection = require('./conn.js');

function createListingData() {
  const result = [];
  const houseType = ['ENTIRE HOUSE', 'ENTIRE APARTMENT', 'PRIVATE ROOM', 'SHARED ROOM'];
  const description = ['Cozy house in friendly neiborhood', 'Spacious apartment', 'Sunny, Modern room', 'Penthouse Studio', 'Perfect Weekender'];
  for (let i = 0; i < 100; i += 1) {
    const obj = [
      img.getImg(),
      houseType[Math.floor(Math.random() * houseType.length)],
      faker.address.city(),
      description[Math.floor(Math.random() * description.length)],
      faker.random.number({ min: 35, max: 7500 }),
      (Math.random() * (5 - 0) + 0).toFixed(2),
      faker.random.number({ min: 0, max: 3500 }),
    ];
    if (obj[5] === 0) {
      obj[6] = 0;
    }
    result.push(obj);
  }
  return result;
}

const data = createListingData();

db.addManyListings(dbConnection, data, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Data created');
  }
  dbConnection.end();
});
