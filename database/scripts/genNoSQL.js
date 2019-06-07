const fs = require('fs');
const path = require('path');
const faker = require('faker');
const images = require('../imageUrls');
const writer = require('../lib/writer');

const houseType = ['ENTIRE HOUSE', 'ENTIRE APARTMENT', 'PRIVATE ROOM', 'SHARED ROOM'];
const cities = ['San Francisco', 'New York City', 'Dallas', 'Nashville', 'Denver', 'Kansas City', 'Boston'];
const description = ['Cozy house in friendly neiborhood', 'Spacious apartment', 'Sunny, Modern room', 'Penthouse Studio', 'Perfect Weekender'];

function createListingData(withRelated, totalUsers, totalListings) {
  let listing = {};
  if (withRelated) {
    listing = `{
      "owner": ${createUserData()},
      "img": "${images.getImg()}",
      "house_type": "${houseType[Math.floor(Math.random() * houseType.length)]}",
      "description": "${description[Math.floor(Math.random() * description.length)]}",
      "location": "${cities[Math.floor(Math.random() * cities.length)]}",
      "cost_per_night": ${35 + (Math.random() * 7465)},
      "rating": ${(Math.random() * (5 - 0) + 0).toFixed(2)},
      "votes": ${Math.floor(Math.random() * 3500)},
      "related": [
        ${createListingData(false)},
        ${createListingData(false)},
        ${createListingData(false)},
        ${createListingData(false)},
        ${createListingData(false)},
        ${createListingData(false)}
      ],
      "reports": [
        ${createReportData(totalUsers, totalListings)},
        ${createReportData(totalUsers, totalListings)}
      ]
    }`
  } else {
    listing = `
    {
      "img": "${images.getImg()}",
      "house_type": "${houseType[Math.floor(Math.random() * houseType.length)]}",
      "location": "${cities[Math.floor(Math.random() * cities.length)]}",
      "description": "${description[Math.floor(Math.random() * description.length)]}",
      "cost_per_night": ${35 + (Math.random() * 7465)},
      "rating": ${(Math.random() * (5 - 0) + 0).toFixed(2)},
      "votes": ${Math.floor(Math.random() * 3500)},
    }`
  }
  return listing;
}

function createUserData() {
  return `{
    "firstname": "${faker.name.firstName().replace(/'/g, '')}",
    "lastname": "${faker.name.lastName().replace(/'/g, '')}",
    "email": "${faker.internet.email()}"
  }`
}

function createReportData(totalUsers, totalListings) {
  return `{
    "author": ${Math.ceil(Math.random() * totalUsers)},
    "listing": ${Math.ceil(Math.random() * totalListings)},
    "positive": ${!!Math.round(Math.random())},
    "report": "${faker.lorem.sentences()}",
    "created": "${faker.date.past(5)}"
  }`
}

const blobbyPath = path.resolve(__dirname, 'storage/nosql_listings_blobby.json');
writer.json(1e3, () => createListingData(true, 1e8, 1e7), blobbyPath);
