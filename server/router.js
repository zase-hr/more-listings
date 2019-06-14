require('../node_modules/newrelic/index');
// const compression = require('compression');
const express = require('express');
const bodyParser = require('body-parser');
const neo4jDriver = require('../database/connect');
const db = require('../database/models.js');

const app = express();

// app.use(compression());
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/../public/dist`));

// Get Recommended Listings
app.get('/:id/RecommendedListings', (req, res) => {
  db.getRecommendedListings(neo4jDriver, req.params.id, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

module.exports = {
  app
};
