// ### Generate Data For SQL or other applications ### //
// ## HOWTO:
//  Specify filepaths, not including filetype extensions, for where you want
//    your data to be written to
//  In 'generate', specify the writer tool (csv, json, or sql) you wish to
//    have your generated data created as

const fs = require('fs');
const path = require('path');
const faker = require('faker');
const images = require('../imageURLs');
const writer = require('../lib/writer');

const houseType = ['ENTIRE HOUSE', 'ENTIRE APARTMENT', 'PRIVATE ROOM', 'SHARED ROOM'];
const cities = ['San Francisco', 'New York City', 'Dallas', 'Nashville', 'Denver', 'Kansas City', 'Boston'];
const description = ['Cozy house in friendly neighborhood', 'Spacious apartment', 'Sunny, Modern room', 'Penthouse Studio', 'Perfect Weekender'];

//  Data for the listing table
const listingHeader = 'user_profile,house_type,location,description,cost_per_night,rating,votes';
function createListingData(totalUsers) {
  return `${Math.ceil(Math.random() * totalUsers)},"${houseType[Math.floor(Math.random() * houseType.length)]}","${cities[Math.floor(Math.random() * cities.length)]}","${description[Math.floor(Math.random() * description.length)]}",${35 + (Math.ceil(Math.random() * 7465))},${(Math.random() * (5 - 0) + 0).toFixed(2)},${Math.floor(Math.random() * 3500)}`
}

//  Data for the listing relations table
const relationHeader = 'listing_a,listing_b';
function createRelationData(index, totalListings) {
  //  create 6 relations for listing index
  let relations = '';
  let relation = 0;
  for (let i = 0; i < 6; i++) {
    relation = Math.ceil(Math.random() * totalListings);
    relation === (index + 1) ? relation += 1 : null;
    if (i === 5) {
      relations += `${index + 1},${relation}`;
    } else {
      relations += `${index + 1},${relation}\n`;
    }
  }
  return relations;
}

//  Data for the photos table
const photoHeader = 'photo_url, listing';
function createPhotoData(totalListings) {
  return `"${images.getImg()}",${Math.ceil(Math.random() * totalListings)}`;
}

//  Data for the Users table
const userHeader = 'firstname,lastname,email';
function createUserData() {
  return `"${faker.name.firstName().replace(/'/g, '')}","${faker.name.lastName().replace(/'/g, '')}","${faker.internet.email()}"`;
}

//  Data for the Reports table
const reportHeader = 'listing,user_profile,positive,report,created';
function createReportData(totalUsers, totalListings) {
  return `${Math.ceil(Math.random() * totalListings)},${Math.ceil(Math.random() * totalUsers)},${!!Math.round(Math.random())},"${faker.lorem.sentences()}","${faker.date.past(5)}"`;
}

//  Paths to data storage (no extension)
const listingPath = path.resolve(__dirname, '../storage/listing_table');
const relationPath = path.resolve(__dirname, '../storage/listing_relation_table');
const photoPath = path.resolve(__dirname, '../storage/photo_table');
const userPath = path.resolve(__dirname, '../storage/user_profile_table');
const reportPath = path.resolve(__dirname, '../storage/report_table');

// Write all data

//  'primary' should be equal to the primary record total
module.exports.generate = function(primary = 1e3, moreCommon = 5e3, lessCommon = 1e2) {
  writer.csv(primary, () => createListingData(moreCommon), listingPath);
  writer.csv(primary, (index) => createRelationData(index, primary), relationPath);
  writer.sql(moreCommon, () => createPhotoData(primary), photoPath, 'photo');
  writer.sql(moreCommon, createUserData, userPath, 'user_profile');
  writer.csv(lessCommon, () => createReportData(primary, moreCommon), reportPath);
};

// module.exports.generate();
module.exports.generate(1e7, 5e7, 1e5);
