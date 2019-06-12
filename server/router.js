const compression = require('compression');
const express = require('express');
const bodyParser = require('body-parser');
const neo4jDriver = require('../database/connect');
const db = require('../database/models.js');

const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/../public/dist`));

// Get Recommended Listings
app.get('/RecommendedListings', (req, res) => {
  db.getRecommendedListings(neo4jDriver, id, (err, data) => {
    if (err) {
      res.status(500).send();
    } else {
      res.status(200).send(data);
    }
  });
});

// Get Listings by Description
app.get('/ListingsByDesc', (req, res) => {
  db.getListingsByDescription(neo4jDriver, req.body, (err, data) => {
    if (err) {
      res.status(500).send();
    } else {
      res.status(200).send(data);
    }
  });
});

// Add One Listing
app.post('/Listing', (req, res) => {
  db.addOneListing(neo4jDriver, req.body, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

// Get One Listing
app.get('/Listing/:id', (req, res) => {
  db.getOneListing(neo4jDriver, req.params.id, (err, result) => {
    if (err) {
      res.status(500).send();
    } else {
      res.status(200).send(result);
    }
  });
});

// Update One Listing
app.patch('/Listing/:id', (req, res) => {
  db.updateOneListing(neo4jDriver, req.body, req.params.id, (err, result) => {
    if (err) {
      res.status(500).send();
    } else {
      res.status(200).send(result);
    }
  });
});

// Delete One Listing
app.delete('/Listing/:id', (req, res) => {
  db.deleteOneListing(neo4jDriver, req.params.id, (err, result) => {
    if (err) {
      res.status(500).send();
    } else {
      res.status(200).send(result);
    }
  });
});

module.exports = {
  app
};
