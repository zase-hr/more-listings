const server = require('./router.js');
const mysqlConnection = require('../database/conn.js');

// eslint-disable-next-line no-console
const app = server.createServer(mysqlConnection);
app.listen(3005, () => console.log('Listening on port: 3005'));
