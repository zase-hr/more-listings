const fs = require('fs');

//  Write N Of Any Data as CSV
module.exports.csv = function generateCSVRecords(n, generator, filepath) {
  const file = fs.createWriteStream(filepath + '.csv');
  const start = Date.now();
  let i = 0;
  (async() => {
    for (; i < n; i++) {
      if (i % 1000000 === 0) {
        console.log(`Batch ${i / 1e6} completed`);
      }
      if (i < n - 1) {
        if (!file.write(`${generator(i)}\n`, 'utf8')) {
          await new Promise(resolve => file.once('drain', resolve));
        }
      } else {
        if (!file.write(`${generator(i)}`, 'utf8')) {
          await new Promise(resolve => file.once('drain', resolve));
        }
      }
    }
    file.end();
    const end = Date.now();
    console.log(`Ended in ${(end - start) / 1000} seconds`);
  })();
}

//  Write N of any data as JSON
module.exports.json = function generateJSONData(n, generator, filepath) {
  const file = fs.createWriteStream(filepath + '.json');
  const start = Date.now();
  file.write('[');
  (async() => {
    for(let i = 0; i < n; i++) {
      if (i % 1000000 === 0) {
        console.log(`Batch ${i / 1e6} completed`);
      }
      if (i < n - 1) {
        if (!file.write(`${generator()},`, 'utf8')) {
          // Will pause every 16384 iterations until `drain` is emitted
          await new Promise(resolve => file.once('drain', resolve));
        }
      } else {
        if (!file.write(`${generator()}`, 'utf8')) {
          await new Promise(resolve => file.once('drain', resolve));
        }
      }
    }
    file.write(']');
    file.end();
    const end = Date.now();
    console.log(`Ended in ${(end - start) / 1000} seconds`);
  })();
}

//  Write N of any data as SQL INSERT Statements
module.exports.sql = function generateJSONData(n, generator, filepath, tableName) {
  const file = fs.createWriteStream(filepath + '.sql');
  const start = Date.now();
  (async() => {
    for(let i = 0; i < n; i++) {
      if (i % 1000000 === 0) {
        console.log(`Batch ${i / 1e6} completed`);
      }
      if (i < n - 1) {
        if (!file.write(`INSERT INTO ${tableName} VALUES (${generator()});\n`, 'utf8')) {
          // Will pause every 16384 iterations until `drain` is emitted
          await new Promise(resolve => file.once('drain', resolve));
        }
      } else {
        if (!file.write(`INSERT INTO ${tableName} VALUES (${generator()});`, 'utf8')) {
          await new Promise(resolve => file.once('drain', resolve));
        }
      }
    }
    file.end();
    const end = Date.now();
    console.log(`Ended in ${(end - start) / 1000} seconds`);
  })();
}