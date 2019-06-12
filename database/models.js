const getRecommendedListings = (driver, id, callback) => {
  let query = 'MATCH (a:Listing {id: $id})-[:RECOMMENDS]->(b:Listing) RETURN b';
  const session = driver.session();
  // const result = session.run(query, { 'id': id });
  const result = session.run(query, { 'id': 909 });
  // const result = session.run(query, { 'id': Math.ceil(Math.random() * id) });
  result
    .then((result) => {
      callback(null, result.records);
      session.close();
    })
    .catch((err) => {
      callback(err);
      session.close();
    });
};

const getListingsByDescription = (driver, desc, callback) => {
  const query = 'SELECT * FROM listings WHERE ?';
  driver.query(query, desc, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};

const addManyListings = (driver, arr, callback) => {
  const query = 'INSERT INTO listings (img, house_type, location, description, cost_per_night, rating, votes) VALUES ?';
  driver.query(query, [arr], (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};

const addOneListing = (driver, fields, callback) => {
  const query = 'INSERT INTO listings (img, house_type, location, description, cost_per_night, rating, votes) VALUES (?)';
  driver.query(query, fields, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};

const updateOneListing = (driver, data, id, callback) => {
  const query = `UPDATE listings SET ? WHERE id = ${id}`;
  driver.query(query, data, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};

const getOneListing = (connection, id, callback) => {
  const query = 'SELECT * FROM listings WHERE id = ?';
  connection.query(query, id, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};

const deleteOneListing = (connection, id, callback) => {
  const query = 'DELETE FROM listings WHERE id = ?';
  connection.query(query, id, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};

module.exports = {
  addManyListings,
  addOneListing,
  updateOneListing,
  getRecommendedListings,
  getOneListing,
  getListingsByDescription,
  deleteOneListing,
};
