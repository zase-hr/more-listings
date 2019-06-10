const db = require('./connect');

const testSQLite = {
  queries: {
    simple: `SELECT * FROM listing WHERE rowid = ?`,
    full: 'select L.* from listing L inner join listing_relation LR on (LR.listing_b = L.rowid) where LR.listing_a = ?;'
  },
  getN(n) {
    const start = Date.now();
    console.log('Starting test');
    for (let i = 0; i < n; i++) {
      testSQLite.getRandom(n, i, () => {
        console.log(`Retrieved ${n} in ${(Date.now() - start) / 1000} seconds`);
      });
    }
  },
  getRandom(n, i, callback) {
    db.sqlite.all(testSQLite.queries.full, [Math.floor(Math.random() * n)], (err, rows) => {
      if (err) {
        console.log(err);
      }
      if (i === n - 1) {
        console.log(rows);
        callback();
      }
    });
  }
}

// testSQLite.getN(1000);

const testNeo4j = {
  queries: '',
  getN(n) {
    //  loop produce many queries
  },
  getRandom(n, i, callback) {
    //  send query to neo4j driver
  }
}

// testNeo4j.getN(1000);