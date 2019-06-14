module.exports = {
  randomId
};

function randomId(requestParams, context, events, done) {
  context.vars['id'] = Math.ceil(Math.random() * 9999999);
  return done();
}
