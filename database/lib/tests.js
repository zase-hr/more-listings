const db = require('./connect');
// const neo4j = require('neo4j-driver').v1;
// const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "hodak"));

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

testSQLite.getN(1000);

const testNeo4j = {
  queries: {
    simple: 'match (l:Listing {id: 997}) return l',
    full: (id) => `match (l:Listing {id: ${id}})-[:RECOMMENDS]->(n:Listing) return n`
  },
  getN(n) {
    const start = Date.now();
    console.log(`Testing ${n} Neo4j queries\n`);
    for (let i = 0; i < n; i++) {
      testNeo4j.getRandom(n, i, testNeo4j.queries.full(Math.ceil(Math.random() * n) * i), () => {
        console.log(`Retrieved ${n} in ${(Date.now() - start) / 1000} seconds`);
      });
    }
  },
  getRandom(n, i, query, callback) {
    const session = driver.session();
  //   const readTxPromise = session.readTransaction(tx => tx.run(query));
  //   readTxPromise.then(result => {
  //     session.close();
  //     if (n === i) {
  //       callback();
  //       driver.close();
  //     }
  //   })
  //   .catch(err => {
  //     session.close();
  //     driver.close();
  //     console.log('Neo4j Transaction Error: ' + err);
  //   });
    return session
      .run(query)
      .then(result => {
        session.close();
        if (i === n - 1) {
          callback();
          driver.close();
        }
      })
      .catch(err => {
        session.close();
        driver.close();
        console.log('Neo4j session error: ' + err);
      });
  }
}

// testNeo4j.getN(100);