const fs = require('fs');
const path = require('path');
const faker = require('faker');
const images = require('../imageURLs');
const writer = require('../lib/writer');

const houseType = ['ENTIRE HOUSE', 'ENTIRE APARTMENT', 'PRIVATE ROOM', 'SHARED ROOM'];
const cities = ['San Francisco', 'New York City', 'Dallas', 'Nashville', 'Denver', 'Kansas City', 'Boston'];
const description = ['Cozy house in friendly neighborhood', 'Spacious apartment', 'Sunny, Modern room', 'Penthouse Studio', 'Perfect Weekender'];

//  Data for the listing table
const listingHeader = 'owner,img,house_type,location,description,cost_per_night,rating,votes';
function createListingData(totalUsers) {
  return `${Math.ceil(Math.random() * totalUsers)},${Math.ceil(Math.random() * 1e7)},"${houseType[Math.floor(Math.random() * houseType.length)]}","${cities[Math.floor(Math.random() * cities.length)]}","${description[Math.floor(Math.random() * description.length)]}",${35 + (Math.ceil(Math.random() * 7465))},${(Math.random() * (5 - 0) + 0).toFixed(2)},${Math.floor(Math.random() * 3500)}`
}

//  Data for the related-ness table
const relationHeader = 'id_a,id_b';
function createRelationData(totalListings) {
  return `id_a:${Math.ceil(Math.random() * totalListings)},id_b:${Math.ceil(Math.random() * totalListings)}`;
}

//  Data for the photos table
const photoHeader = 'img';
function createPhotoData() {
  return `${images.getImg()}`;
}

//  Data for the Users table
const userHeader = 'firstname,lastname,email';
function createUserData() {
  return `"${faker.name.firstName().replace(/'/g, '')}","${faker.name.lastName().replace(/'/g, '')}","${faker.internet.email()}"`;
}

//  Data for the Reports table
const reportHeader = 'author,listing,positive,report,created';
function createReportData(totalUsers, totalListings) {
  return `${Math.ceil(Math.random() * totalListings)},${Math.ceil(Math.random() * totalUsers)},${!!Math.round(Math.random())},"${faker.lorem.sentences()}","${faker.date.past(5)}"`;
}

//  Paths to data storage
const listingPath = path.resolve(__dirname, '../storage/sql_listings.csv');
const relationPath = path.resolve(__dirname, '../storage/sql_listing_relations.csv');
const photoPath = path.resolve(__dirname, '../storage/sql_photos.csv');
const userPath = path.resolve(__dirname, '../storage/sql_users.sql');
const reportPath = path.resolve(__dirname, '../storage/sql_reports.csv');


// Write all data
const totalListings = 1e2;
const totalUsers = 1e3;
// writer.csv(totalListings, () => createListingData(totalListings), listingPath, listingHeader);
// writer.csv(1e3, () => createRelationData(totalListings), relationPath, relationHeader);
// writer.csv(1e3, createPhotoData, photoPath, photoHeader);
// writer.sql(totalUsers, createUserData, userPath, 'users');
writer.csv(1e1, () => createReportData(totalListings, totalUsers), reportPath, reportHeader);
