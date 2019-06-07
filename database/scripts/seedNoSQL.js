const fs = require('fs');
const path = require('path');

//  read the contents of a json file
const file = fs.createReadStream(path.resolve(__dirname, 'listing_data_nosql_blobby'));

//  with each json element between commas, initiate an insert query
