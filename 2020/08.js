const {getRawInput} = require("../lib")

const unparsed = getRawInput();
const test = "nop +0\nacc +1\njmp +4\nacc +3\njmp -3\nacc -99\nacc +1\njmp -4\nacc +6nop +0\nacc +1\njmp +4\nacc +3\njmp -3\nacc -99\nacc +1\njmp -4\nacc +6".split('\n')
const data = unparsed.split('\n');
run(data);

function run(data){
    parse(data)
};

function parse(data) {
    let [sum, i] = search(data, 0)
    let maxSum = bruteForce(data)
    console.log(sum)
    console.log(maxSum)
}

function search(data, i, accum = 0, visited = {}) {
    visited[i] ? visited[i]++ : visited[i] = 1
    if (visited[i] === 2 || i >= data.length-1) {
        return [accum, i]
    }
    const [instruct, val] = data[i].split(' ')
    switch(instruct) {
        case 'acc':
            accum += parseInt(val);
            return search(data, i+1, accum, visited)
        case 'nop':
            return search(data, i+1, accum, visited)
        case 'jmp':
            return search(data, i+= parseInt(val), accum, visited)
        default:
            throw new Error('wrong')
    }
}

// for every line in the data, we will replace the data with the replacement. If it works, great we got the answer,
// otherwise we place with the original instruction and continue on. It took a while to implement because I've never
// implemented a bruteforce like this one, with enumerating all possible paths of solution.
function bruteForce(data) {
    for (let j = 0; j < data.length; j++) {
        if (/nop|jmp/.test(data[j])) {
            const copy = data[j];
            data[j] = replaceLine(data[j])
            const [sum, index] = search(data, 0)
            if (index >= data.length-1) {
                return sum;
            }
            data[j] = copy;
        }
    }
    return null;
}

function replaceLine(line) {
    const [instruction, val] = line.split(" ");
    switch(instruction) {
        case "nop":
            return `jmp ${val}`;
        case "jmp":
            return `nop ${val}`;
        default:
            throw new Error('Wrong')
    }
}