function setBody(requestParams, context, events, next) {
  // context.vars['id'] = Math.ceil(Math.random() * 9999999);
  requestParams = {
    statements : [ {
      statement: `MATCH (a:Listing {id: ${Math.ceil(Math.random() * 9999999)}})-[:RECOMMENDS]->(b:Listing) RETURN b`
    } ]
  }
  return next();
};

module.exports = {
  setBody
};
