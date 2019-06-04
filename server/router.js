const compression = require('compression');
const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/models.js');

const createServer = (dbConnection) => {
  const app = express();

  app.use(compression());
  app.use(bodyParser.json());
  app.use(express.static(`${__dirname}/../public/dist`));

  // Get All Listings
  app.get('/RandomListings', (req, res) => {
    db.getRandomListings(dbConnection, (err, data) => {
      if (err) {
        res.status(500).send();
      } else {
        res.status(200).send(data);
      }
    });
  });

  // Add One Listing
  app.post('/Listing', (req, res) => {
    db.addOneListing(dbConnection, req.body, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(result);
      }
    });
  });

  // Get One Listing
  app.get('/Listing/:id', (req, res) => {
    db.getOneListing(dbConnection, req.params.id, (err, result) => {
      if (err) {
        res.status(500).send();
      } else {
        res.status(200).send(result);
      }
    });
  });

  // Delete One Listing
  app.delete('/Listing/:id', (req, res) => {
    db.deleteOneListing(dbConnection, req.params.id, (err, result) => {
      if (err) {
        res.status(500).send();
      } else {
        res.status(200).send(result);
      }
    });
  });

  return app;
};

module.exports = {
  createServer,
};
