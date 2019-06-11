const sqlite = require('sqlite3');
// const neo4j = require('neo4j-driver');
const path = require('path');

// ## SQLite3

module.exports.sqlite = new sqlite.Database(path.resolve(__dirname, '../storage/more_listings.db'), (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to SQLite database');
  }
});

// ### Neo4j

// const driver = neo4j.driver(uri, neo4j.auth.basic.user(password));
// const session = driver.session();
