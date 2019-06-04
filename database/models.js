const getRandomListings = (connection, callback) => {
  const query = 'SELECT * FROM listings ORDER BY RAND() LIMIT 12';
  connection.query(query, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};

const addManyListings = (connection, arr, callback) => {
  const query = 'INSERT INTO listings (img, house_type, location, description, cost_per_night, rating, votes) VALUES ?';
  connection.query(query, [arr], (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};

const updateOneListing = (connection, args, callback) => {
  const query = '';
  connection.query(query, args, (err, result) => {

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
  getRandomListings,
  getOneListing,
  deleteOneListing,
};
