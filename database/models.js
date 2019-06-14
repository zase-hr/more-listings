const getRecommendedListings = (driver, id, callback) => {
  let query = `MATCH (a:Listing {id: ${id}})-[:RECOMMENDS]->(b:Listing) RETURN b`;
  const session = driver.session();
  const result = session.run(query);
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

// TODO: Re-seed listings with proper description / location
//      For now... maybe just ask with location...
const getListingsByDescription = (driver, desc, callback) => {
  const query = `MATCH (a:Listing { location: ${desc}}) RETURN a LIMIT 25`;
  const session = driver.session();
  // const result = session.run(query, { location: desc });
  const result = session.run(query);
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
  const query = 'CREATE (l:Listing { user_profile: $user, house_type: $type, location: $location, description: $description, cost_per_night: $cost, rating: $rating, votes: $votes, photo: $photo }) RETURN l';
  const session = driver.session();
  const result = session.run(query, fields);
  result
    .then(data => {
      callback(null, data);
      session.close();
    })
    .catch(err => {
      callback(err);
      session.close();
    });
};

const updateOneListing = (driver, data, id, callback) => {
  const query = `UPDATE listings SET ? WHERE id = ${id}`;
  driver.query(query, data, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result.records);
    }
  });
};

const getOneListing = (driver, id, callback) => {
  let query = `MATCH (l:Listing {id: ${id}}) RETURN l`;
  let session = driver.session();
  let result = session.run(query);
  result
    .then(data => {
      callback(null, data.records[0]._fields[0].properties);
      session.close();
    })
    .catch(err => {
      callback(err);
      session.close();
    });
};

const deleteOneListing = (session, id, callback) => {
  const query = 'DELETE FROM listings WHERE id = ?';
  session.query(query, id, (err, result) => {
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
