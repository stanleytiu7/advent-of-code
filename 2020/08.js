const {getRawInput} = require("../lib")

const unparsed = getRawInput();
const test = "nop +0\nacc +1\njmp +4\nacc +3\njmp -3\nacc -99\nacc +1\njmp -4\nacc +6nop +0\nacc +1\njmp +4\nacc +3\njmp -3\nacc -99\nacc +1\njmp -4\nacc +6".split('\n')
const data = unparsed.split('\n');
run(data);

function run(data){
    let [sum, i] = search(data)
    let maxSum = bruteForce(data)
    console.log(sum)
    console.log(maxSum)
};

// search ended up takign this weird form because i wanted to tackle the problem with backtracking
// something like jumping back to the original nop or jmp replaced and continuing with original instructions
// , but I was too dumb. I ended up abandoning that
// and using something like a brute force
function search(data, i = 0, accum = 0, visited = new Set()) {
    if (visited.has(i) || i >= data.length-1) return [accum, i]
    visited.add(i)
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
// i wanted it so badly to be backtracking, but brute forcing here is perfectly fine since the data isn't insane
function bruteForce(data) {
    for (let j = 0; j < data.length; j++) {
        if (/nop|jmp/.test(data[j])) {
            const copy = data[j];
            data[j] = replaceLine(data[j])

            // this is in-place, but maybe it's better to create a new copy of data honestly like below
            // const copy = data.slice();
            // copy[j] = replaceLine(copy[j])
            const [sum, index] = search(data)
            if (index >= data.length-1) return sum;
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
