const driver = require('./connect');

const getRecommendedListings = (req, res) => {
  let query = `MATCH (a:Listing {id: ${req.params.id}})-[:RECOMMENDS]->(b:Listing) RETURN b`;
  const session = driver.session();
  session.run(query)
    .then((result) => {
      session.close();
      res.status(200).send(result.records);
    })
    .catch((err) => {
      session.close();
      res.status(500).send(err);
    });
    
};

module.exports = {
  getRecommendedListings
};
