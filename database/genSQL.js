const fs = require('fs');
const path = require('path');
const images = require('./imageURLs');
const writer = require('./lib/writer');

const houseType = ['ENTIRE HOUSE', 'ENTIRE APARTMENT', 'PRIVATE ROOM', 'SHARED ROOM'];
const cities = ['San Francisco', 'New York City', 'Dallas', 'Nashville', 'Denver', 'Kansas City', 'Boston'];
const description = ['Cozy house in friendly neiborhood', 'Spacious apartment', 'Sunny, Modern room', 'Penthouse Studio', 'Perfect Weekender'];

//  Header column
const headers = ['img', 'house_type', 'location', 'description', 'cost_per_night', 'rating', 'votes'];

//  Data for the listing table
function createListingData() {
  return `{${Math.ceil(Math.random() * 1e7)},"${houseType[Math.floor(Math.random() * houseType.length)]}","${cities[Math.floor(Math.random() * cities.length)]}","${description[Math.floor(Math.random() * description.length)]}",${35 + (Math.ceil(Math.random() * 7465))},${(Math.random() * (5 - 0) + 0).toFixed(2)},${Math.floor(Math.random() * 3500)}}`
}

//  Data for the related-ness table
function createRelationData() {
  return `{id_a: ${Math.ceil(Math.random() * 1e7)}, id_b: ${Math.ceil(Math.random() * 1e7)}}`;
}

//  Data for the photos table
function createPhotoData() {
  return `{img: ${images.getImg()}}`;
}

const listingPath = path.resolve(__dirname, 'storage/sql_listing_table');
const relationPath = path.resolve(__dirname, 'storage/sql_relations_table');
const photoPath = path.resolve(__dirname, 'storage/sql_photos_table');

// writer.csv(1e7, createListingData, listingPath);
// writer.csv(1e7, createRelationData, relationPath);
// writer.csv(1e7, createPhotoData, photoPath);
