
const { chalk, getRawInput } = require('../lib');
const unparsed_data = getRawInput()
const data = parseInput(unparsed_data)
run();
run2();

/**
 * parse the passports to rows
 */
function parseInput(str) {
    return str.split('\n')
}

function parse(row) {
    const rowNum = row.slice(0, row.length-3);
    const seat = row.slice(-3)
    return binarySearch(rowNum, 'F', 'B', 127) * 8 + binarySearch(seat, 'L', 'R', 7)
}

// i hate implementing binary search using indices, I have to practice this.
function binarySearch(rowString, l, r, max) {
    let left = 0;
    let right = max;
    let middle = Math.floor((right + left)/2)

    for (const letter of rowString) {
        if (letter === r){
            left = middle + 1
        } else if (letter === l) {
            right = middle
        } 
        middle = Math.floor((right + left)/2)
    }
    return left
}

function run() {
    let max = 0;
    // const test = ['BFFFBBFRRR', 'FFFBBBFRRR', 'BBFFBBFRLL']
    // const test = ['FBFBBFFRLR'];
    for (const row of data) {
        max = Math.max(parse(row), max)
    }
    console.log(max)

}

function run2() {
    const parsed = data.map(parse).sort();
    for (let x = 0; x < data.length; x++) {
        if (parsed[x+1] !== parsed[x]+1) {
            console.log(parsed[x]+1)
            return;
        }
    }
}
