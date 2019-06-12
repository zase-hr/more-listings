const { app } = require('./router.js');
const neo4jDriver = require('../database/connect.js');

const instance = app.listen(3005, () => console.log('Listening on port: 3005'));

app.delete('/instanceOff/:code', (req, res) => {
  if (req.params.code === 'badpassword') {
    neo4jDriver.close();
    res.status(200).send('Shutting down server');
    instance.close();
  } else {
    res.status(400).send('Invalid operation');
  }
});
