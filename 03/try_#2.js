const {getParsedData} = require('../utils')
const data = getParsedData('./data');

// the key insight is that modulo simplifies away out of bounds errors
// 1 % 30 will be 1, while 30 % 30 will be 0.
// this is an essential tool when tackling these looping boundary problems
function treeSum(data, x_slope, y_slope) {
    let sum = 0;
    let x = 0;
    for (let y = 0; y < data.length; y-=y_slope) {
        const row = data[y];
        sum += row[x % row.length] === '#';
        x += x_slope;
    }
    return sum;
}
 
let product = 1;
for (const pair of [[1,-1], [3,-1], [5,-1],[7,-1],[1,-2]]) {
    product *= treeSum(data, pair[0], pair[1]);
}
console.log(product)

