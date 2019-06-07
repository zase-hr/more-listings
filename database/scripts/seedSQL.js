const fs = require('fs');
const path = require('path');
const sqlite = require('sqlite3');
const csv = require('csv');

//  read stream from csv of data
const file = fs.createReadStream(path.resolve(__dirname, '../storage/sql_listings_table'));

//  insert stream into sqlite db as it is parsed