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
        if (!file.write(`${i+1},${generator(i)}\n`, 'utf8')) {
          await new Promise(resolve => file.once('drain', resolve));
        }
      } else {
        if (!file.write(`${i+1},${generator(i)}`, 'utf8')) {
          await new Promise(resolve => file.once('drain', resolve));
        }
      }
    }
    file.end();
    const end = Date.now();
    console.log(`Ended in ${(end - start) / 1000} seconds`);
  })();
}
