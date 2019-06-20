const driver = require('./connect');
// const request = require('request')

const getRecommendedListings = (req, res) => {
  
  // ## Bolt Protocol Version
  let query = `MATCH (a:Listing {id: ${req.query.id}})-[:RECOMMENDS]->(b:Listing) RETURN b`;
  const session = driver.session();
  session
  .run(query)
  .subscribe({
    onNext: function(record) {
      console.log(record.get('id'));
      // res.status(200).send(body);
    },
    onCompleted: function() {
      res.status(200).send(body);
      session.close()
    },
    onError: function(error) {
      res.status(500).send(err);
      console.log(error)
    }
  })

  // ## HTTP Version
  // request({
  //   uri: 'http://54.71.225.17:7474/db/data/transaction/commit',
  //   headers: {
  //     "Accept": "application/json; charset=UTF-8",
  //     "Content-Type": "application/json",
  //     "Authorization": "Basic bmVvNGo6aDZ1NCVrcg=="
  //   },
  //   method: 'POST',
  //   body: {
  //     "statements" : [ {
  //       "statement" : `MATCH (a:Listing)-[:RECOMMENDS]->(b:Listing) WHERE id(a)=${req.query.id} RETURN b`    
  //     } ]
  //   },
  //   json: true
  // }, (err, response, body) => {
  //   if (!err) {
  //     res.status(200).send(body);
  //   } else {
  //     res.status(500).send(err);
  //   }
  // });
    
};

module.exports = {
  getRecommendedListings
};
