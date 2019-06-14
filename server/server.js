const { app } = require('./router.js');
const neo4jDriver = require('../database/connect.js');
const PORT = 3005;

const instance = app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

app.delete('/instance/:code', (req, res) => {
  if (req.params.code === 'badpassword') {
    neo4jDriver.close();
    res.status(200).send('Shutting down server');
    instance.close();
  } else {
    res.status(400).send('Invalid operation');
  }
});
