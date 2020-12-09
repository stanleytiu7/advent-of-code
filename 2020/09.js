const  { getRawInput } = require("../lib")

const unparsed = getRawInput();
const test = '35\n20\n15\n25\n47\n40\n62\n55\n65\n95\n102\n117\n150\n182\n127\n219\n299\n277\n309\n576'.split('\n').map(n => parseInt(n));
const data = unparsed.split("\n").map(n => parseInt(n));
const PREAMBLE_LENGTH = 25;
console.log(run(data))

function run(data) {
    const targetNum = findInvalid(data, PREAMBLE_LENGTH);
    let sum = 0;
    const contiguous = findContiguous(data, targetNum)
    sum += Math.max(...contiguous)
    sum += Math.min(...contiguous)
    console.log(sum)
}

function findContiguous(data, target) {
    const stack = [];
    let sum = 0;
    let i = 0;
    while(i < data.length) {
        if (sum + data[i] === target) {
            stack.push(data[i])
            return stack
        } else if (sum + data[i] <= target) {
            stack.push(data[i])
            sum += data[i]
            i++
        } else {
            sum -= stack.shift()
        }
    }
}

function findInvalid(data, len) {
    for (let i = 0; i < data.length-len; i++) {
        const preamble = data.slice(i, i+len).map(int => parseInt(int));
        const target = parseInt(data[i+len])
        if(!validate(preamble, target)) {
            return target
        }
    }
    return null;
}


function validate(preamble, n) {
    const cache = {};
    let found = false;
    for (const num of preamble) {
        if (!cache[num]) cache[n-num] = true;
        else {
            if (num !== n) found = true;
        }
    }
    if (found) return n;
    else return null;
}