const db = require('./connect');
//  Send queries to db at variable rate

const queries = {
  simple: `SELECT * FROM listing WHERE rowid = ?`,
  full: 'select L.*, P.photo_url from listing L inner join listing_relation LR inner join photo P on ((LR.listing_b = P.listing) and (LR.listing_b = L.rowid)) where LR.listing_a = ?;'
}

const testSuite = {
  getN(n) {
    const start = Date.now();
    console.log('Starting test');
    for (let i = 0; i < n; i++) {
      testSuite.getRandom(n, i, () => {
        console.log(`Retrieved ${n} in ${(Date.now() - start) / 1000} seconds`);
      });
    }
  },
  getRandom(n, i, callback) {
    db.all(queries.full, [Math.floor(Math.random() * n)], (err, rows) => {
      if (err) {
        console.log(err);
      }
      if (i === n - 1) {
        // console.log(rows);
        callback();
      }
    });
  }
}

testSuite.getN(1000);