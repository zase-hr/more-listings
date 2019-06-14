// const db = require('../connect');
const neo4j = require('neo4j-driver').v1;
const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "hodak"));

const testSQLite = {
  queries: {
    simple: `SELECT * FROM listing WHERE rowid = ?`,
    full: 'select L.* from listing L inner join listing_relation LR on (LR.listing_b = L.rowid) where LR.listing_a = ?;'
  },
  getN(n) {
    const start = Date.now();
    // console.log('Starting test');
    let ids = [];
    // Avoid creating these ids as queries are being tested:
    for (let i = 0; i < n; i++) {
      ids.push(Math.ceil(Math.random() * n) * i);
    }
    for (let i = 0; i < n; i++) {
      testSQLite.getRandom(n, i, ids[i], () => {
        console.log(`Retrieved ${n} in ${(Date.now() - start) / 1000} seconds`);
      });
    }
  },
  getRandom(n, i, id, callback) {
    db.sqlite.all(testSQLite.queries.full, [id], (err, rows) => {
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

// testSQLite.getN(10000);

const testNeo4j = {
  queries: {
    simple: 'match (l:Listing {id: $id}) return l',
    full: 'match (l:Listing {id: $id})-[:RECOMMENDS]->(n:Listing) return n'
  },
  getN(n, max, results = 0) {
    const session = driver.session();
    const readTxPromise = session.readTransaction(tx => tx.run(testNeo4j.queries.full, {'id': Math.ceil(Math.random() * max)}));
    readTxPromise
      .then(result => {
        results++;
        if (n > 0) {
          session.close();
          testNeo4j.getN(n - 1, max, results);
        } else {
          console.log(`Read ${results} records. Last record:\n ${JSON.stringify(result)}`);
          driver.close();
        }
      })
      .catch(err => {
        console.log('Transaction error: ' + err);
        session.close();
        driver.close();
      });
  }
}

testNeo4j.getN(1000, 1e7);