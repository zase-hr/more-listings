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

module.exports = {
  getRecommendedListings
};
