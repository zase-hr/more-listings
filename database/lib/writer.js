const fs = require('fs');

//  Write N Of Any Data as CSV
module.exports.csv = function generateCSVRecords(n, generator, filepath) {
  const file = fs.createWriteStream(filepath);
  const start = Date.now();
  let i = n;
  (async() => {
    for (; i > -1; i--) {
      if (i > 0) {
        if (!file.write(`${generator()}\n`, 'utf8')) {
          await new Promise(resolve => file.once('drain', resolve));
        }
      } else {
        if (!file.write(`${generator()}`, 'utf8')) {
          await new Promise(resolve => file.once('drain', resolve));
        }
      }
    }
    file.write(']}');
    file.end();
    const end = Date.now();
    console.log(`Ended in ${(end - start) / 1000} seconds`);
  })();
}

module.exports.json = function generateJSONData(n, generator, filepath) {
  const file = fs.createWriteStream(filepath);
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