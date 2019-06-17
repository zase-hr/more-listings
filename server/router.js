require('../node_modules/newrelic/index');
const express = require('express');
const path = require('path');
const compression = require('compression');
const db = require('../database/models.js');
const loaderio = require('../loaderio.txt');

const app = express();
app.use(compression());
app.use(express.static(`${__dirname}/../public/dist`));

app.use('/loaderio-3747473d2180c64421e92a770eb55e32', express.static(path.resolve(__dirname, '../loaderio/')));

// Get Recommended Listings
app.get('/MoreHomes', db.getRecommendedListings);

module.exports = {
  app
};
