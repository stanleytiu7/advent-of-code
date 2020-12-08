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
    let maxSum = backtrackData(data)
    console.log(sum, i)
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

function backtrackData(data) {
    for (let j = 0; j < data.length; j++) {
        if (/nop/.test(data[j])) {
            data[j] = replaceLine(data[j], "jmp")
            const [sum, index] = search(data, 0)
            if (index >= data.length-1) {
                return sum;
            }
            data[j] = replaceLine(data[j], "nop")
        } else if (/jmp/.test(data[j])){
            data[j] = replaceLine(data[j], "nop")
            const [sum, index] = search(data, 0)
            if (index >= data.length-1) {
                return sum;
            }
            data[j] = replaceLine(data[j], "jmp")
        }
    }
    return null;
}

function replaceLine(line, command) {
    const val = line.split(" ")[1]
    return `${command} ${val}`
}