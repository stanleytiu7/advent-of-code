const {getRawInput} = require('../lib');

const parsed_data = getRawInput();
const data = parsed_data.split('\n');

let ans = 0;
for (const row of data) {
    const a = parseInt(row.slice(0, row.length-3).replace(/F/g, '0').replace(/B/g, '1'), 2);
    const b = parseInt(row.slice(-3).replace(/L/g, '0').replace(/R/g, '1'), 2);
    ans = Math.max(ans, a*8+b)
}
console.log(ans)
