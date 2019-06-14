const driver = require('./connect');
const request = require('request')

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
  // request({
  //   uri: 'http://localhost:7474/db/data/transaction/commit',
  //   headers: {
  //     "Accept": "application/json; charset=UTF-8",
  //     "Content-Type": "application/json",
  //     "Authorization": "Basic bmVvNGo6aG9kYWs="
  //   },
  //   method: 'POST',
  //   body: {
  //     "statements" : [ {
  //       "statement" : `MATCH (a:Listing {id: ${req.params.id}})-[:RECOMMENDS]->(b:Listing) RETURN b`    
  //     } ]
  //   },
  //   json: true
  // }, (err, response, body) => {
  //   if (!err) {
  //     res.send(body);
  //   }
  // });
    
};

module.exports = {
  getRecommendedListings
};
