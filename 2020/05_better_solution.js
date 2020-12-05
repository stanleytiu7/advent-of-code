const {getRawInput} = require('../lib');

const parsed_data = getRawInput();
const data = parsed_data.split('\n');

let ans = 0;

// the important realization here is that each row when converted to 0s, 1s is as binary number...
// the last letters do not have a multiplier since its not bitshifted. The first 7 ro so characters
// are bitshifted 3 slots, thus multiplied by 8. Converted them to binary numbers and letting
// the language do the heavy lifting makes this problem trivial.
for (const row of data) {
    const a = parseInt(row.slice(0, row.length-3).replace(/F/g, '0').replace(/B/g, '1'), 2);
    const b = parseInt(row.slice(-3).replace(/L/g, '0').replace(/R/g, '1'), 2);
    ans = Math.max(ans, a*8+b)
}
console.log(ans)
