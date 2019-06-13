const sqlite = require('sqlite3');
const path = require('path');

module.exports = new sqlite.Database(path.resolve(__dirname, '../storage/more_listings.db'), (err, response) => {
  if (err) {
    console.log(err);
  } else {
    console.log(response);
  }
});
