const { getRawInput } = require('../lib');

const unparsed = getRawInput();
const data = unparsed.split('\n\n');

const test = 'abc\n\na\nb\nc\n\nab\nac\n\na\na\na\na\n\nb'.split('\n\n')

run(data);

function run(data) {
    let sum = 0;
    for (const group of data) {
        sum += parseGroup(group);
    }
    console.log(sum)
}

function parseGroup(group) {
    const cache = {}
    group = group.split('\n')
    for (const person of group) {
        for (const question of person) {
            if (!cache[question]) cache[question] = 1
            else cache[question]++
        }
    }

    // part 1
    // return Object.keys(cache).length
    
    let returned = 0;
    for (const key of Object.keys(cache)) {
        if (cache[key] === group.length) returned++
    }
    return returned
}
